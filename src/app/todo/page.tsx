'use client';

import Layout from "@/components/layout/Layout";
import TodoTemplate from "@/components/todo/TodoTemplate";

export default function TodoPage() {
    return <Layout layoutType='division'>
        <TodoTemplate />
    </Layout>
}