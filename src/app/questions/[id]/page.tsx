'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { DUMMY_QUESTIONS, DUMMY_ANSWERS } from '@/lib/dummy';
import { getCategoryColor } from '@/lib/categoryColors';
import AnswerCard from '@/components/questions/AnswerCard';
import AnswerForm from '@/components/questions/AnswerForm';

export default function QuestionDetail() {
    const { id } = useParams<{ id: string }>();
    const question = DUMMY_QUESTIONS.find((q) => q.id === id);
    const answers = DUMMY_ANSWERS.filter((answer) => answer.questionId === id);
    const [answerValue, setAnswerValue] = useState('');

    if (!question) {
        return (
            <main className="mx-auto w-full max-w-[1200px] px-6 py-16">
                <p className="text-sm text-base-content/55">
                    질문을 찾을 수 없습니다.
                </p>
            </main>
        );
    }

    const colors = getCategoryColor(question.category);

    function handleSubmitAnswer() {
        setAnswerValue('');
    }

    return (
        <main className="mx-auto w-full max-w-[1200px] px-6 py-16">
            <div className="mx-auto max-w-[720px]">
                {/* 목록/작성 페이지와 동일한 뒤로가기 링크 패턴 */}
                <Link
                    href="/questions"
                    className="text-xs text-base-content/45 hover:text-base-content/70"
                >
                    ← 질문 목록으로
                </Link>

                <div className="mb-8 mt-2 border-b border-base-300 pb-6">
                    <div className="flex items-center gap-1.5">
                        <span
                            className="badge badge-sm whitespace-nowrap border-none font-medium"
                            style={{ backgroundColor: colors.badge, color: colors.text }}
                        >
                            {question.category}
                        </span>

                        {question.status === 'closed' ? (
                            <span className="badge badge-success badge-outline badge-sm gap-0.5 whitespace-nowrap">
                                ✓ 채택완료
                            </span>
                        ) : (
                            <span className="badge badge-ghost badge-sm whitespace-nowrap text-base-content/40">
                                진행중
                            </span>
                        )}
                    </div>

                    <h1 className="mt-2.5 text-xl font-medium text-base-content">
                        {question.title}
                    </h1>

                    <div className="mt-3 flex items-center gap-2">
                        <div className="flex h-[26px] w-[26px] items-center justify-center rounded-full bg-black/10 text-xs">
                            {question.authorName.charAt(0)}
                        </div>
                        <span className="text-sm text-base-content/70">
                            {question.authorName}
                        </span>
                        <span className="text-base-content/30">·</span>
                        <span className="text-xs text-base-content/45">
                            {question.createdAt.slice(0, 10)}
                        </span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* 왼쪽: 질문 본문 — 홈/작성 페이지의 rounded-xl border-base-300 카드로 감싸 통일 */}
                <div className="rounded-xl border border-base-300 p-5">
                    <div className="mb-4 flex aspect-video items-center justify-center rounded-xl border border-dashed border-base-300 text-sm text-base-content/40">
                        사진 첨부 영역
                    </div>

                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-base-content">
                        {question.body}
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    <AnswerForm
                        value={answerValue}
                        onChange={setAnswerValue}
                        onSubmit={handleSubmitAnswer}
                    />

                    {answers.length > 0 && (
                        <div className="flex flex-col gap-3">
                            <p className="text-sm font-medium text-base-content">
                                답변 {answers.length}개
                            </p>
                            {answers.map((answer) => (
                                <AnswerCard key={answer.id} answer={answer} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
