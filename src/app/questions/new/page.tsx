'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CategoryName } from '@/types';
import QuestionForm from '@/components/questions/QuestionForm';
import { createQuestion } from './actions';

interface FormErrors {
    title?: string;
    category?: string;
    body?: string;
}

export default function New() {
    // 폼 입력값. QuestionForm은 controlled component라
    // 이 페이지가 값을 들고 있다가 내려줍니다. (질문 상세/답변 폼과 동일한 패턴)
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<CategoryName | ''>('');
    const [body, setBody] = useState('');
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [errors, setErrors] = useState<FormErrors>({});

    // 등록 버튼을 눌렀을 때의 처리.
    // 빈 칸 검사(T-24)를 먼저 하고, 통과하면 Server Action(createQuestion)을 호출합니다.
    // createQuestion 안에서 성공 시 상세 페이지로 redirect()하므로,
    // 여기서는 성공했을 때 따로 할 일이 없습니다.
    async function handleSubmit() {
        const nextErrors: FormErrors = {};
        if (!title.trim()) nextErrors.title = '제목을 입력해주세요';
        if (!category) nextErrors.category = '과목을 선택해주세요';
        if (!body.trim()) nextErrors.body = '내용을 입력해주세요';

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) return;

        await createQuestion({
            title,
            category: category as CategoryName,
            body,
            images: imageUrl ? [imageUrl] : [],
        });
    }

    return (
        <main className="mx-auto w-full max-w-[1200px] px-6 py-16">
            <div className="mx-auto max-w-[720px]">
                <Link
                    href="/questions"
                    className="text-xs text-base-content/45 hover:text-base-content/70"
                >
                    ← 질문 목록으로
                </Link>

                <div className="mb-6 mt-2">
                    <h1 className="text-xl font-medium text-base-content">질문 작성</h1>
                    <p className="mt-1 text-sm text-base-content/55">
                        막히는 부분을 사진과 함께 자세히 적어주세요
                    </p>
                </div>

                <QuestionForm
                    title={title}
                    category={category}
                    body={body}
                    imageUrl={imageUrl}
                    onChangeTitle={setTitle}
                    onChangeCategory={setCategory}
                    onChangeBody={setBody}
                    onImageChange={setImageUrl}
                    onSubmit={handleSubmit}
                    errors={errors}
                />
            </div>
        </main>
    );
}
