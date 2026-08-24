// ============================================================
// QuestionForm — 질문 작성 폼 컴포넌트
// ------------------------------------------------------------
// 질문 작성 페이지(/questions/new)에서 쓰는 폼입니다.
// 제목 입력 + 과목 선택 + 본문 입력 + 등록 버튼으로 구성됩니다.
//
// AnswerForm과 마찬가지로 controlled component입니다.
// 입력값(title, category, body)을 모두 부모가 관리하고,
// 이 컴포넌트는 받아서 보여주고 변경을 알리기만 합니다.
//
// 유효성 검사(빈 칸 체크)는 부모가 한 뒤, 에러 메시지를 errors props로 내려줍니다.
// 이 컴포넌트는 errors에 내용이 있으면 해당 입력창 아래에 빨간 글씨로 보여줍니다.
// (실제 "어떤 칸이 비었는지 검사"하는 로직과 "저장"은 부모/총괄이 담당)
// ============================================================

'use client';

import { useState } from 'react';
import type { CategoryName } from '@/types';
import { SUBJECT_CATEGORIES } from '@/types';
import { createClient } from '@/lib/supabase/client';

// 과목 선택 드롭다운에 넣을 대분류 → 세부과목 목록.
// Object.entries로 순회하면서 <optgroup>으로 묶어서 보여줍니다.
const SUBJECT_ENTRIES = Object.entries(SUBJECT_CATEGORIES) as [
    string,
    readonly string[],
][];

// 입력창 아래에 표시할 에러 메시지들의 모양.
// 각 필드별로 에러 문구가 있을 수도(string) 없을 수도(undefined) 있습니다.
interface QuestionFormErrors {
    title?: string;
    category?: string;
    body?: string;
}

// 이 컴포넌트가 받는 props:
//   title / category / body  → 현재 입력값 (부모가 관리)
//   onChangeTitle / ...        → 각 입력값이 바뀔 때 부모에게 알리는 함수
//   onSubmit                   → 등록 버튼 클릭 시 실행 (검사 + 저장은 부모/총괄)
//   errors                     → (선택) 필드별 에러 메시지
interface QuestionFormProps {
    title: string;
    category: CategoryName | ''; // ''는 "아직 과목 선택 안 함" 상태를 의미
    body: string;
    imageUrl: string | null; // 업로드된 이미지의 공개 URL (없으면 null)
    onChangeTitle: (value: string) => void;
    onChangeCategory: (value: CategoryName | '') => void;
    onChangeBody: (value: string) => void;
    onImageChange: (url: string | null) => void;
    onSubmit: () => void;
    errors?: QuestionFormErrors;
}

export default function QuestionForm({
    title,
    category,
    body,
    imageUrl,
    onChangeTitle,
    onChangeCategory,
    onChangeBody,
    onImageChange,
    onSubmit,
    errors,
}: QuestionFormProps) {
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // 파일을 고르는 즉시 Supabase Storage(attachments 버킷)에 업로드하고,
    // 끝나면 공개 URL만 부모에게 전달합니다. (부모는 URL 문자열만 알면 됨)
    async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        setUploadError(null);

        const supabase = createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            setUploadError('로그인이 필요합니다');
            setUploading(false);
            return;
        }

        // 버킷의 업로드 정책이 "경로의 첫 폴더 == 본인 id"만 허용하므로,
        // 반드시 user.id로 시작하는 경로에 올려야 합니다.
        // 원본 파일명은 한글/공백 등 Storage가 거부하는 문자를 담고 있을 수 있어서
        // 쓰지 않고, 확장자만 뽑아서 안전한 이름으로 새로 만듭니다.
        const extension = file.name.split('.').pop();
        const filePath = `${user.id}/${Date.now()}.${extension}`;
        const { error } = await supabase.storage
            .from('attachments')
            .upload(filePath, file);

        if (error) {
            console.error('Storage upload error:', error);
            setUploadError(`업로드 실패: ${error.message}`);
            setUploading(false);
            return;
        }

        const {
            data: { publicUrl },
        } = supabase.storage.from('attachments').getPublicUrl(filePath);

        onImageChange(publicUrl);
        setUploading(false);
    }
    return (
        <div className="flex flex-col gap-4">
            {/* ---------- 제목 입력 ---------- */}
            <div>
                <label className="mb-1 block text-sm font-medium text-base-content">
                    제목
                </label>
                <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="질문 제목을 입력하세요"
                    value={title}
                    onChange={(e) => onChangeTitle(e.target.value)}
                />
                {/* 제목 관련 에러가 있으면 입력창 아래에 빨간 글씨로 표시 */}
                {errors?.title && (
                    <p className="mt-1 text-xs text-error">{errors.title}</p>
                )}
            </div>

            {/* ---------- 과목 선택 ---------- */}
            <div>
                <label className="mb-1 block text-sm font-medium text-base-content">
                    과목
                </label>
                <select
                    className="select select-bordered w-full"
                    value={category}
                    // select의 값은 항상 문자열이라 CategoryName 타입으로 변환해서 넘깁니다.
                    onChange={(e) =>
                        onChangeCategory(e.target.value as CategoryName | '')
                    }
                >
                    {/* 기본 안내 옵션. value=''이라 아직 선택 안 한 상태를 나타냄 */}
                    <option value="">과목을 선택하세요</option>
                    {/* 대분류(수학/과학/...)별로 optgroup을 만들고, 그 안에 세부과목을 나열합니다. */}
                    {SUBJECT_ENTRIES.map(([subject, categories]) => (
                        <optgroup key={subject} label={subject}>
                            {categories.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </optgroup>
                    ))}
                </select>
                {errors?.category && (
                    <p className="mt-1 text-xs text-error">{errors.category}</p>
                )}
            </div>

            {/* ---------- 본문 입력 ---------- */}
            <div>
                <label className="mb-1 block text-sm font-medium text-base-content">
                    내용
                </label>
                <textarea
                    className="textarea textarea-bordered w-full"
                    rows={6}
                    placeholder="질문 내용을 자세히 적어주세요"
                    value={body}
                    onChange={(e) => onChangeBody(e.target.value)}
                />
                {errors?.body && (
                    <p className="mt-1 text-xs text-error">{errors.body}</p>
                )}
            </div>

            {/* ---------- 사진 첨부 ---------- */}
            <div>
                <label className="mb-1 block text-sm font-medium text-base-content">
                    사진 첨부 (선택)
                </label>
                {imageUrl ? (
                    <div className="relative w-full max-w-[360px]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src={imageUrl}
                            alt="첨부한 문제지 사진"
                            className="w-full rounded-xl border border-base-300 object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => onImageChange(null)}
                            className="btn btn-circle btn-xs absolute right-2 top-2"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <label className="flex h-[120px] w-full max-w-[360px] cursor-pointer items-center justify-center rounded-xl border border-dashed border-base-300 text-sm text-base-content/40 hover:border-base-content/40">
                        {uploading ? '업로드 중...' : '문제지 사진 첨부 영역'}
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </label>
                )}
                {uploadError && (
                    <p className="mt-1 text-xs text-error">{uploadError}</p>
                )}
            </div>

            {/* ---------- 등록 버튼 ---------- */}
            <div className="flex justify-end">
                <button className="btn btn-primary" onClick={onSubmit}>
                    질문 등록
                </button>
            </div>
        </div>
    );
}
