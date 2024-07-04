
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";                                                                                                                             
import { DepartementModel } from "@/models/DepartementModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const departementModel: DepartementModel = body;

        const dataValidation = Dto.departementDto().validate(departementModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const departement = await prismadb.departement.create({ data: dataValidation.value });
            return NextResponse.json({departement: departement, ok: true});
        }

    } catch (error) {
        console.error('[departement_post]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const departement = await prismadb.departement.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(departement);
    } catch (error) {
        console.error('[getdepartement]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}