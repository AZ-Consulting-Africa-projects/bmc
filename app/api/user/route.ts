import { UserModel } from "@/models/UserModel";
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import bcrypt from "bcrypt";                                                                                                                                    

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userModel: UserModel = body;
        userModel.password = await bcrypt.hash(String(userModel.password), 10);

        const dataValidation = Dto.userDto().validate(userModel);
        if (dataValidation.error) {
            return new NextResponse(dataValidation.error.message, { status: 400 });
        } else {
            const user = await prismadb.user.create({ data: dataValidation.value });
            return NextResponse.json(user);
        }

    } catch (error) {
        console.error('[user_post]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}


export async function GET() {
    try {
        const users = await prismadb.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error('[getUsers]', error);
        return new NextResponse('Internal error', { status: 500 });
    }
}