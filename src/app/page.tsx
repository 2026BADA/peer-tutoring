import Link from "next/link";
/*
!!IMPORTANT: layout.tsx에 전역 헤더/네비게이션 여부 확인 필요.
 재 이 페이지의 최상위 <div>는 형제 요소가 없어 불필요할 수 있음 (layout.tsx 구조 확인 후 제거 검토)
*/
//네비게이션 카드 데이터
const NAV_CARDS = [
    {href: "/questions", icon: "🙋‍♂️", title: "질문 답변하기", description: "선후배·동기의 고민을 해결해 주세요" },
    {href: "/questions/new", icon: "✏️", title: "질문하기", description: "혼자 고민하지 말고, 선후배·동기에게 질문하기" },
    {href: "/ranking", icon: "🏅", title: "순위", description: "Peer Tutoring에서의 당신의 순위는?" },
    {href: "/profile/me", icon: "🧍", title: "프로필", description: "나의 프로필 편집" }
];
//더미 데이터 (사용자)
const DUMMY_USER = {
    nickname: "김북일",
    points: 4567,
    tier: "Platinum",
    nextTier: "diamond",
    nextTierPoints: 10000, // Plantinum 시작점 (계획서 2.3 기준)
};

export default function Home() {
        // 티어 진행률 (0~100)
        const tierProgress = Math.min(
            Math.round((DUMMY_USER.points / DUMMY_USER.nextTierPoints) * 100),
            100,
        );

        return (
        <div>
            <main className="mx-auto max-w-[780px] px-6 py-7">
                {/* 헤더 패턴 (가이드 2번) + 개인화 인사 */}
                <div className="mb-6">
                    <h1 className="text-xl font-medium text-base-content">
                        {DUMMY_USER.nickname}님, 안녕하세요 👋
                    </h1>
                    <p className="mt-1 text-sm text-base-content/55">
                        선배, 동기들과 함께 모르는 것을 질문하고 아는 것을 나눠보세요! 
                    </p>
                </div>

{/* T-12 포인트·티어 미니 위젯 — 티어 진행 바 포함 */}
<Link
                    href="/profile/me"
                    className="mb-6 block rounded-lg border border-base-300 px-5 py-4 transition-colors hover:bg-base-200/50"
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div>
                                <p className="text-[11px] text-base-content/45">포인트</p>
                                <p className="mt-1 text-sm font-medium text-base-content">
                                    {DUMMY_USER.points}P
                                </p>
                            </div>
                            <div>
                                <p className="text-[11px] text-base-content/45">티어</p>
                                <p className="mt-1 text-sm font-medium text-base-content">
                                    💎 {DUMMY_USER.tier}
                                </p>
                            </div>
                        </div>
                        <p className="text-[11px] text-base-content/45">
                            {DUMMY_USER.nextTier}까지 {DUMMY_USER.nextTierPoints - DUMMY_USER.points}P
                        </p>
                    </div>
                    {/* 티어 진행 바 */}
                    <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-base-300">
                        <div
                            className="h-full rounded-full bg-base-content/70"
                            style={{ width: `${tierProgress}%` }}
                        />
                    </div>
                </Link>
                
                {/* T-11 네비게이션 카드 4개 */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {NAV_CARDS.map((card) => (
                        <Link
                            key={card.href}
                            href={card.href}
                            className="flex items-center gap-3 rounded-lg border border-base-300 px-4 py-4 transition-colors hover:bg-base-200/50"
                        >
                            <span className="shrink-0 text-2xl">{card.icon}</span>
                            <div className="min-w-0 flex-1">
                                <h2 className="truncate text-sm font-medium text-base-content">
                                    {card.title}
                                </h2>
                                <p className="mt-1 truncate text-xs text-base-content/55">
                                    {card.description}
                                </p>
                            </div>
                        </Link>
                        ))}
                </div>
            </main>
        </div>
    );
}