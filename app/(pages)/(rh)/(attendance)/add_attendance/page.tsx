"use client"
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import { useToast } from "@/components/ui/use-toast";
import { UserModel } from "@/models/UserModel";
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Api } from "@/app/api/Api";
import { AttendanceModel } from "@/models/AttendanceModel";

const initialOptions: SelectProps['options'] = undefined;

export default function AddAttendance() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { toast } = useToast();
    const [user, setUser] = useState<SelectProps['options']>(initialOptions)

    useEffect(() => {
        Api.read('/api/user').then((value: any[]) => {
            const newdep: SelectProps['options'] = [];
            value.forEach((element: UserModel) => {
                newdep.push({
                    value: String(element.id),
                    label: String(element.firstName),
                })
            })
            setUser(newdep);
        })

    }, []);


    const formik = useFormik({
        initialValues: {
            userId: "",
            date: "",
            inTime: "",
            outTime: "",
            status: ""
        },
        validationSchema: Yup.object({
            userId: Yup.string().required("Required"),
            date: Yup.string().required("Required"),
            inTime: Yup.string().required("Required"),
            outTime: Yup.string().required("Required"),
            status: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            console.log(values);
            const attendanceModel = new AttendanceModel(Number(values.userId), values.date, values.inTime, values.outTime, values.status);
            const resp = await Api.create('/api/attendance', attendanceModel);
            if (resp.ok) {
                toast({
                    title: "presence ajouté avec succès",
                });
                formik.setValues({
                    userId: "",
                    date: "",
                    inTime: "",
                    outTime: "",
                    status: "",
                });
                setIsLoading(false);
            } else {
                console.log(resp.msg);
                toast({
                    title: "Une erreur s'est produit lors de l'ajout",
                    variant: "destructive"
                });
                formik.setValues({
                    userId: "",
                    date: "",
                    inTime: "",
                    outTime: "",
                    status: "",
                });
                setIsLoading(false);
            }
        }
    })


    return (
        <div className='flex flex-col space-y-10 mb-10'>

            {/** head */}
            <HeadDetaill title={"Ajouter une présence"} subtitle={"user mangement"} />


            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className=" md:flex md:items-center md:justify-center ">
                <form className="flex flex-col gap-5 md:w-[400px] " onSubmit={formik.handleSubmit}>
                    {/**last name */}
                    <div className="flex gap-1">
                        <div className="w-full flex flex-col">
                            <label className={formik.touched.userId && formik.errors.userId ? "text-red-600" : "text-gray-600 "}>

                                {formik.touched.userId && formik.errors.userId ? formik.errors.userId : "Nom de l'employé"}
                                <span className="text-red-600">*</span>
                            </label>

                            <Select

                                style={{ width: '100%' }}
                                onChange={(value: any) => {
                                    formik.values.userId = value;

                                }}
                                options={user as { label: string; value: string; }[]}
                                className=" md:w-[200px] "
                            />

                        </div>

                        <div className="w-full flex flex-col">
                            <label className={formik.touched.date && formik.errors.date ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.date && formik.errors.date ? formik.errors.date : "Date"}
                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="date" name="date"
                                className=" md:w-[200px] "
                                value={formik.values.date}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>


                    <div className="w-full flex flex-col">
                        <label className={formik.touched.inTime && formik.errors.inTime ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.inTime && formik.errors.inTime ? formik.errors.inTime : "Heure d'arrivé"}
                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="time" name="inTime"
                            className=" md:w-full "
                            value={formik.values.inTime}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className="w-full flex flex-col">
                        <label className={formik.touched.outTime && formik.errors.outTime ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.outTime && formik.errors.outTime ? formik.errors.outTime : "Heure de dépare"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="time" name="outTime"
                            className=" md:w-full "
                            value={formik.values.outTime}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** status */}
                    <div className="w-full flex flex-col">
                        <label className={formik.touched.status && formik.errors.status ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.status && formik.errors.status ? formik.errors.status : "Status"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Select
                            style={{ width: '100%' }}
                            onChange={(value) => {
                                formik.values.status = value;
                            }}
                            className=" md:w-full "
                            options={
                                [
                                    {
                                        value: 'PRESENT',
                                        label: 'Present',
                                    },
                                    {
                                        value: 'ABSENT',
                                        label: 'Absent',
                                    },

                                    {
                                        value: 'LATE',
                                        label: 'En retard',
                                    },
                                ]
                            }

                        />

                    </div>

                    {/** button */}
                    <div className="flex space-x-5">
                        <Button loading={isLoading} htmlType="submit">Ajouter</Button>

                        <Button danger htmlType="button"
                            onClick={() => {


                                setValue("")

                            }}
                        >
                            Annuler
                        </Button>
                    </div>
                </form>
            </div>

        </div>
    );
}