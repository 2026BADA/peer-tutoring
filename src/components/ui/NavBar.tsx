import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/actions";

export default async function NavBar() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <nav className="flex items-center justify-between bg-white p-4 shadow">
            <Link href="/" className="text-lg font-bold">
                Peer Tutoring (임시)
            </Link>
            <div className="flex gap-4">
                <Link href="/questions">질문</Link>
                {/* NOTE: 로그인 버튼 동적 라우팅을 위한 처리 */}
                {user ? (
                    <>
                        <Link href={`/profile/${user.id}`}>프로필</Link>
                        <form action={signOut}>
                            <button type="submit">로그아웃</button>
                        </form>
                    </>
                ) : (
                    <Link href="/login">로그인</Link>
                )}
            </div>
            ㅎ{" "}
        </nav>
    );
}
