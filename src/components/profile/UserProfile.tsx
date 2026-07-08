export default function UserProfile() {
    const DUMMY_PROFILE = {
        name: "이준영",
        bio: "수학(대수, 미적분) 질문 환영합니다! 공과대학 지망해요.",
        tier: "🥈 실버", 
        badges: ["수학 고수", "지식 나눔이", "채택왕"],
        stats: {
            questions: 15,
            answers: 42,
            adoptionRate: 85,
            totalPoints: 450
        }
    };

    return (
        <div>
            <main className="mx-auto max-w-[780px] px-6 py-7">
                
                {/* 상단 헤더 영역 */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-medium text-base-content">
                                {DUMMY_PROFILE.name}님의 프로필
                            </h1>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-success/10 text-success border border-success/20">
                                ✓ 인증됨
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-base-content/55">
                            내 활동 내역을 확인하고 티어와 뱃지를 관리해보세요
                        </p>
                    </div>
                </div>

                {/* 본문 영역 */}
                <div className="space-y-6">
                    
                    {/* 기본 정보 (한 줄 소개만 깔끔하게 남김) */}
                    <div className="p-4 rounded-xl border border-base-content/10">
                        <p className="text-base text-base-content">{DUMMY_PROFILE.bio}</p>
                    </div>

                    {/* 1. 현재 티어 및 보유 뱃지 목록 */}
                    <div className="p-5 rounded-xl border border-base-content/10 bg-base-200/30">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-sm font-medium text-base-content/70">현재 티어</span>
                            <span className="text-base font-bold text-primary">{DUMMY_PROFILE.tier}</span>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-base-content/70 block mb-2">보유 뱃지</span>
                            <div className="flex flex-wrap gap-2">
                                {DUMMY_PROFILE.badges.map((badge, index) => (
                                    <span key={index} className="text-xs font-semibold px-2.5 py-1 rounded-md bg-warning/20 text-warning-content border border-warning/30">
                                        {badge}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 2. 누적 통계 */}
                    <div>
                        <h2 className="text-sm font-medium text-base-content/70 mb-3"> 나의 활동 누적 통계</h2>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl border border-base-content/10 text-center">
                                <p className="text-xs text-base-content/55 mb-1">질문 수</p>
                                <strong className="text-lg font-semibold text-base-content">{DUMMY_PROFILE.stats.questions}개</strong>
                            </div>
                            <div className="p-4 rounded-xl border border-base-content/10 text-center">
                                <p className="text-xs text-base-content/55 mb-1">답변 수</p>
                                <strong className="text-lg font-semibold text-base-content">{DUMMY_PROFILE.stats.answers}개</strong>
                            </div>
                            <div className="p-4 rounded-xl border border-base-content/10 text-center">
                                <p className="text-xs text-base-content/55 mb-1">채택률</p>
                                <strong className="text-lg font-semibold text-success">{DUMMY_PROFILE.stats.adoptionRate}%</strong>
                            </div>
                            <div className="p-4 rounded-xl border border-success/20 bg-success/5 text-center">
                                <p className="text-xs text-success font-medium mb-1">총 포인트</p>
                                <strong className="text-lg font-bold text-success">{DUMMY_PROFILE.stats.totalPoints} P</strong>
                            </div>
                        </div>
                    </div>

                    {/* 3. 내 질문/답변 모아보기 */}
                    <div>
                        <h2 className="text-sm font-medium text-base-content/70 mb-3"> 바로가기 메뉴</h2>
                        <div className="flex flex-col gap-2">
                            <button className="w-full p-3.5 text-left text-sm font-medium rounded-xl bg-base-200 hover:bg-base-300 text-base-content transition-colors">
                                 내 질문 모아보기
                            </button>
                            <button className="w-full p-3.5 text-left text-sm font-medium rounded-xl bg-base-200 hover:bg-base-300 text-base-content transition-colors">
                                 내 답변 모아보기
                            </button>
                            <button className="w-full p-3.5 text-left text-sm font-medium rounded-xl bg-error/10 hover:bg-error/20 text-error transition-colors">
                                 즐겨찾기한 질문 목록
                            </button>
                        </div>
                    </div>

                </div>
                {/* 본문 내용 끝 */}

            </main>
        </div>
    );
}
