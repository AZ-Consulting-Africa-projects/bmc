

import {Dto} from "@/DTO/Dto";
import { QuoteModel } from "@/models/modelCommercial/QuoteModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const quoteModel: QuoteModel = body;

     

        const dataValidate = Dto.quoteDto().validate(quoteModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const quotes = await prismadb.quotes.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({quotes: quotes, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[updateUser]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const quotes = await prismadb.quotes.delete({
            where: { id: id }
        });

        return NextResponse.json({quotes: quotes, status: 200, ok:true });
    } catch (error) {
        console.error('[quotes]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const quotes = await prismadb.quotes.findUnique({
            where: { id }
        });

        return NextResponse.json(quotes);
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}