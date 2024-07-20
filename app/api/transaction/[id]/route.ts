import { TransactionModel } from './../../../../models/modelComptatibilite/TransactionModel';
import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const transactionModel: TransactionModel = body;

     

        const dataValidate = Dto.transactionDto().validate(transactionModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const financialtransaction = await prismadb.financialtransaction.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({financialtransaction: financialtransaction, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[updateUser]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const financialtransaction = await prismadb.financialtransaction.delete({
            where: { id: id }
        });

        return NextResponse.json({financialtransaction: financialtransaction, status: 200, ok:true });
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const financialtransaction = await prismadb.financialtransaction.findUnique({
            where: { id }
        });

        return NextResponse.json(financialtransaction);
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}