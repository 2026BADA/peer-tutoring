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
            <main>

            </main>
        </div>
    );
}
