
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import { TransactionModel } from "@/models/modelComptatibilite/TransactionModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const transactionModel: TransactionModel = body;

        const dataValidation = Dto.transactionDto().validate(transactionModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const financialtransaction = await prismadb.financialtransaction.create({ data: dataValidation.value });
            return NextResponse.json({financialtransaction: financialtransaction, ok: true});
        }

    } catch (error) {
        console.error('[financialtransaction]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const financialtransaction = await prismadb.financialtransaction.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(financialtransaction);
    } catch (error) {
        console.error('[getfinancialtransaction]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}