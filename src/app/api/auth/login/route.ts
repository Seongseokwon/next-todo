import {PrismaClient} from '@prisma/client'
import {NextRequest, NextResponse} from "next/server";
import {checkHash} from "@/utils/encrypt";
import {prisma} from "@/lib/prisma/prisma";
import {signJwtAccessToken} from "@/utils/jwt";

interface LoginRequestBody {
    email: string;
    password: string;
}

export async function POST(req: NextRequest) {
    try {
        const body: LoginRequestBody = await req.json();

        const user = await prisma.user.findFirstOrThrow({
            where: {
                email: body.email
            },
            select: {
                id: true,
                email: true,
                password: true,
                nickname: true,
                level: true,
                maxExpTodoDaily: true,
                currentExperience: true
            }
        });

        if (!await checkHash(body.password, user.password)) {
            return new NextResponse('Password does not matched', {
                status: 401,
                statusText: 'Password does not matched'
            })
        }
        const {password, ...withoutPassword} = user;
        const accessToken = signJwtAccessToken(withoutPassword)
        return NextResponse.json({...withoutPassword, accessToken});
    } catch (e) {
        console.error(e);
        return new NextResponse('Invalid user information', {
            status: 401,
            statusText: 'Invalid user information'
        })

    }


}