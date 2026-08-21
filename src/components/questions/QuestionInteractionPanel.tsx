// ============================================================
// QuestionInteractionPanel — 답변 작성/채택의 인터랙션 담당 (클라이언트 컴포넌트)
// ------------------------------------------------------------
// questions/[id]/page.tsx(서버 컴포넌트)가 조회해온 답변 목록을 props로 받고,
// 여기서 답변 입력 상태(useState)와 제출/채택 버튼 클릭을 처리합니다.
// ============================================================
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Answer } from '@/types';
import AnswerCard from '@/components/questions/AnswerCard';
import AnswerForm from '@/components/questions/AnswerForm';
import { submitAnswer, adoptAnswer } from '@/app/questions/[id]/actions';

interface QuestionInteractionPanelProps {
    questionId: string;
    answers: Answer[];
    canAnswer: boolean; // 로그인 상태이고 질문이 아직 open일 때만 답변 폼 표시
    canAdopt: boolean; // 로그인한 사람이 이 질문의 작성자이고, 질문이 아직 open일 때만 채택 버튼 표시
}

export default function QuestionInteractionPanel({
    questionId,
    answers,
    canAnswer,
    canAdopt,
}: QuestionInteractionPanelProps) {
    const router = useRouter();
    const [answerValue, setAnswerValue] = useState('');

    async function handleSubmitAnswer() {
        await submitAnswer({ questionId, body: answerValue });
        setAnswerValue('');
        // 이 페이지를 벗어나지 않고 그대로 있을 거라, 서버가 새로 가져온
        // 데이터로 화면을 다시 그리도록 명시적으로 새로고침을 요청합니다.
        router.refresh();
    }

    async function handleAdopt(answerId: string) {
        await adoptAnswer({ answerId, questionId });
        router.refresh();
    }

    return (
        <div className="flex flex-col gap-4">
            {canAnswer && (
                <AnswerForm
                    value={answerValue}
                    onChange={setAnswerValue}
                    onSubmit={handleSubmitAnswer}
                />
            )}

            {answers.length > 0 && (
                <div className="flex flex-col gap-3">
                    <p className="text-sm font-medium text-base-content">
                        답변 {answers.length}개
                    </p>
                    {answers.map((answer) => (
                        <AnswerCard
                            key={answer.id}
                            answer={answer}
                            onAdopt={
                                canAdopt && !answer.isAdopted
                                    ? () => handleAdopt(answer.id)
                                    : undefined
                            }
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
