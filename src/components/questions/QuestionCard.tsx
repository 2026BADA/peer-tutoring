// ============================================================
// QuestionCard — 질문 리스트 아이템 컴포넌트
// ------------------------------------------------------------
// 질문 목록(/questions)에서 질문 하나를 리스트의 한 행(row)으로 보여주는 부품입니다.
// "보여주기"만 담당하는 순수 컴포넌트라서, 데이터를 props로 받기만 하고
// 직접 데이터를 가져오거나 클릭 시 페이지를 이동시키는 일은 하지 않습니다.
//   (페이지 이동은 이 카드를 감싸는 부모 쪽에서 <Link>로 처리합니다.)
//
// 행 구성 (가로 배치):
//   왼쪽   → 작성자 아바타
//   가운데 → 과목 뱃지 + 채택 여부 + 질문 제목 (첫 줄) / 본문 미리보기 (둘째 줄)
//   오른쪽 → 작성자 닉네임 + 작성 시간 + 답변 수
// ============================================================

import type { Question } from '@/types';
import { getCategoryColor } from '@/lib/categoryColors';

// 이 컴포넌트가 받는 props의 모양을 정의합니다.
// 질문 카드에 필요한 정보는 모두 Question 타입 안에 들어있으므로,
// props를 여러 개로 쪼개지 않고 question 객체 하나로 받습니다.
interface QuestionCardProps {
    question: Question;
}

// ------------------------------------------------------------
// 본문 미리보기용: 글자수 기준으로 잘라내는 헬퍼 함수
// ------------------------------------------------------------
// 본문이 길면 카드 높이가 들쭉날쭉해지므로, 정해진 길이에서 자르고 '...'을 붙입니다.
// maxLength 기본값은 30자. (필요하면 호출할 때 숫자를 바꿔 넘길 수 있음)
function getPreview(body: string, maxLength: number = 30): string {
    if (body.length <= maxLength) return body;
    return body.slice(0, maxLength) + '...';
}

export default function QuestionCard({ question }: QuestionCardProps) {
    // 이 질문의 과목에 해당하는 색상 묶음을 가져옵니다.
    const colors = getCategoryColor(question.category);

    return (
        <div className="flex items-center gap-3 px-1 py-3">
            {/* 왼쪽: 작성자 아바타.
                지금은 닉네임 첫 글자를 넣은 회색 원으로 표시.
                나중에 실제 프로필 이미지가 생기면 여기에 <img>를 넣으면 됩니다. */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 text-xs">
                {question.authorName.charAt(0)}
            </div>

            {/* 가운데: 과목 뱃지 + 상태 + 제목 (첫 줄) / 본문 미리보기 (둘째 줄)
                min-w-0이 있어야 자식의 truncate가 flex 안에서 제대로 동작합니다. */}
            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                    {/* 과목 뱃지 — 배경/글자색은 과목별 색상 사용 */}
                    <span
                        className="shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium"
                        style={{ backgroundColor: colors.badge, color: colors.text }}
                    >
                        {question.category}
                    </span>

                    {/* 채택 여부 표시
                        status가 'closed'이면 채택완료, 'open'이면 진행중 */}
                    {question.status === 'closed' ? (
                        <span className="flex shrink-0 items-center gap-0.5 whitespace-nowrap text-[10px] text-amber-700">
                            ✓ 채택완료
                        </span>
                    ) : (
                        <span className="shrink-0 whitespace-nowrap text-[10px] text-base-content/40">
                            진행중
                        </span>
                    )}

                    {/* 질문 제목 */}
                    <h3 className="truncate text-sm font-medium text-base-content">
                        {question.title}
                    </h3>
                </div>

                {/* 본문 미리보기 — 글자수로 잘라서 한 줄로 표시.
                    truncate 클래스가 넘치는 텍스트를 '...'으로 처리해줍니다. */}
                <p className="mt-1 truncate text-xs text-base-content/55">
                    {getPreview(question.body)}
                </p>
            </div>

            {/* 오른쪽: 작성자 닉네임 + 작성 시간 + 답변 수 */}
            <div className="flex shrink-0 flex-col items-end gap-0.5 text-[11px] text-base-content/45">
                <span className="text-xs text-base-content/70">
                    {question.authorName}
                </span>
                {/* createdAt은 ISO 문자열이라 그대로 보여주면 보기 안 좋습니다.
                    날짜를 보기 좋게 바꾸는 작업은 추후 별도로 진행 예정.
                    지금은 날짜 부분만 잘라서 표시합니다. */}
                <span>{question.createdAt.slice(0, 10)}</span>
                <span>{question.answerCount}개 답변</span>
            </div>
        </div>
    );
}
