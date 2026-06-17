// ============================================================
// QuestionCard — 질문 카드 컴포넌트
// ------------------------------------------------------------
// 질문 목록(/questions)에서 질문 하나를 카드 형태로 보여주는 부품입니다.
// "보여주기"만 담당하는 순수 컴포넌트라서, 데이터를 props로 받기만 하고
// 직접 데이터를 가져오거나 클릭 시 페이지를 이동시키는 일은 하지 않습니다.
//   (페이지 이동은 이 카드를 감싸는 부모 쪽에서 <Link>로 처리합니다.)
//
// 카드 구성:
//   왼쪽 위  → 작성자 (아바타 + 닉네임)
//   오른쪽 위 → 과목 뱃지 + 채택 여부 (세로로 쌓음)
//   가운데   → 질문 제목 + 본문 미리보기(글자수로 잘림)
//   아래     → 작성 시간 + 답변 수
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
        <div
            className="rounded-xl border border-base-300 p-4"
            // 카드 배경색은 과목마다 달라서 Tailwind 클래스로는 표현하기 어렵습니다.
            // 그래서 이 부분만 인라인 style로 직접 색을 지정합니다.
            style={{ backgroundColor: colors.card }}
        >
            {/* 카드 상단: 왼쪽=작성자 / 오른쪽=과목+상태 */}
            <div className="flex items-start justify-between gap-2">
                {/* 왼쪽: 작성자 아바타 + 닉네임 */}
                <div className="flex items-center gap-1.5">
                    {/* 아바타 자리. 지금은 회색 원으로 표시.
                        나중에 실제 프로필 이미지가 생기면 여기에 <img>를 넣으면 됩니다. */}
                    <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-black/10 text-[11px]">
                        {/* 닉네임 첫 글자를 아바타 안에 표시 */}
                        {question.authorName.charAt(0)}
                    </div>
                    <span className="text-xs text-base-content/70">
                        {question.authorName}
                    </span>
                </div>

                {/* 오른쪽: 과목 뱃지와 상태를 세로로 쌓음
                    (가로로 두면 카드가 좁아질 때 겹칠 수 있어서 세로로 배치) */}
                <div className="flex flex-col items-end gap-1.5">
                    {/* 과목 뱃지 — 배경/글자색은 과목별 색상 사용 */}
                    <span
                        className="whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium"
                        style={{ backgroundColor: colors.badge, color: colors.text }}
                    >
                        {question.category}
                    </span>

                    {/* 채택 여부 표시
                        status가 'closed'이면 채택완료, 'open'이면 진행중 */}
                    {question.status === 'closed' ? (
                        <span className="flex items-center gap-0.5 whitespace-nowrap text-[10px] text-amber-700">
                            {/* daisyUI/Tabler 아이콘이 있으면 체크 아이콘 사용 가능.
                                여기서는 의존성 없이 텍스트로 표시. */}
                            ✓ 채택완료
                        </span>
                    ) : (
                        <span className="whitespace-nowrap text-[10px] text-base-content/40">
                            진행중
                        </span>
                    )}
                </div>
            </div>

            {/* 가운데: 질문 제목 */}
            <h3 className="mt-2.5 text-sm font-medium text-base-content">
                {question.title}
            </h3>

            {/* 본문 미리보기 — 글자수로 잘라서 한 줄로 표시.
                truncate 클래스가 넘치는 텍스트를 '...'으로 처리해줍니다. */}
            <p className="mt-1.5 truncate text-xs text-base-content/55">
                {getPreview(question.body)}
            </p>

            {/* 아래: 작성 시간 + 답변 수 */}
            <div className="mt-2.5 flex justify-between text-[11px] text-base-content/45">
                {/* createdAt은 ISO 문자열이라 그대로 보여주면 보기 안 좋습니다.
                    날짜를 보기 좋게 바꾸는 작업은 추후 별도로 진행 예정.
                    지금은 날짜 부분만 잘라서 표시합니다. */}
                <span>{question.createdAt.slice(0, 10)}</span>
                <span>{question.answerCount}개 답변</span>
            </div>
        </div>
    );
}
