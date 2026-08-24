// NavBar의 링크 영역 — 현재 페이지 강조(usePathname)를 위해 클라이언트 컴포넌트로 분리.
// 로그인 여부(userId)는 서버 컴포넌트인 NavBar가 조회해서 props로 내려줍니다.
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/actions";

interface NavLinksProps {
    userId: string | null;
}

const BASE_LINKS = [{ href: "/questions", label: "질문" }];

export default function NavLinks({ userId }: NavLinksProps) {
    const pathname = usePathname();

    const links = userId
        ? [...BASE_LINKS, { href: `/profile/${userId}`, label: "프로필" }]
        : BASE_LINKS;

    return (
        <div className="flex items-center gap-5">
            {links.map((link) => {
                const isActive = pathname?.startsWith(link.href);
                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={
                            "border-b-2 pb-0.5 text-sm transition-colors " +
                            (isActive
                                ? "border-base-content font-medium text-base-content"
                                : "border-transparent text-base-content/55 hover:text-base-content/80")
                        }
                    >
                        {link.label}
                    </Link>
                );
            })}
            {userId ? (
                <form action={signOut}>
                    <button
                        type="submit"
                        className="text-sm text-base-content/55 transition-colors hover:text-base-content/80"
                    >
                        로그아웃
                    </button>
                </form>
            ) : (
                <Link
                    href="/login"
                    className="text-sm text-base-content/55 transition-colors hover:text-base-content/80"
                >
                    로그인
                </Link>
            )}
        </div>
    );
}
