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
// (badge, btn)와 시맨틱 색상(success=채택·인증, warning=획득 뱃지,
// error=즐겨찾기)을 그대로 사용합니다.
// ============================================================
import Link from 'next/link';

export default function UserProfile() {
    const DUMMY_PROFILE = {
        name: '이준영',
        bio: '수학(대수, 미적분) 질문 환영합니다! 공과대학 지망해요.',
        tier: '🥈 실버',
        badges: ['수학 고수', '지식 나눔이', '채택왕'],
        stats: {
            questions: 15,
            answers: 42,
            adoptionRate: 85,
            totalPoints: 450,
        },
    };

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
                            {DUMMY_PROFILE.name.charAt(0)}
                        </div>
                        <div>
                            <div className="flex items-center gap-1.5">
                                <h1 className="text-xl font-medium text-base-content">
                                    {DUMMY_PROFILE.name}님의 프로필
                                </h1>
                                <span className="badge badge-success badge-outline badge-sm gap-0.5">
                                    ✓ 인증됨
                                </span>
                            </div>
                            <p className="mt-1 text-sm text-base-content/55">
                                내 활동 내역을 확인하고 티어와 뱃지를 관리해보세요
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mb-6 rounded-xl border border-base-300 p-4">
                    <p className="text-sm leading-relaxed text-base-content">
                        {DUMMY_PROFILE.bio}
                    </p>
                </div>

                <div className="mb-6 rounded-xl border border-base-300 bg-base-200/30 p-5">
                    <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-base-content/70">
                            현재 티어
                        </span>
                        <span className="text-base font-bold text-primary">
                            {DUMMY_PROFILE.tier}
                        </span>
                    </div>
                    <div>
                        <span className="mb-2 block text-sm font-medium text-base-content/70">
                            보유 뱃지
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {DUMMY_PROFILE.badges.map((badge) => (
                                <span
                                    key={badge}
                                    className="badge badge-warning badge-outline badge-sm"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
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
                                {DUMMY_PROFILE.stats.questions}개
                            </strong>
                        </div>
                        <div className="rounded-xl border border-base-300 p-4 text-center">
                            <p className="mb-1 text-xs text-base-content/55">답변 수</p>
                            <strong className="text-lg font-semibold text-base-content">
                                {DUMMY_PROFILE.stats.answers}개
                            </strong>
                        </div>
                        <div className="rounded-xl border border-base-300 p-4 text-center">
                            <p className="mb-1 text-xs text-base-content/55">채택률</p>
                            <strong className="text-lg font-semibold text-success">
                                {DUMMY_PROFILE.stats.adoptionRate}%
                            </strong>
                        </div>
                        <div className="rounded-xl border border-success/20 bg-success/5 p-4 text-center">
                            <p className="mb-1 text-xs font-medium text-success">
                                총 포인트
                            </p>
                            <strong className="text-lg font-bold text-success">
                                {DUMMY_PROFILE.stats.totalPoints} P
                            </strong>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="mb-3 text-sm font-medium text-base-content/70">
                        바로가기 메뉴
                    </h2>
                    <div className="flex flex-col gap-2">
                        <button className="btn btn-block justify-start border-none bg-base-200 text-base-content hover:bg-base-300">
                            내 질문 모아보기
                        </button>
                        <button className="btn btn-block justify-start border-none bg-base-200 text-base-content hover:bg-base-300">
                            내 답변 모아보기
                        </button>
                        <button className="btn btn-outline btn-error btn-block justify-start">
                            즐겨찾기한 질문 목록
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
