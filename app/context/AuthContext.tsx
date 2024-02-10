"use client";

import { SessionProvider } from "next-auth/react";

interface AuthContestProps{
    children: React.ReactNode;
}

export default function AuthContext({
    children
}: AuthContestProps) {
    return <SessionProvider>{children}</SessionProvider>
}