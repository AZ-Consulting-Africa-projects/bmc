"use client"
import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Separator } from "@/components/ui/separator";
import { Button, Input, SelectProps } from "antd";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Select, Space } from 'antd';
import { Api } from "@/app/api/Api";
import { DepartementModel } from "@/models/DepartementModel";
import { PostModel } from "@/models/PosteModel";
import { useToast } from "@/components/ui/use-toast";

export default function AddCustomer() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const formik = useFormik({
        initialValues: {},
        validationSchema: Yup.object({

        }),
        onSubmit: async (values) => {
            console.log(values)
        }
    })

    return (
        <main className='flex flex-col space-y-10 mb-10'>
            {/** head */}
            <HeadDetaill title={"Ajouter une Poste"} subtitle={"Organisation mangement"} />

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>


{/** button */}
                    <div className="flex space-x-5">
                        <Button className="bg-blue-600 font-bold text-white" loading={isLoading} htmlType="submit">Ajouter</Button>
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
    )
}