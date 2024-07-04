
import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";                                                                                                                             
import { PostModel } from "@/models/PosteModel";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const postModel: PostModel = body;

        const dataValidation = Dto.postDto().validate(postModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const poste = await prismadb.poste.create({ data: dataValidation.value });
            return NextResponse.json({postes: poste, ok: true});
        }

    } catch (error) {
        console.error('[poste_post]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const poste = await prismadb.poste.findMany({
            orderBy: {
                id: 'desc'
            },
            where: {
                isActived: true,
                isVisible: true
              },
        });
        return NextResponse.json(poste);
    } catch (error) {
        console.error('[getposte]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}