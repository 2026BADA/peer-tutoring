// 모든 페이지 상단에 존재하는 네비게이션 바
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
    { href: '/questions', label: '질문' },
    { href: '/profile/me', label: '프로필' }, // TODO: 나중에 프로필 동적 라우팅 수정하기
];

export default function NavBar() {
    const pathname = usePathname();

    return (
        <nav className="border-b border-base-300 bg-base-100">
            <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
                <Link href="/" className="text-base font-semibold text-base-content">
                    Peer Tutoring (임시)
                </Link>
                <div className="flex gap-5">
                    {NAV_LINKS.map((link) => {
                        const isActive = pathname?.startsWith(link.href);
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={
                                    'border-b-2 pb-0.5 text-sm transition-colors ' +
                                    (isActive
                                        ? 'border-base-content font-medium text-base-content'
                                        : 'border-transparent text-base-content/55 hover:text-base-content/80')
                                }
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
