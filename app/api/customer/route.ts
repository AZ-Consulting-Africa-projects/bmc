

import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";   
import { CustomerModel } from "@/models/modelCommercial/CustomerModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const customerModel: CustomerModel = body;

        const dataValidation = Dto.customerDto().validate(customerModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const customer = await prismadb.customer.create({ data: dataValidation.value });
            return NextResponse.json({postes: customer, ok: true});
        }

    } catch (error) {
        console.error('[poste_post]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const customer = await prismadb.customer.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(customer);
    } catch (error) {
        console.error('[getposte]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}