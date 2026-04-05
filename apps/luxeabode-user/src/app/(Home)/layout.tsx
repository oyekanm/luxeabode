import { Footer } from "@/components/layouts/footer";
import { Navigation } from "@/components/layouts/navigation";
import { UserAccountClientService } from "@/services/client/userAccountClientService";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";


export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["account", "me"],
        queryFn: async () => await UserAccountClientService.getMe(),
    })

    return (
        <html lang="en">
            <body>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <Navigation />
                    {children}
                    <Footer />
                </HydrationBoundary>
            </body>
        </html>
    );
}
