

import {Dto} from "@/DTO/Dto";
import { SaleModel } from "@/models/modelCommercial/SaleModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const saleModel: SaleModel = body;

     

        const dataValidate = Dto.saleDto().validate(saleModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const salesopportunities = await prismadb.salesopportunities.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({salesopportunities: salesopportunities, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[salesopportunities]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const salesopportunities = await prismadb.salesopportunities.delete({
            where: { id: id }
        });

        return NextResponse.json({salesopportunities: salesopportunities, status: 200, ok:true });
    } catch (error) {
        console.error('[salesopportunities]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const salesopportunities = await prismadb.salesopportunities.findUnique({
            where: { id }
        });

        return NextResponse.json(salesopportunities);
    } catch (error) {
        console.error('[salesopportunities]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}