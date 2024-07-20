

import {Dto} from "@/DTO/Dto";
import { InvoiceModel } from "@/models/modelComptatibilite/InvoiceModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const invoiceModel: InvoiceModel = body;

     

        const dataValidate = Dto.invoiceDto().validate(invoiceModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const invoice = await prismadb.invoice.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({invoice: invoice, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[updateUser]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const invoice = await prismadb.invoice.delete({
            where: { id: id }
        });

        return NextResponse.json({invoice: invoice, status: 200, ok:true });
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const invoice = await prismadb.invoice.findUnique({
            where: { id }
        });

        return NextResponse.json(invoice);
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}