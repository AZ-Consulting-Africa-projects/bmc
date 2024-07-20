
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";         
import { SaleModel } from "@/models/modelCommercial/SaleModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const saleModel: SaleModel = body;

        const dataValidation = Dto.saleDto().validate(saleModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const salesopportunities = await prismadb.salesopportunities.create({ data: dataValidation.value });
            return NextResponse.json({salesopportunities: salesopportunities, ok: true});
        }

    } catch (error) {
        console.error('[salesopportunities]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const salesopportunities = await prismadb.salesopportunities.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(salesopportunities);
    } catch (error) {
        console.error('[salesopportunities]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}