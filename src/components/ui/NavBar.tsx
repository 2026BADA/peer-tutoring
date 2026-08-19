// 모든 페이지 상단에 존재하는 네비게이션 바
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NavLinks from "./NavLinks";

export default async function NavBar() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <nav className="border-b border-base-300 bg-base-100">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
                <Link
                    href="/"
                    className="text-base font-semibold text-base-content"
                >
                    Peer Tutoring (임시)
                </Link>
                <NavLinks userId={user?.id ?? null} />
            </div>
        </nav>
    );
}
