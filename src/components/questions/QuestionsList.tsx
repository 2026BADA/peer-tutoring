// ============================================================
// QuestionsList — 질문 목록의 필터링 + 렌더링 담당 (클라이언트 컴포넌트)
// ------------------------------------------------------------
// questions/page.tsx(서버 컴포넌트)가 Supabase에서 가져온 질문 배열을
// props로 받아서, 여기서 과목 필터 상태(useState)만 관리합니다.
// 데이터를 다시 가져오지 않고, 이미 받은 배열을 그냥 걸러서(filter) 보여줍니다.
// ============================================================
'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { CategoryFilterValue, Question } from '@/types';
import QuestionCard from '@/components/questions/QuestionCard';
import CategoryFilter from '@/components/questions/CategoryFilter';

interface QuestionsListProps {
    questions: Question[];
}

export default function QuestionsList({ questions }: QuestionsListProps) {
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryFilterValue>('전체');

    const filteredQuestions = questions.filter((question) =>
        selectedCategory === '전체'
            ? true
            : question.subject === selectedCategory,
    );

    return (
        <>
            <div className="mb-6">
                <CategoryFilter
                    selected={selectedCategory}
                    onSelect={setSelectedCategory}
                />
            </div>

            <div className="divide-y divide-base-300 rounded-xl border border-base-300">
                {filteredQuestions.length === 0 ? (
                    <p className="p-6 text-center text-sm text-base-content/50">
                        아직 질문이 없어요.
                    </p>
                ) : (
                    filteredQuestions.map((question) => (
                        <Link
                            key={question.id}
                            href={`/questions/${question.id}`}
                            className="block hover:bg-base-200/50"
                        >
                            <QuestionCard question={question} />
                        </Link>
                    ))
                )}
            </div>
        </>
    );
}
