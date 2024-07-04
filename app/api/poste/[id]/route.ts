

import {Dto} from "@/DTO/Dto";
import { PostModel } from "@/models/PosteModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const posteModel: PostModel = body;

     

        const dataValidate = Dto.postDto().validate(posteModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const poste = await prismadb.poste.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({poste: poste, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[updateUser]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const poste = await prismadb.poste.delete({
            where: { id: id }
        });

        return NextResponse.json({poste: poste, status: 200, ok:true });
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const poste = await prismadb.poste.findUnique({
            where: { id }
        });

        return NextResponse.json(poste);
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}