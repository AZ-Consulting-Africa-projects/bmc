
import {Dto} from "@/DTO/Dto";
import { AttendanceModel } from "@/models/AttendanceModel";
import prismadb from "@/prisma/prismadb";
import {NextResponse} from "next/server";

export async function PUT(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const body = await req.json();
        const attendanceModel: AttendanceModel = body;

     

        const dataValidate = Dto.attendanceDto().validate(attendanceModel);
        if (dataValidate.error) {
            return  NextResponse.json({msg: dataValidate.error.message,  status: 422, ok:false });
        }
        else {
             const attendance = await prismadb.attendance.update({
            where: { id: Number(id) },
            data: dataValidate.value
        });

        return NextResponse.json({attendance: attendance, status: 200, ok:true });
        }

       
    } catch (error) {
        console.error('[updateattendance]', error);
        return  NextResponse.json({msg:`Internal error ${error}`,  status: 500, ok: false });
    }
}

export async function DELETE(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const attendance = await prismadb.attendance.delete({
            where: { id: id }
        });

        return NextResponse.json({attendance: attendance, status: 200, ok:true });
    } catch (error) {
        console.error('[deleteattendance]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok:false });
    }
}

export async function GET(req: Request, { params  }: { params: {id: string}}) {
    try {
        const id = Number(params.id);
        const attendance = await prismadb.attendance.findUnique({
            where: { id },
            include: {
                user: true
            }
        });

        return NextResponse.json(attendance);
    } catch (error) {
        console.error('[deleteUser]', error);
        return  NextResponse.json({msg: `Internal error ${error}`,  status: 500 });
    }
}