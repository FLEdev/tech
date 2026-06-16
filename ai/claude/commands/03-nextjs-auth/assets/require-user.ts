import "server-only";
import { redirect } from "next/navigation";
import { auth } from '@/lib/auth';
import { cache } from 'react';

export const requireUser = cache(async () => {
const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  return session.user;
});
