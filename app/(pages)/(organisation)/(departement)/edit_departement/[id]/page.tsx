"use client"

import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Separator } from "@/components/ui/separator";
import { Button, Input } from "antd";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { DepartementModel } from "@/models/DepartementModel";
import { Api } from "@/app/api/Api";
import { useToast } from "@/components/ui/use-toast";

export default function AddDepartement({params}: {params: {id: string}}) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
        const fechCat = async () => {
            try {
                const dep: DepartementModel = await Api.read(`/api/departement/${params.id}`);
                const initialVal = {
                    departementName: dep.departementName || '',
                    description: dep.description || '',
                };
                formik.setValues(initialVal);
            }catch (error) {
                console.error("Error fetching category data:", error);
            }
        }

        fechCat();
    }, []);

    const formik = useFormik({
        initialValues: {
            departementName: "",
            description: "",
        },
        validationSchema: Yup.object({
            departementName: Yup.string().required("Le nom est obligatoire"),
            description: Yup.string().optional(),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const departementModel = new DepartementModel(values.departementName, values.description);
            
            const resp = await Api.update(`/api/departement/${+params.id}`, departementModel);
            if(resp.ok) {
                toast({
                    title: "Mise a jour effectué avec succès",
                });
                formik.values.description ="";
                formik.values.departementName="",
                setIsLoading(false);
            } else {
                console.log(resp.msg);
                toast({
                    title: "Une erreur s'est produit lors de la mise a jour",
                    variant: "destructive"
                });
                 formik.values.description ="";
                 formik.values.departementName="",
                setIsLoading(false);
            }
        }
    })


    return (
        <div className='flex flex-col space-y-10 mb-10'>
            {/** head */}
            <HeadDetaill title={"Editer un Departement"} subtitle={"Organisation mangement"} />

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>

                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>

                    
                <div className=" flex flex-col">
                        <label className={formik.touched.departementName && formik.errors.departementName? "text-red-600 ": "text-gray-600 "}>
                            {formik.touched.departementName && formik.errors.departementName? formik.errors.departementName : "Nom du département" }
                            
                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="departementName"
                            className=" md:w-[350px] "
                            value={formik.values.departementName}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className=" flex flex-col">
                        <label className={ formik.touched.description && formik.errors.description? "text-red-600 ": "text-gray-600 "}>
                            {formik.touched.description && formik.errors.description? formik.errors.description : "Description du département"}
                            
                            <span className="text-red-600"></span>
                        </label>

                        <Input type="text" name="description"
                            className=" md:w-[350px] h-[200px]"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** button */}
                <div className="flex space-x-5">
                    <Button loading={isLoading} htmlType="submit">Modifier</Button>

                    <Button danger htmlType="button"
                        onClick={() => {
                           formik.values.description ="";
                           formik.values.departementName="";    
                        
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