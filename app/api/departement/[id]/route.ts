import { DepartementModel } from '@/models/DepartementModel';

import {Dto} from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const departementModel: DepartementModel = body;

     

        const dataValidate = Dto.departementDto().validate(departementModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const departement = await prismadb.departement.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({departement: departement, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[updateUser]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const departement = await prismadb.departement.delete({
            where: { id: id }
        });

        return NextResponse.json({departement: departement, status: 200, ok:true });
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const departement = await prismadb.departement.findUnique({
            where: { id }
        });

        return NextResponse.json(departement);
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}