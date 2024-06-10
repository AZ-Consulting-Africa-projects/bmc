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
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import { useToast } from "@/components/ui/use-toast";
import { UserModel } from "@/models/UserModel";
import { Select } from 'antd';
import type { SelectProps } from 'antd';

export default function AddAttendance() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { toast } = useToast();
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const formik = useFormik({
        initialValues: {
            name: "",
            date: "",
            inTime: "",
            outTime: "",
            status: ""
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            date: Yup.string().required("Required"),
            inTime: Yup.string().required("Required"),
            outTime: Yup.string().required("Required"),
            status: Yup.string().required("Required"),
        }),
        onSubmit: async (values) => {
            console.log(values)
        }
    })

    const options: SelectProps['options'] = [];

    for (let i = 10; i < 36; i++) {
        options.push({
            value: i.toString(36) + i,
            label: i.toString(36) + i,
        });
    }

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (
        <div className='flex flex-col space-y-10 mb-10'>

            {/** head */}
            <div className="flex justify-between content-between w-full items-center">
                <div>
                    <h1 className="md:text-3xl text-xl font-bold">Ajouter une presence</h1>
                    <p className="text-gray-600 text-[13px] ">Employees mangement</p>
                </div>

                <Button
                    size={"small"}
                    className="bg-blue-600 flex space-x-2 text-white p-2"
                    onClick={() => {
                        router.push('/attendance')
                    }}
                >

                    <ArrowLeft />

                </Button>
            </div>

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className=" md:flex md:items-center md:justify-center ">
                <form className="flex flex-col gap-5 md:w-[400px] " onSubmit={formik.handleSubmit}>
                    {/**last name */}
                    <div className="flex gap-1">
                        <div className="w-full flex flex-col">
                            <label className={formik.touched.name && formik.errors.name ? "text-red-600" :  "text-gray-600 "}>

                                {formik.touched.name && formik.errors.name ? formik.errors.name : "Nom de l'employé" }
                                <span className="text-red-600">*</span>
                            </label>

                            <Select
                                mode="tags"
                                style={{ width: '100%' }}
                                onChange={handleChange}
                                options={options}
                                className=" md:w-[200px] "
                            />

                        </div>

                        <div className="w-full flex flex-col">
                            <label className={formik.touched.date && formik.errors.date ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.date && formik.errors.date ? formik.errors.date : "Date de l'arrivée"}
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
                        <label className={formik.touched.status && formik.errors.status ? "text-red-600" :"text-gray-600 "}>
                            {formik.touched.status && formik.errors.status ? formik.errors.status : "Status"}
                            
                            <span className="text-red-600">*</span>
                        </label>

                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            onChange={handleChange}
                            options={options}
                            className=" md:w-full "
                        />
                        
                    </div>

                    {/** button */}
                    <div className="flex space-x-5">
                        <Button loading={isLoading} htmlType="submit">Ajouter</Button>

                        <Button danger htmlType="button"
                            onClick={() => {

                                setImage("");
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