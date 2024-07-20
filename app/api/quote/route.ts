
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";       
import { QuoteModel } from "@/models/modelCommercial/QuoteModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const quoteModel: QuoteModel = body;

        const dataValidation = Dto.quoteDto().validate(quoteModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const quotes = await prismadb.quotes.create({ data: dataValidation.value });
            return NextResponse.json({postes: quotes, ok: true});
        }

    } catch (error) {
        console.error('[quotes]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const quotes = await prismadb.quotes.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(quotes);
    } catch (error) {
        console.error('[getposte]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}