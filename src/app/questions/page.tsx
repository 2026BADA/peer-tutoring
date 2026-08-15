'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DUMMY_QUESTIONS } from '@/lib/dummy';
import type { CategoryFilterValue } from '@/types';
import QuestionCard from '@/components/questions/QuestionCard';
import CategoryFilter from '@/components/questions/CategoryFilter';

export default function Questions() {
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryFilterValue>('전체');

    const filteredQuestions = DUMMY_QUESTIONS.filter((question) =>
        selectedCategory === '전체'
            ? true
            : question.category === selectedCategory
    );

    return (
        <main className="mx-auto w-full max-w-[1200px] px-6 py-16">
            <div className="mx-auto max-w-[720px]">
                {/* 페이지 제목 + 홈과 동일한 헤더 CTA 패턴 */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-medium text-base-content">질문 목록</h1>
                        <p className="mt-1 text-sm text-base-content/55">
                            궁금한 것을 검색하거나 새로 질문해보세요
                        </p>
                    </div>
                    <Link href="/questions/new" className="btn btn-primary btn-sm">
                        질문 작성
                    </Link>
                </div>

                <div className="mb-6">
                    <CategoryFilter
                        selected={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                </div>

                {/* 리스트 컨테이너 — 홈의 카드(rounded-xl border-base-300) 언어를 그대로 사용 */}
                <div className="divide-y divide-base-300 rounded-xl border border-base-300">
                    {filteredQuestions.map((question) => (
                        <Link
                            key={question.id}
                            href={`/questions/${question.id}`}
                            className="block hover:bg-base-200/50"
                        >
                            <QuestionCard question={question} />
                        </Link>
                    ))}
                </div>

                {/* 마무리 CTA — 홈페이지 마무리 배너와 동일한 구조 */}
                <div className="mt-6 flex items-center justify-between rounded-xl border border-base-300 bg-base-200/30 p-5">
                    <p className="text-sm text-base-content/70">
                        찾는 질문이 없다면 새로 질문을 남겨보세요.
                    </p>
                    <Link href="/questions/new" className="btn btn-primary btn-sm">
                        질문 작성하기
                    </Link>
                </div>
            </div>
        </main>
    );
}
