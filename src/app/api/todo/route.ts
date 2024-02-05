import {NextRequest, NextResponse} from "next/server";
import {PRIORITY} from "@/types/Todo";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {verifyJwt} from "@/utils/jwt";
import {cookies} from "next/headers";
import {prisma} from "@/lib/prisma/prisma";

interface TodoRegister {
    title: string;
    description?: string;
    priority: PRIORITY,
    expiredAt: Date
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
            userId: userInfo.id,
            expiredAt: body.expiredAt
        }
    })
    return NextResponse.json({message: 'register success'});
}

export async function GET(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const userInfo = verifyJwt(session!.user.accessToken)
    const cookieStore = cookies();
    const month = req.nextUrl.searchParams.get('month');

    if (!session || !userInfo) {
        cookieStore.delete('next-auth.session-token');
        return new NextResponse('Session Expired', {
            status: 401,
            statusText: 'Session Expired'
        })
    }
    const {id} = (userInfo);

    const calendarData = await prisma.$queryRaw`
        SELECT CAST(to_char("Todo"."expired_at" AT TIME ZONE 'Asia/Seoul', 'DD') as int) as day,
            json_agg(
                json_build_object(
                    'id', id,
                    'title',title,
                    'description',description,
                    'priority',priority,
                    'completed',completed,
                    'createdAt', created_at
                )
            ) AS todos,
            CAST(Count(*) as int) as total, 
            CAST(Sum(case when "Todo".completed = true then 1 else 0 end) as int) as completed
        from "Todo"
        where "Todo".user_id = ${id}
          AND EXTRACT (MONTH from ("Todo".expired_at AT TIME ZONE 'Asia/Seoul'))= CAST (${month} as int)
        group by day
        order by day`;

    const stringify = JSON.stringify(calendarData, (key, value) => (typeof value === 'bigint' ? value.toString() : value));

    return NextResponse.json(stringify)
}