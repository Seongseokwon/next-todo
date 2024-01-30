'use client';

import {signOut, useSession} from "next-auth/react";
import Layout from "@/components/layout/Layout";
import TodoTemplate from "@/components/todo/TodoTemplate";

export default function TodoPage() {
    const {data :session} = useSession();
    console.log(session?.user.accessToken);
    return <Layout layoutType='division'>
        <TodoTemplate />
    </Layout>
}