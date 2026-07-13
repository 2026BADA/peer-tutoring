import Link from "next/link";
/*
!!IMPORTANT: layout.tsx에 전역 헤더/네비게이션 여부 확인 필요.
 GNB는 원래 공통 요소(T-05) — layout.tsx 완성되면 아래 <header>를 그쪽으로 이동할 것
*/

//네비게이션 카드 데이터
const NAV_CARDS = [
    { href: "/questions", icon: "🙋‍♂️", title: "질문 답변하기", description: "선후배·동기의 고민을 해결해 주세요" },
    { href: "/questions/new", icon: "✏️", title: "질문하기", description: "혼자 고민하지 말고, 선후배·동기에게 질문하기" },
    { href: "/ranking", icon: "🏅", title: "순위", description: "Peer Tutoring에서의 당신의 순위는?" },
    { href: "/profile/me", icon: "🧍", title: "프로필", description: "나의 프로필 편집" },
];

//더미 데이터 (사용자)
const DUMMY_USER = {
    nickname: "김북일",
    points: 4567,
    tier: "Platinum",
    nextTier: "Diamond",
    nextTierPoints: 10000, // Diamond 시작점 (계획서 2.3 기준)
};

//더미 데이터 (최근 질문) — 총괄이 Supabase fetch로 교체 (T-13 연계)
const DUMMY_RECENT_QUESTIONS = [
    { id: 1, category: "수학", title: "원의 방정식에서 접선 구하는 법이 이해가 안 돼요", authorName: "김철수", answerCount: 3 },
    { id: 2, category: "과학", title: "NTC 서미스터는 온도가 올라가면 왜 저항이 줄어드나요?", authorName: "홍길동", answerCount: 1 },
    { id: 3, category: "영어", title: "관계대명사 what이랑 that 차이 정리해주실 분", authorName: "이영희", answerCount: 0 },
];

//이용 방법 안내 (정적 콘텐츠)
const HOW_IT_WORKS = [
    { step: "1", title: "질문 올리기", description: "과목을 골라 질문을 올려요. 질문 작성 시 10P가 사용돼요." },
    { step: "2", title: "답변 받기", description: "선후배·동기가 답변을 달아줘요. 답변만 해도 5P를 받아요." },
    { step: "3", title: "채택하기", description: "가장 도움이 된 답변을 채택하면 답변자가 30P를 받아요." },
    { step: "4", title: "성장하기", description: "포인트를 모아 티어를 올리고 뱃지를 수집해요." },
];

export default function Home() {
    // 티어 진행률 (0~100)
    const tierProgress = Math.min(
        Math.round((DUMMY_USER.points / DUMMY_USER.nextTierPoints) * 100),
        100,
    );

    return (
        <div>
            {/* T-05 GNB — layout.tsx로 이동 예정 */}
            <header className="border-b border-base-300">
                <div className="mx-auto flex max-w-[780px] items-center justify-between px-6 py-3">
                    <Link href="/" className="text-sm font-medium text-base-content">
                        Peer Tutoring
                    </Link>
                    <div className="flex items-center gap-3">
                    <Link
                        href="/questions/new"
                        className="btn btn-primary btn-sm shadow-md transition-transform hover:scale-105"
                    >
                        📝 질문하기
                    </Link>
                    <Link href="/profile/me" aria-label="내 프로필" className="relative">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-base-200 text-base ring-1 ring-base-300 transition-all hover:ring-2 hover:ring-base-content/30">
                            🧍
                        </span>
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-base-100 text-[10px] ring-1 ring-base-300">
                            💎
                        </span>
                    </Link>
                    </div>
                </div>
            </header>

            <main className="mx-auto max-w-[780px] px-6 py-7">
                {/* 헤더 — 개인화 인사 */}
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
                            className="h-full rounded-full bg-base-content/70 transition-[width] duration-700 ease-out"
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
                            className="group flex items-center gap-3 rounded-xl border border-base-300 px-4 py-4 transition-all hover:-translate-y-0.5 hover:bg-base-200/50 hover:shadow-sm"
                        >
                            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-base-200 text-xl transition-transform group-hover:scale-110">
                                {card.icon}
                            </span>
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

                {/* 최근 질문 미리보기 — 더미, T-13에서 실데이터 교체 */}
                <div className="mt-10">
                    <div className="mb-3 flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-sm font-medium text-base-content">
                        <span className="h-3.5 w-0.5 rounded-full bg-base-content/30" />
                        방금 올라온 질문
                    </h2>
                        <Link
                            href="/questions"
                            className="text-xs text-base-content/45 transition-colors hover:text-base-content/80"
                        >
                            전체 보기 →
                        </Link>
                    </div>
                    <div className="divide-y divide-base-300 border-t border-b border-base-300">
                        {DUMMY_RECENT_QUESTIONS.map((q) => (
                            <Link
                                key={q.id}
                                href={`/questions/${q.id}`}
                                className="block hover:bg-base-200/50"
                            >
                                <div className="flex items-center gap-3 px-1 py-3">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-1.5">
                                            <span className="shrink-0 rounded-full bg-base-200 px-2 py-0.5 text-[11px] font-medium text-base-content/70">
                                                {q.category}
                                            </span>
                                            <h3 className="truncate text-sm font-medium text-base-content">
                                                {q.title}
                                            </h3>
                                        </div>
                                        <p className="mt-1 truncate text-xs text-base-content/55">
                                            {q.authorName}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-[11px] text-base-content/45">
                                        답변 {q.answerCount}
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 이용 방법 안내 (정적 섹션) */}
                <div className="mt-10">
                <h2 className="mb-3 flex items-center gap-2 text-sm font-medium text-base-content">
                    <span className="h-3.5 w-0.5 rounded-full bg-base-content/30" />
                    Peer Tutoring 이용 방법
                </h2>
                    <div className="divide-y divide-base-300 border-t border-b border-base-300">
                        {HOW_IT_WORKS.map((item) => (
                            <div key={item.step} className="flex items-center gap-3 px-1 py-3">
                                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-base-200 text-xs font-medium text-base-content/70">
                                    {item.step}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <h3 className="text-sm font-medium text-base-content">
                                        {item.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-base-content/55">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 푸터 */}
                <footer className="mt-10 border-t border-base-300 pt-4">
                    <p className="text-[11px] text-base-content/40">
                        Peer Tutoring — 북일고 지식 공유 플랫폼 · 2026BADA
                    </p>
                </footer>
            </main>
        </div>
    );
}