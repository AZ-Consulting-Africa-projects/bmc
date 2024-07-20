
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";                       
import { RecrutementModel } from "@/models/RecrutementModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const recrutementModel: RecrutementModel = body;

        const dataValidation = Dto.recrutementDto().validate(recrutementModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const recrutement = await prismadb.recrutement.create({ data: dataValidation.value });
            return NextResponse.json({recrutement: recrutement, ok: true});
        }

    } catch (error) {
        console.error('[recrutement]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const recrutement = await prismadb.recrutement.findMany({
            where: {
                isActived: true,
                isVisible: true
              },
              
        });
        return NextResponse.json(recrutement);
    } catch (error) {
        console.error('[getrecrutement]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}