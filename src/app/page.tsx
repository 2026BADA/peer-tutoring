//네비게이션 바(탭)
const NAV_CARDS = [
    {href: "/questions", icon: "🙋‍♂️", title: "Questions", description: "Ask and answer questions" },
    {href: "/questions/new", icon: "✏️", title: "Ask a Question", description: "Post a new question" },
    {href: "/ranking", icon: "🏅", title: "Ranking", description: "View rankings" },
    {href: "/profile/me", icon: "🧍", title: "Profile", description: "View and edit your profile" }
];
//더미 데이터 (사용자)
const DUMMY_USER = { points: 150, tier: "Bronze" };

export default function Home() {
    return (
        <div>
            <main className="mx-auto max-w-[780px] px-6 py-7">
                {/* 헤더 패턴 (가이드 2번) */}
                <div className="mb-6">
                    <h1 className="text-xl font-medium text-base-content">Peer Tutoring</h1>
                    <p className="mt-1 text-sm text-base-content/55">
                        선배, 동기들과 함께 모르는 것을 질문하고 아는 것을 나눠보세요! 
                    </p>
                </div>

                {/* T-12 포인트·티어 미니 위젯 */}
                <div className="mb-6 flex items-center gap-6 rounded-lg border border-base-300 px-5 py-4">
                    <div>
                        <p className="text-[11px] text-base-content/45">포인트</p>
                        <p className="mt-1 text-sm font-medium text-base-content">
                            {DUMMY_USER.points}P
                        </p>
                    </div>
                    <div>
                        <p className="text-[11px] text-base-content/45">티어</p>
                        <p className="mt-1 text-sm font-medium text-base-content">
                            {DUMMY_USER.tier}
                        </p>
                    </div>
                </div>

                {/* T-11 네비게이션 카드 4개 */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {NAV_CARDS.map((card) => (
                        <Link>
                            key={card.href}
                            href={card.href}
                            className="flex items-center gap-3 rounded-lg border border-base-300 px-4 py-4 transition-colors hover:bg-base-200/50"
                        
                            <span className="shrink-0 text-2xl">{card.icon}</span>
                            <div className="min-w-0 flex-1">
                                <h3 className="truncate text-sm font-medium text-base-content">
                                    {card.title}
                                </h3>
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