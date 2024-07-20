
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb"; 
import { UserRecrutementModel } from "@/models/UserRecrutementModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const userRecrutementModel: UserRecrutementModel = body;

        const dataValidation = Dto.userRecrutementDto().validate(userRecrutementModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const userRecrutement = await prismadb.userRecrutement.create({ data: dataValidation.value });
            return NextResponse.json({userRecrutement: userRecrutement, ok: true});
        }

    } catch (error) {
        console.error('[userRecrutement]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const userRecrutement = await prismadb.userRecrutement.findMany({
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(userRecrutement);
    } catch (error) {
        console.error('[userRecrutement]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}