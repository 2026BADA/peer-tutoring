import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/ui/NavBar";

export const metadata: Metadata = {
    title: "peer tutoring",
    description: "BADA 웹부 peer tutoring 프로젝트",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko" className="h-full antialiased">
            <body className="flex min-h-full flex-col">
                <NavBar />
                {children}
            </body>
        </html>
    );
}
