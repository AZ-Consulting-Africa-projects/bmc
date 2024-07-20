
import {Dto} from "@/DTO/Dto";
import { RecrutementModel } from "@/models/RecrutementModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const recrutementModel: RecrutementModel = body;

     

        const dataValidate = Dto.recrutementDto().validate(recrutementModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const recrutement = await prismadb.recrutement.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({recrutement: recrutement, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[recrutement]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const recrutement = await prismadb.recrutement.delete({
            where: { id: id }
        });

        return NextResponse.json({recrutement: recrutement, status: 200, ok:true });
    } catch (error) {
        console.error('[recrutement]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const recrutement = await prismadb.recrutement.findUnique({
            where: { id }
        });

        return NextResponse.json(recrutement);
    } catch (error) {
        console.error('[recrutement]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}