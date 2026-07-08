'use client';

// ============================================================
// 질문 상세 페이지 (/questions/[id])
// ------------------------------------------------------------
// 구성:
//   상단 → 과목/상태 뱃지 + 제목 + 작성자(아바타/닉네임) + 작성일
//   좌측(본문) → 사진 첨부 영역(자리만 마련) + 질문 본문
//   우측(답변) → 답변 입력창 + 답변하기 버튼, 그 아래 기존 답변 목록
// ============================================================

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { DUMMY_QUESTIONS, DUMMY_ANSWERS } from '@/lib/dummy';
import { getCategoryColor } from '@/lib/categoryColors';
import AnswerCard from '@/components/questions/AnswerCard';
import AnswerForm from '@/components/questions/AnswerForm';

export default function QuestionDetail() {
    // URL의 [id] 부분을 읽어옵니다. 예: /questions/1 → id === '1'
    const { id } = useParams<{ id: string }>();

    // id와 일치하는 질문을 더미 데이터에서 찾습니다.
    const question = DUMMY_QUESTIONS.find((q) => q.id === id);

    // 이 질문에 달린 답변들만 걸러냅니다.
    const answers = DUMMY_ANSWERS.filter((answer) => answer.questionId === id);

    // 답변 입력창의 값. AnswerForm은 controlled component라
    // 이 페이지가 값을 들고 있다가 내려줍니다.
    const [answerValue, setAnswerValue] = useState('');

    // 잘못된 id로 들어온 경우(질문이 없는 경우) 안내 문구만 보여줍니다.
    if (!question) {
        return (
            <main className="mx-auto max-w-[960px] px-6 py-7">
                <p className="text-sm text-base-content/55">
                    질문을 찾을 수 없습니다.
                </p>
            </main>
        );
    }

    // 이 질문의 과목에 해당하는 색상 묶음을 가져옵니다. (목록 페이지와 동일)
    const colors = getCategoryColor(question.category);

    // 답변 등록 처리. 실제 저장(DB 반영) 로직은 총괄이 작성 예정이라
    // 지금은 자리만 잡아둡니다.
    function handleSubmitAnswer() {
        setAnswerValue('');
    }

    return (
        <main className="mx-auto max-w-[960px] px-6 py-7">
            {/* 상단: 과목/상태 + 제목 + 작성자 + 작성일 */}
            <div className="mb-8 border-b border-base-300 pb-6">
                <div className="flex items-center gap-1.5">
                    {/* 과목 뱃지 — 목록 카드와 동일한 색상 규칙 사용 */}
                    <span
                        className="whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium"
                        style={{ backgroundColor: colors.badge, color: colors.text }}
                    >
                        {question.category}
                    </span>

                    {/* 채택 여부 표시 — 목록 카드와 동일한 규칙 */}
                    {question.status === 'closed' ? (
                        <span className="flex items-center gap-0.5 whitespace-nowrap text-[11px] text-amber-700">
                            ✓ 채택완료
                        </span>
                    ) : (
                        <span className="whitespace-nowrap text-[11px] text-base-content/40">
                            진행중
                        </span>
                    )}
                </div>

                {/* 질문 제목 */}
                <h1 className="mt-2.5 text-xl font-medium text-base-content">
                    {question.title}
                </h1>

                {/* 작성자 아바타 + 닉네임 + 작성일 */}
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

            {/* 좌우 분할: 왼쪽=본문(사진+글), 오른쪽=답변 작성/목록.
                화면이 좁아지면(모바일) 한 열로 쌓입니다. */}
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {/* 왼쪽: 질문 본문 */}
                <div>
                    {/* 사진 첨부 영역 — 지금은 자리만 마련해둔 placeholder입니다.
                        실제로 사진 데이터(Question.imageUrl 등)가 추가되면
                        이 자리에 <img>로 교체하면 됩니다. */}
                    <div className="mb-4 flex aspect-video items-center justify-center rounded-xl border border-dashed border-base-300 text-sm text-base-content/40">
                        사진 첨부 영역
                    </div>

                    {/* 본문 텍스트. whitespace-pre-wrap으로 줄바꿈을 그대로 보여줍니다. */}
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-base-content">
                        {question.body}
                    </p>
                </div>

                {/* 오른쪽: 답변 작성 폼 + 기존 답변 목록 */}
                <div className="flex flex-col gap-4">
                    {/* 바로 타이핑해서 답변을 작성하고, 아래 '답변하기' 버튼으로 제출합니다. */}
                    <AnswerForm
                        value={answerValue}
                        onChange={setAnswerValue}
                        onSubmit={handleSubmitAnswer}
                    />

                    {/* 이미 달린 답변들 */}
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
