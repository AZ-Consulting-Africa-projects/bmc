

import {Dto} from "@/DTO/Dto";
import { UserRecrutementModel } from "@/models/UserRecrutementModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const userRecrutementModel: UserRecrutementModel = body;


        const dataValidate = Dto.userRecrutementDto().validate(userRecrutementModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const userRecrutement = await prismadb.userRecrutement.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({userRecrutement: userRecrutement, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[userRecrutement]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const userRecrutement = await prismadb.departement.delete({
            where: { id: id }
        });

        return NextResponse.json({userRecrutement: userRecrutement, status: 200, ok:true });
    } catch (error) {
        console.error('[userRecrutement]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const userRecrutement = await prismadb.userRecrutement.findUnique({
            where: { id }
        });

        return NextResponse.json(userRecrutement);
    } catch (error) {
        console.error('[userRecrutement]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}