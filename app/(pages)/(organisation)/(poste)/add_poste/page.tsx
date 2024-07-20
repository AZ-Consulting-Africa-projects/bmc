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

const initialOptions: SelectProps['options'] = undefined;
export default function AddPost() {
    const [isLoading, setIsLoading] = useState(false);
    const [depart, setDepart] = useState<SelectProps['options']>(initialOptions);
    const { toast } = useToast();

    
    useEffect(() => {
        Api.read('/api/departement').then((value: any[]) => {
            const newdep: SelectProps['options'] = [];
            value.forEach((element: DepartementModel) => {
                newdep.push({
                    value: String(element.id),
                    label: String(element.departementName),
                })
            })
            setDepart(newdep);
        })

    }, []);


    const handleChange = (value: string) => {
     
        formik.values.departementId = value;
    };

    const formik = useFormik({
        initialValues: {
            posteName: "",
            description: "",
            departementId: ""
        },
        validationSchema: Yup.object({
            posteName: Yup.string().required("Le nom est obligatoire"),
            description: Yup.string().required("La description est obligatoire"),
            departementId: Yup.string().required("Le département est obligatoire"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const posteModel = new PostModel(values.posteName, +values.departementId, values.description, true, true);
            
            const resp = await Api.create('/api/poste', posteModel);
            if (resp.ok) {
                toast({
                    title: "poste ajouté avec succès",
                });
                formik.values.description = "";
                formik.values.posteName = "";
                    setIsLoading(false);
            } else {
                console.log(resp.msg);
                toast({
                    title: "Une erreur c'est produit lors de l'ajout",
                    variant: "destructive"
                });
                formik.values.description = "";
                formik.values.posteName = "";
                    setIsLoading(false);
            }
        }
    })


    return (
        <div className='flex flex-col space-y-10 mb-10'>
            {/** head */}
            <HeadDetaill title={"Ajouter une Poste"} subtitle={"Organisation mangement"} />

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>

                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>


                    <div className=" flex flex-col">
                        <label className={formik.touched.posteName && formik.errors.posteName ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.posteName && formik.errors.posteName ? formik.errors.posteName : "Nom du poste"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="posteName"
                            className=" md:w-[350px] "
                            value={formik.values.posteName}
                            onChange={formik.handleChange}
                        />
                    </div>

                    <div className=" flex flex-col">
                        <label className={formik.touched.departementId && formik.errors.departementId ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.departementId && formik.errors.departementId ? formik.errors.departementId : "selectioner le département"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Select

                            onChange={handleChange}
                            className=" md:w-[350px] "
                            options={depart as { label: string; value: string; }[]}
                        />
                    </div>

                    <div className=" flex flex-col">
                        <label className={formik.touched.description && formik.errors.description ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : "Description du poste"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="description"
                            className=" md:w-[350px] h-[200px]"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** button */}
                    <div className="flex space-x-5">
                        <Button loading={isLoading} htmlType="submit">Ajouter</Button>

                        <Button danger htmlType="button"
                            onClick={() => {
                                formik.values.description = "";
                                formik.values.posteName = "";
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