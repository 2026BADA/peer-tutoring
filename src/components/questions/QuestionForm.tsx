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

import type { Category } from '@/types';

// 과목 선택 드롭다운에 넣을 목록.
// '전체'는 필터용이지 작성용이 아니므로 여기에는 넣지 않습니다.
const CATEGORY_OPTIONS: Category[] = ['수학', '과학', '영어', '사회', '기타'];

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
    category: Category | ''; // ''는 "아직 과목 선택 안 함" 상태를 의미
    body: string;
    onChangeTitle: (value: string) => void;
    onChangeCategory: (value: Category | '') => void;
    onChangeBody: (value: string) => void;
    onSubmit: () => void;
    errors?: QuestionFormErrors;
}

export default function QuestionForm({
    title,
    category,
    body,
    onChangeTitle,
    onChangeCategory,
    onChangeBody,
    onSubmit,
    errors,
}: QuestionFormProps) {
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
                    // select의 값은 항상 문자열이라 Category 타입으로 변환해서 넘깁니다.
                    onChange={(e) => onChangeCategory(e.target.value as Category | '')}
                >
                    {/* 기본 안내 옵션. value=''이라 아직 선택 안 한 상태를 나타냄 */}
                    <option value="">과목을 선택하세요</option>
                    {/* 과목 목록을 돌면서 옵션을 하나씩 생성 */}
                    {CATEGORY_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
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

            {/* ---------- 등록 버튼 ---------- */}
            <div className="flex justify-end">
                <button className="btn btn-primary" onClick={onSubmit}>
                    질문 등록
                </button>
            </div>
        </div>
    );
}
