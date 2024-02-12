import {NextRequest, NextResponse} from "next/server";
import {PRIORITY, Todo} from "@/types/Todo";
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
                    'createdAt', created_at,
                    'expEarned', exp_earned
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

function expCheck(curExp: number, priority: PRIORITY) {
    if (priority === PRIORITY.LOW) {
        return curExp + 1;
    } else if (priority === PRIORITY.MEDIUM) {
        return curExp + 3;
    } else {
        return curExp + 5;
    }
}

export async function PATCH(req: NextRequest) {
    const session = await getServerSession(authOptions);
    const body: Todo = await req.json()
    const cookieStore = cookies();
    const userInfo = verifyJwt(session!.user.accessToken)

    console.log('Check User Info', userInfo);
    if (!session || !userInfo) {
        cookieStore.delete('next-auth.session-token');
        return new NextResponse('Session Expired', {
            status: 401,
            statusText: 'Session Expired'
        })
    }
    await prisma.todo.update({
        where: {
            id: body.id
        },
        data: {
            completed: !body.completed,
            expEarned: body.expEarned ? body.expEarned : !body.expEarned
        }
    });
    if (body.expEarned) {
        return NextResponse.json({message: 'no exp'})
    }

    const updateUserInfo = await prisma.user.update({
        where: {
            id: userInfo.id
        },
        data: {
            maxExpTodoDaily: userInfo.maxExpTodoDaily - 1,
            currentExperience: expCheck(userInfo.currentExperience, body.priority)
        },
        select: {
            id: true,
            level: true,
            levelId: true,
            currentExperience: true
        }
    })

    console.log('Update User Info', updateUserInfo);
    if (updateUserInfo.level.maxExperience <= updateUserInfo.currentExperience) {
        const levelUpdate =await prisma.user.update({
            where: {
                id: updateUserInfo.id
            },
            data: {
                levelId: updateUserInfo.levelId + 1
            }
        })
        console.log('Level Update', levelUpdate);
    }
    return NextResponse.json({message: 'good'})


}