"use client"

import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Separator } from "@/components/ui/separator";
import { Button, Input, Select } from "antd";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { DepartementModel } from "@/models/DepartementModel";
import { Api } from "@/app/api/Api";
import { useToast } from "@/components/ui/use-toast";
import { TransactionModel } from "@/models/modelComptatibilite/TransactionModel";



export default function EditTransaction({params}: {params: {id: string}}) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    useEffect(() => {
    
        const fechCat = async () => {
            try {
                const post: TransactionModel = await Api.read(`/api/transaction/${params.id}`);
                const initialVal = {
                    date: post.date || '',
                    amount: String(post.amount) || '',
                    type: String(post.type) || '',
                    category: String(post.category) || '',
                    status: String(post.status) || '',
                    description: String(post.description) || '',
                };
                formik.setValues(initialVal);
            }catch (error) {
                console.error("Error fetching category data:", error);
            }
        }

        fechCat();

    }, []);

    const resetForm = () => {
        formik.values.date = "";
        formik.values.amount = "";
        formik.values.type = "";
        formik.values.category = "";
        formik.values.status = "";
        formik.values.description = "";
    }

    

    const formik = useFormik({
        initialValues: {
            date: "",
            amount: "",
            type: "",
            category: "",
            status: "",
            description: ""
        },
        validationSchema: Yup.object({
            date: Yup.string().required("La date est obligatoire"),
            amount: Yup.number().required("Le montant est obligatoire"),
            type: Yup.string().required("Le type est obligatoire"),
            category: Yup.string().required("La catégorie est obligatoire"),
            status: Yup.string().required("Le status est obligatoire"),
            description: Yup.string().required("La description est obligatoire"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const transactionModel = new TransactionModel(values.date, +values.amount, values.type, values.category, values.status, values.description, +params.id);
            const resp = await Api.update(`/api/poste/${params.id}`, transactionModel);

            if (resp.ok) {
                toast({
                    title: " Modification effectué avec succès",
                });
                resetForm();
                
                setIsLoading(false);
            } else {
                console.log(resp.msg);
                toast({
                    title: "Une erreur c'est produit lors de la modification",
                    variant: "destructive"
                });
                
                    setIsLoading(false);
            }

        }
    })
    return (
        <main className='flex flex-col space-y-10 mb-10'>
            {/** head */}
            <HeadDetaill title={"Ajouter une Transaction"} subtitle={"Gestion de la comptatiblité"} />

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>

                    {/*date*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.date && formik.errors.date ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.date && formik.errors.date ? formik.errors.date : "Date"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="date" name="date"
                            className=" md:w-[350px] "
                            value={formik.values.date}
                            onChange={formik.handleChange}
                        />
                    </div>


                    {/*type*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.type && formik.errors.type ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.type && formik.errors.type ? formik.errors.type : "Type de transaction"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Select
                            onChange={(value) => {
                                formik.values.type = value;
                            }}
                            className=" md:w-[350px] "
                            options={[
                                {
                                    label: "RECETTE",
                                    value: "RECETTE",
                                },
                                {
                                    label: "DEPENSE",
                                    value: "DEPENSE",
                                },
                            ]}
                        />
                    </div>

                    {/*amount*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.amount && formik.errors.amount ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.amount && formik.errors.amount ? formik.errors.amount : "Montant"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="number" name="amount"
                            className=" md:w-[350px] "
                            value={formik.values.amount}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/*category*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.category && formik.errors.category ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.category && formik.errors.category ? formik.errors.category : "Catégorie de transaction"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="category"
                            placeholder="ex: SALAIRE/LOYER/AUTRE"
                            className=" md:w-[350px] "
                            value={formik.values.category}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/*type*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.status && formik.errors.status ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.status && formik.errors.status ? formik.errors.status : "Status de la transaction"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Select
                            onChange={(value) => {
                                formik.values.status = value;
                            }}
                            className=" md:w-[350px] "
                            options={[
                                {
                                    label: "En attente",
                                    value: "PENDING",
                                },
                                {
                                    label: "Finie",
                                    value: "COMPLETED",
                                },
                                {
                                    label: "Échoié",
                                    value: "FAILED",
                                },
                            ]}
                        />
                    </div>

                     {/*descrition*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.description && formik.errors.description ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : "description de la transaction"}
                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="description"
                            className=" md:w-[350px] h-[10rem]"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** button */}
                    <div className="flex space-x-5">
                        <Button loading={isLoading} htmlType="submit" className="bg-blue-600 text-white">Modification</Button>

                        <Button danger htmlType="button"
                            onClick={() => {
                                resetForm();
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