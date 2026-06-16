import { auth } from '@/lib/auth';
import Link from 'next/link';
import LexicalDemoForm from '@/components/lexical-demo-form';

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  if (isLoggedIn) {
    return (
      <div>
        init
        <LexicalDemoForm />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Noteifico</h1>
      <p className="text-slate-400 text-sm">Personal project management tool</p>
      <Link href="/api/auth/signin" className="px-6 py-2.5 bg-white text-slate-900 text-sm font-semibold rounded-full hover:bg-slate-100 transition-all">
        Sign in
      </Link>
    </div>
  );
}
