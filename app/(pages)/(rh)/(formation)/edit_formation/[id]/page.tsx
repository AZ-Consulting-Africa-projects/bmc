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



export default function Formation({ params }: { params: { id: string } }) {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { toast } = useToast();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            startDate: "",
            endDate: "",
            userIds: ""
        },
        validationSchema: Yup.object({
            title: Yup.string().required('le titre est obligatoire'),
            description: Yup.string().required('le description est obligatoire'),
            startDate: Yup.string().required('la date  est obligatoire'),
            endDate: Yup.string().required('la date  est obligatoire'),
            userIds: Yup.string().required('l employé est obligatoire')
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
        formik.values.userIds = value;
        console.log(`selected ${value}`);
    };


    return (
        <main className='flex flex-col space-y-10 mb-10'>
            {/** head */}
            <div className="flex justify-between content-between w-full items-center">
                <div>
                    <h1 className="md:text-3xl text-xl font-bold">Editer une formation</h1>
                    <p className="text-gray-600 text-[13px] ">Employees mangement</p>
                </div>

                <Button
                    size={"small"}
                    className="bg-blue-600 flex space-x-2 text-white p-2"
                    onClick={() => {
                        router.push('/formation')
                    }}
                >

                    <ArrowLeft />

                </Button>
            </div>

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className=" md:flex md:items-center md:justify-center ">
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5 md:w-[600px] ">
                    <h1 className="text-center text-sky-400">Les champs précédés de * sont obligatoirs</h1>

                    <div>
                        <label htmlFor={formik.touched.title && formik.errors.title ? " text-red-600" : ""}>
                            {formik.touched.title && formik.errors.title ? formik.errors.title : "Titre"} <span className="text-red-600">*</span>
                        </label>
                        <Input type="text" name="title" value={formik.values.title} onChange={formik.handleChange} />
                    </div>

                    <div>
                        <label htmlFor={formik.touched.description && formik.errors.description ? " text-red-600" : ""}>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : "Description"} <span className="text-red-600">*</span>
                        </label>
                        <Input type="text" name="description" className="h-[120px]" value={formik.values.description} onChange={formik.handleChange} />
                    </div>

                    <div>
                        <label htmlFor={formik.touched.userIds && formik.errors.userIds ? " text-red-600" : ""}>
                            {formik.touched.userIds && formik.errors.userIds ? formik.errors.userIds : "Employé en charge"} <span className="text-red-600">*</span>
                        </label>
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            onChange={handleChange}
                            options={options}
                            className=" md:w-[200px] "
                        />
                    </div>

                    <div>
                        <label htmlFor={formik.touched.startDate && formik.errors.startDate ? " text-red-600" : ""}>
                            {formik.touched.startDate && formik.errors.startDate ? formik.errors.startDate : "Date de début"} <span className="text-red-600">*</span>
                        </label>
                        <Input type="date" name="startDate" value={formik.values.startDate} onChange={formik.handleChange} />
                    </div>

                    <div>
                        <label htmlFor={formik.touched.endDate && formik.errors.endDate ? " text-red-600" : ""}>
                            {formik.touched.endDate && formik.errors.endDate ? formik.errors.endDate : "date de fin"} <span className="text-red-600">*</span>
                        </label>
                        <Input type="date" name="endDate" value={formik.values.endDate} onChange={formik.handleChange} />
                    </div>


                    {/** button */}
                    <div className="flex space-x-5">
                        <Button loading={isLoading} htmlType="submit">Ajouter</Button>

                        <Button danger htmlType="button"
                            onClick={() => {


                            }}
                        >
                            Annuler
                        </Button>
                    </div>

                </form>
            </div>

        </main>
    );
}