// ============================================================
// UserProfile — 마이페이지(프로필) 컴포넌트
// ------------------------------------------------------------
// 레이아웃/여백/테두리/타이포그래피는 질문 페이지(/questions)의 규칙을 따릅니다:
//   - 컨테이너: mx-auto max-w-[1200px] px-6 py-7
//     (넓은 화면에서 양옆 여백이 과도하게 남지 않도록 목록/상세 페이지보다
//      더 넓게 잡았습니다. 통계 카드 4개도 한 줄에 여유 있게 들어갑니다.)
//   - 테두리: border-base-300
//   - 텍스트 톤: text-base-content + 투명도(70/55/45)
//   - 섹션 간 간격: mb-6, 섹션 내부 간격: mt-1~3 / gap-1.5~3
//
// 뱃지/버튼처럼 daisyUI로 표현되는 요소는 실제 daisyUI 컴포넌트 클래스
// (badge, btn)와 시맨틱 색상(success=채택, warning=획득 뱃지,
// error=즐겨찾기)을 그대로 사용합니다.
//
// ⚠️ 실제 데이터는 profile/[username]/page.tsx가 Supabase에서 조회해서
// props로 내려줍니다. 이 컴포넌트는 그 값을 그대로 보여주기만 합니다.
// (뱃지·자기소개·즐겨찾기는 아직 DB에 해당 테이블/컬럼이 없어서 빠져있습니다)
// ============================================================
import Link from 'next/link';
import { getTierLabel } from '@/lib/tier';

interface UserProfileProps {
    id: string;
    nickname: string;
    points: number;
    questionCount: number;
    answerCount: number;
    adoptionRate: number;
}

export default function UserProfile({
    id,
    nickname,
    points,
    questionCount,
    answerCount,
    adoptionRate,
}: UserProfileProps) {
    return (
        <main className="mx-auto w-full max-w-[1200px] px-6 py-16">
            {/* 다른 페이지와 동일한 뒤로가기 링크 패턴 */}
            <div className="mx-auto max-w-[720px]">
                <Link
                    href="/questions"
                    className="text-xs text-base-content/45 hover:text-base-content/70"
                >
                    ← 질문 목록으로
                </Link>

                <div className="mb-6 mt-2 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 text-xs">
                            {nickname.charAt(0)}
                        </div>
                        <div>
                            <h1 className="text-xl font-medium text-base-content">
                                {nickname}님의 프로필
                            </h1>
                            <p className="mt-1 text-sm text-base-content/55">
                                내 활동 내역을 확인하고 티어를 관리해보세요
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 rounded-xl border border-base-300 bg-base-200/30 p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-base-content/70">
                            현재 티어
                        </span>
                        <span className="text-base font-bold text-primary">
                            {getTierLabel(points)}
                        </span>
                    </div>
                    <div>
                        <span className="mb-2 block text-sm font-medium text-base-content/70">
                            보유 뱃지
                        </span>
                        {/* 뱃지 시스템은 아직 미구현 (badges/user_badges 테이블 없음) */}
                        <p className="text-xs text-base-content/40">
                            아직 획득한 뱃지가 없어요
                        </p>
                    </div>
                </div>

                {/* 이용 방법 섹션과 동일하게 border-t로 구획을 나눔 */}
                <div className="mb-6 border-t border-base-300 pt-8">
                    <h2 className="mb-3 text-sm font-medium text-base-content/70">
                        나의 활동 누적 통계
                    </h2>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-xl border border-base-300 p-4 text-center">
                            <p className="mb-1 text-xs text-base-content/55">질문 수</p>
                            <strong className="text-lg font-semibold text-base-content">
                                {questionCount}개
                            </strong>
                        </div>
                        <div className="rounded-xl border border-base-300 p-4 text-center">
                            <p className="mb-1 text-xs text-base-content/55">답변 수</p>
                            <strong className="text-lg font-semibold text-base-content">
                                {answerCount}개
                            </strong>
                        </div>
                        <div className="rounded-xl border border-base-300 p-4 text-center">
                            <p className="mb-1 text-xs text-base-content/55">채택률</p>
                            <strong className="text-lg font-semibold text-success">
                                {adoptionRate}%
                            </strong>
                        </div>
                        <div className="rounded-xl border border-success/20 bg-success/5 p-4 text-center">
                            <p className="mb-1 text-xs font-medium text-success">
                                총 포인트
                            </p>
                            <strong className="text-lg font-bold text-success">
                                {points} P
                            </strong>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="mb-3 text-sm font-medium text-base-content/70">
                        바로가기 메뉴
                    </h2>
                    <div className="flex flex-col gap-2">
                        <Link
                            href={`/questions?author=${id}`}
                            className="btn btn-block justify-start border-none bg-base-200 text-base-content hover:bg-base-300"
                        >
                            내 질문 모아보기
                        </Link>
                        <Link
                            href={`/questions?answered=${id}`}
                            className="btn btn-block justify-start border-none bg-base-200 text-base-content hover:bg-base-300"
                        >
                            내 답변 모아보기
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
