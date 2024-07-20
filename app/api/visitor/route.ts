
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import { VisitorModel } from "@/models/VisitorModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const visitorModel: VisitorModel = body;

        const dataValidation = Dto.visitorDto().validate(visitorModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            console.log(dataValidation.value)
            const visitor = await prismadb.visitor.create({ data: dataValidation.value });
            return NextResponse.json({visitor: visitor, ok: true});
        }

    } catch (error) {
        console.error('[visitor]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const visitor = await prismadb.visitor.findMany({
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(visitor);
    } catch (error) {
        console.error('[getvisitor]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}