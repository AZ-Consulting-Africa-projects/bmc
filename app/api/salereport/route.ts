
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";        
import { SalereportModel } from "@/models/modelCommercial/SalereportModel";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const salereportModel: SalereportModel = body;

        const dataValidation = Dto.salereportDto().validate(salereportModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const salesreports = await prismadb.salesreports.create({ data: dataValidation.value });
            return NextResponse.json({salesreports: salesreports, ok: true});
        }

    } catch (error) {
        console.error('[salesreports]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const salesreports = await prismadb.salesreports.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(salesreports);
    } catch (error) {
        console.error('[salesreports]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}