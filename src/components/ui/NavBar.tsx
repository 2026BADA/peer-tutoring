// 모든 페이지 상단에 존재하는 네비게이션 바
import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="flex items-center justify-between bg-white p-4 shadow">
            <Link href="/" className="text-lg font-bold">
                Peer Tutoring (임시)
            </Link>
            <div className="flex gap-4">
                <Link href="/questions">질문</Link>
                {/* TODO: 프로필 동적 라우팅 수정하기 */}
                <Link href="/profile/me">프로필</Link>
                <Link href="/login">로그인</Link>
                {/* TODO: 로그인 한 경우 로그아웃으로 바꾸기 */}
            </div>
        </nav>
    );
}
