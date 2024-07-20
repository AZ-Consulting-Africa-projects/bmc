

import {Dto} from "@/DTO/Dto";
import { SalereportModel } from "@/models/modelCommercial/SalereportModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const salereportModel: SalereportModel = body;

     

        const dataValidate = Dto.salereportDto().validate(salereportModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const salesreports = await prismadb.salesreports.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({salesreports: salesreports, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[salesreports]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const salesreports = await prismadb.salesreports.delete({
            where: { id: id }
        });

        return NextResponse.json({salesreports: salesreports, status: 200, ok:true });
    } catch (error) {
        console.error('[salesreports]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const salesreports = await prismadb.salesreports.findUnique({
            where: { id }
        });

        return NextResponse.json(salesreports);
    } catch (error) {
        console.error('[salesreports]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}