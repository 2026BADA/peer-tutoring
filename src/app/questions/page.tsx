// ============================================================
// 질문 목록 페이지 (/questions)
// ------------------------------------------------------------
// 위에서 만든 컴포넌트들을 실제로 조립한 예시입니다.
// 보내주신 기본 틀(<div><main></main></div>)을 채운 형태입니다.
//
// 'use client' 가 맨 위에 있는 이유:
//   useState나 onClick 같은 "사용자 상호작용" 기능을 쓰려면
//   이 페이지가 브라우저에서 실행되는 컴포넌트여야 합니다.
//   이 지시어가 없으면 useState에서 에러가 납니다.
// ============================================================

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DUMMY_QUESTIONS } from '@/lib/dummy';
import type { CategoryFilterValue } from '@/types';
import QuestionCard from '@/components/questions/QuestionCard';
import CategoryFilter from '@/components/questions/CategoryFilter';

export default function Questions() {
    // 현재 선택된 과목 필터 상태. 처음엔 '전체'로 시작.
    // 이 상태를 이 페이지가 들고 있고, CategoryFilter에 내려줍니다.
    const [selectedCategory, setSelectedCategory] =
        useState<CategoryFilterValue>('전체');

    // 선택된 필터에 맞게 질문 목록을 걸러냅니다.
    // '전체'면 모두 보여주고, 특정 과목이면 그 과목 질문만 남깁니다.
    // 이 계산은 렌더링할 때마다 자동으로 다시 실행되므로,
    // 필터를 바꾸면 화면이 바로 갱신됩니다. (별도 작업 불필요)
    const filteredQuestions = DUMMY_QUESTIONS.filter((question) =>
        selectedCategory === '전체'
            ? true
            : question.category === selectedCategory
    );

    return (
        <div>
            {/* 본문 영역을 가운데로 모으고 좌우 여백을 줍니다.
                max-w로 너무 넓어지지 않게 제한 (데스크탑에서 카드가 흩어지는 것 방지) */}
            <main className="mx-auto max-w-[780px] px-6 py-7">
                {/* 페이지 제목 영역 */}
                <div className="mb-6">
                    <h1 className="text-xl font-medium text-base-content">질문 목록</h1>
                    <p className="mt-1 text-sm text-base-content/55">
                        궁금한 것을 검색하거나 새로 질문해보세요
                    </p>
                </div>

                {/* 과목 필터 탭.
                    selected로 현재 선택값을 내려주고,
                    onSelect로 탭이 눌렸을 때 상태를 바꿉니다. */}
                <div className="mb-6">
                    <CategoryFilter
                        selected={selectedCategory}
                        onSelect={setSelectedCategory}
                    />
                </div>

                {/* 질문 카드 그리드.
                    repeat(auto-fit, ...)은 화면 너비에 맞춰 카드 개수를 자동 조절합니다. */}
                <div
                    className="grid gap-4"
                    style={{
                        gridTemplateColumns:
                            'repeat(auto-fit, minmax(260px, 1fr))',
                    }}
                >
                    {/* 걸러낸 질문들을 하나씩 카드로 만듭니다.
                        각 카드를 <Link>로 감싸서, 카드를 누르면
                        해당 질문의 상세 페이지(/questions/질문id)로 이동합니다.
                        (QuestionCard 자체는 이동 로직을 모릅니다 — 여기서 처리) */}
                    {filteredQuestions.map((question) => (
                        <Link key={question.id} href={`/questions/${question.id}`}>
                            <QuestionCard question={question} />
                        </Link>
                    ))}
                </div>
            </main>

            {/* 우측 하단 플로팅 버튼 (+).
                누르면 질문 작성 페이지(/questions/new)로 이동합니다.
                fixed로 화면에 고정해서 스크롤해도 항상 보이게 합니다. */}
            <Link
                href="/questions/new"
                className="btn btn-circle btn-primary fixed bottom-6 right-6 text-xl shadow-md"
                aria-label="질문 작성"
            >
                +
            </Link>
        </div>
    );
}
