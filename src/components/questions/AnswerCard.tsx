// ============================================================
// AnswerCard — 답변 카드 컴포넌트
// ------------------------------------------------------------
// 질문 상세 페이지(/questions/[id])에서 답변 하나를 보여주는 부품입니다.
// QuestionCard처럼 데이터를 props로 받아서 보여주기만 하는 순수 컴포넌트입니다.
//
// 채택 버튼:
//   "채택하기" 버튼의 모양(UI)만 여기서 만듭니다.
//   버튼을 눌렀을 때 실제로 채택 처리(DB 업데이트)를 하는 로직은
//   onAdopt라는 props로 받아서 연결합니다. (그 함수는 총괄이 나중에 작성)
//   onAdopt가 안 넘어오면 버튼은 보이지 않습니다.
// ============================================================

import type { Answer } from '@/types';

// 이 컴포넌트가 받는 props:
//   answer    → 보여줄 답변 데이터
//   onAdopt   → (선택) 채택 버튼을 눌렀을 때 실행할 함수.
//               물음표(?)가 붙어 있으므로 안 넘겨도 됩니다.
//               예를 들어 이미 채택된 답변이나, 내가 쓴 질문이 아니면
//               부모가 onAdopt를 안 넘겨서 버튼을 숨길 수 있습니다.
interface AnswerCardProps {
    answer: Answer;
    onAdopt?: () => void;
}

export default function AnswerCard({ answer, onAdopt }: AnswerCardProps) {
    return (
        <div
            // 채택된 답변은 옅은 노란 배경 + 노란 테두리로 강조,
            // 일반 답변은 흰 배경 + 회색 테두리.
            className={
                'rounded-xl border p-4 ' +
                (answer.isAdopted
                    ? 'border-amber-300 bg-amber-50'
                    : 'border-base-300 bg-base-100')
            }
        >
            {/* 상단: 작성자 정보 + 채택됨 배지 */}
            <div className="flex items-center justify-between">
                {/* 작성자 아바타 + 닉네임 */}
                <div className="flex items-center gap-1.5">
                    <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black/10 text-[11px]">
                        {answer.authorName.charAt(0)}
                    </div>
                    <span className="text-xs text-base-content/70">
                        {answer.authorName}
                    </span>
                </div>

                {/* 채택된 답변이면 "채택됨" 배지 표시 */}
                {answer.isAdopted && (
                    <span className="flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-medium text-amber-700">
                        ✓ 채택됨
                    </span>
                )}
            </div>

            {/* 답변 본문 */}
            <p className="mt-2.5 whitespace-pre-wrap text-sm leading-relaxed text-base-content">
                {answer.body}
            </p>

            {/* 하단: 작성 시간 + 채택 버튼 */}
            <div className="mt-3 flex items-center justify-between">
                <span className="text-[11px] text-base-content/45">
                    {answer.createdAt.slice(0, 10)}
                </span>

                {/* onAdopt 함수가 넘어왔고, 아직 채택 안 된 답변일 때만 채택 버튼 표시.
                    채택 처리 로직 자체는 onAdopt 안에 들어있고(총괄이 작성),
                    여기서는 버튼을 누르면 그 함수를 호출하기만 합니다. */}
                {onAdopt && !answer.isAdopted && (
                    <button
                        onClick={onAdopt}
                        className="btn btn-outline btn-xs"
                    >
                        채택하기
                    </button>
                )}
            </div>
        </div>
    );
}
