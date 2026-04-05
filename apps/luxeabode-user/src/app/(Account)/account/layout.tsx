import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "LuxeAbode | Account",
    description: "Account",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <html lang="en">
            <body
            >
                {children}
            </body>
        </html>
    );
}
