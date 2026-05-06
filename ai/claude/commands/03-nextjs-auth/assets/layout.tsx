import type { Metadata } from "next";
import "@/styles/global.scss";
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const metadata: Metadata = {
  title: "NextJS Init",
  description: "...",
  robots: "noindex,nofollow",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const user = session?.user;
  const isLoggedIn = !!user;
  const pathname = (await headers()).get('x-pathname') ?? '/';

  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {isLoggedIn ? (
          <>
            <main className="pt-24 pb-20 xl:pl-72 px-8 min-h-[calc(100vh-6rem)] max-w-screen-2xl mx-auto">
              {children}
            </main>
          </>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100">
            <div className="max-w-md w-full">
              {children}
            </div>
          </div>
        )}

        <footer className="border-b mb-20"></footer>
      </body>
    </html>
  );
}

