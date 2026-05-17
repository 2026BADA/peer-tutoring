// 모든 페이지 상단에 존재하는 네비게이션 바
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex items-center justify-between p-4 bg-white shadow">
            <Link href="/" className="font-bold text-lg">
                Peer Tutoring (임시)
            </Link>
            <div className="flex gap-4">
                <Link href="/questions">질문</Link>
                <Link href="/profile/me">프로필</Link>{" "}
                {/* 나중에 프로필 동적 라우팅 수정하기 */}
            </div>
        </nav>
    );
}
