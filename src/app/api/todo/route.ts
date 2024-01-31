import {NextRequest, NextResponse} from "next/server";
import {PRIORITY} from "@/types/Todo";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {NextApiResponse} from "next";
import {verifyJwt} from "@/utils/jwt";
import {cookies} from "next/headers";
import {prisma} from "@/lib/prisma/prisma";
import {Todo} from "@prisma/client";
import {Prisma} from ".prisma/client";

interface TodoRegister {
    title: string;
    description?: string;
    priority: PRIORITY
}

function formatSearchDate(date: string) {
    const formatDate = new Date(date);
    const startDate = new Date(formatDate.getFullYear(), formatDate.getMonth(), formatDate.getDate() - 1);
    const lastDayOfMonth = new Date(formatDate.getFullYear(), formatDate.getMonth() + 1, 0).getDate();
    const endDate = new Date(formatDate.getFullYear(), formatDate.getMonth(), lastDayOfMonth, 23, 59, 59);

    return {startDate, endDate}
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const body: TodoRegister = await req.json();
    const cookieStore = cookies();
    const userInfo = verifyJwt(session!.user.accessToken)

    if (!session || !userInfo) {
        cookieStore.delete('next-auth.session-token');
        return new NextResponse('Session Expired', {
            status: 401,
            statusText: 'Session Expired'
        })
    }

    const res = await prisma.todo.create({
        data: {
            title: body.title,
            description: body.description || '',
            priority: body.priority,
            userId: userInfo.id
        }
    })

    console.log(res);
    return NextResponse.json({message: 'register success'});
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userInfo = verifyJwt(session!.user.accessToken)
    const cookieStore = cookies();
    const selectDate = req.nextUrl.searchParams.get('selectedDate');
    if (!session || !userInfo) {
        cookieStore.delete('next-auth.session-token');
        return new NextResponse('Session Expired', {
            status: 401,
            statusText: 'Session Expired'
        })
    }
    const {id} = (userInfo);
    const {startDate, endDate} = formatSearchDate(selectDate!);

    const calendarData = await prisma.$queryRaw`
        SELECT to_char("Todo"."created_at", 'DD') as date,
            json_agg(
                json_build_object(
                    'id', id,
                    'title',title,
                    'description',description,
                    'priority',priority,
                    'completed',completed,
                )
            ) AS todos,
            Count(*) as total, 
            Sum(case when "Todo".completed = true then 1 else 0 end) as completed
        from "Todo"
        where "Todo".user_id = ${id}
          AND ("Todo".created_at >= ${startDate}
          AND "Todo".created_at <= ${endDate})
        group by date
        order by date`;

    const stringify = JSON.stringify(calendarData, (key, value) => (typeof value === 'bigint' ? value.toString() : value));

    return NextResponse.json(stringify)
}