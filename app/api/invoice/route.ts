
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";           
import { InvoiceModel } from "@/models/modelComptatibilite/InvoiceModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const invoiceModel: InvoiceModel = body;

        const dataValidation = Dto.invoiceDto().validate(invoiceModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const invoice = await prismadb.invoice.create({ data: dataValidation.value });
            return NextResponse.json({invoice: invoice, ok: true});
        }

    } catch (error) {
        console.error('[poste_post]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const invoice = await prismadb.invoice.findMany({
            include: {
                user: true,
            },
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(invoice);
    } catch (error) {
        console.error('[getposte]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}