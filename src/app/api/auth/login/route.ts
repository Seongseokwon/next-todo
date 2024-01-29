import {PrismaClient} from '@prisma/client'
import {NextRequest, NextResponse} from "next/server";
import {checkHash} from "@/utils/encrypt";
import {prisma} from "@/prisma/index";

export async function POST(req: NextRequest) {
    try {
        const {email, password} = await req.json();
        console.log('Login Request', email, password);

        const user = await prisma.user.findFirstOrThrow({
            where: {
                email
            }
        });

        console.log('Find User', user);
        if (!await checkHash(password, user.password)) {
            return new NextResponse('Password does not matched', {
                status: 401,
                statusText: 'Password does not matched'
            })
        }
        return NextResponse.json(user);
    } catch (e) {
        console.error(e);
        return new NextResponse('Invalid user information', {
            status: 401,
            statusText: 'Invalid user information'
        })

    }


}