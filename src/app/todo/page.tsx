'use client';

import {useSession} from "next-auth/react";
import Layout from "@/components/layout/Layout";

export default function TodoPage() {
    const {data :session} = useSession();
    console.log(session);
    return <Layout layoutType='division'>
        Todo Page
        calendar view or list view
    </Layout>
}