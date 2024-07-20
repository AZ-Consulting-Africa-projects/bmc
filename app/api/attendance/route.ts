import { AttendanceModel } from './../../../models/AttendanceModel';

import { NextResponse } from "next/server";
import { Dto } from "@/DTO/Dto";
import prismadb from "@/prisma/prismadb";                   

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const attendanceModel: AttendanceModel = body;

        const dataValidation = Dto.attendanceDto().validate(attendanceModel);
        if (dataValidation.error) {
            return NextResponse.json({msg: dataValidation.error.message,  status: 400, ok:false});
        } else {
            const attendance = await prismadb.attendance.create({ data: dataValidation.value });
            return NextResponse.json({attendance: attendance, ok: true});
        }

    } catch (error) {
        console.error('[attendance_post]', error);
        return NextResponse.json({msg: `Internal error ${error}`,  status: 500, ok: false});
    }
}


export async function GET() {
    try {
        const attendance = await prismadb.attendance.findMany({
            include: {
                user: true
            }
        });
        return NextResponse.json(attendance);
    } catch (error) {
        console.error('[getattendance]', error);
        return new NextResponse(`Internal error ${error}`, { status: 500 });
    }
}