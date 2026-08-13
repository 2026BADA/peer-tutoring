'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import type { Category } from '@/types';
import QuestionForm from '@/components/questions/QuestionForm';

export default function New() {
    const router = useRouter();

    // 폼 입력값. QuestionForm은 controlled component라
    // 이 페이지가 값을 들고 있다가 내려줍니다. (질문 상세/답변 폼과 동일한 패턴)
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<Category | ''>('');
    const [body, setBody] = useState('');

    // 등록 버튼을 눌렀을 때의 처리.
    // 실제 저장(DB 반영) 로직은 총괄이 작성 예정이라 지금은 자리만 잡아둡니다.
    function handleSubmit() {
        router.push('/questions');
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
                    onChangeTitle={setTitle}
                    onChangeCategory={setCategory}
                    onChangeBody={setBody}
                    onSubmit={handleSubmit}
                />
            </div>
        </main>
    );
}
