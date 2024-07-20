"use client"
import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Separator } from "@/components/ui/separator";
import { Button, Input, SelectProps } from "antd";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Select, Space } from 'antd';
import { Api } from "@/app/api/Api";
import { useToast } from "@/components/ui/use-toast";
import { CustomerModel } from "@/models/modelCommercial/CustomerModel";
import { SaleModel } from "@/models/modelCommercial/SaleModel";

const initialOptions: SelectProps['options'] = undefined;

export default function AddSale() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [customer, setCustomer] = useState<SelectProps['options']>(initialOptions);


    useEffect(() => {
        Api.read('/api/customer').then((value: any[]) => {
            const newdep: SelectProps['options'] = [];
            value.forEach((element: CustomerModel) => {
                newdep.push({
                    value: String(element.id),
                    label: String(element.name),
                })
            })
            setCustomer(newdep);
        })

    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            customerId: "",
            stage: "",
            estimated_amount: "",
            close_date: "",
            description: "",
            status: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Le nom est obligatoire"),
            customerId: Yup.string().required("Le client est obligatoire"),
            stage: Yup.string().required("Le stage est obligatoire"),
            estimated_amount: Yup.number().required("L'estimation est obligatoire"),
            close_date: Yup.string().required("La date de fermeture est obligatoire"),
            description: Yup.string().required("La description est obligatoire"),
            status: Yup.string().required("Le status est obligatoire"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            
            const saleModel = new SaleModel(values.name, +values.customerId, values.stage, +values.estimated_amount, values.close_date, values.description, values.status);
            const resp = await Api.create('/api/sale', saleModel);
            if (resp.ok) {
                toast({
                    title: "opportunité ajouté avec succès",
                });
                    setIsLoading(false);
            } else {
                console.log(resp.msg);
                toast({
                    title: "Une erreur c'est produit lors de l'ajout",
                    variant: "destructive"
                });
                    setIsLoading(false);
            }
        }
    })

    return (
        <main className='flex flex-col space-y-10 mb-10'>
            {/** head */}
            <HeadDetaill title={"Ajouter une Oportunités de vente"} subtitle={"Gestion du departement commercial"}   />

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>

                    {/* name */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.name && formik.errors.name ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.name && formik.errors.name ? formik.errors.name : "Nom de l'opportunité de vente"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="name"
                            className=" md:w-[350px] "
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/* customer id*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.customerId && formik.errors.customerId ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.customerId && formik.errors.customerId ? formik.errors.customerId : "Client"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Select

                            onChange={(value) => {
                                formik.values.customerId = value;
                            }}
                            className=" md:w-[350px] "
                            options={customer as { label: string; value: string; }[]}
                        />
                    </div>

                    {/* sage */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.stage && formik.errors.stage ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.stage && formik.errors.stage ? formik.errors.stage : "Date"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Select

                            onChange={(value) => {
                                formik.values.stage = value;
                            }}
                            className=" md:w-[350px] "
                            options={[
                                {
                                    value: "Prospection",
                                    label: "Prospection",
                                },
                                {
                                    value: "Negociation",
                                    label: "Negociation",
                                }
                            ]}
                        />
                    </div>

                    {/* amount */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.estimated_amount && formik.errors.estimated_amount ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.estimated_amount && formik.errors.estimated_amount ? formik.errors.estimated_amount : "Date"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="number" name="estimated_amount"
                            className=" md:w-[350px] "
                            value={formik.values.estimated_amount}
                            onChange={formik.handleChange}
                        />
                    </div>


                    {/* close date */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.close_date && formik.errors.close_date ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.close_date && formik.errors.close_date ? formik.errors.close_date : "Date"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="date" name="close_date"
                            className=" md:w-[350px] "
                            value={formik.values.close_date}
                            onChange={formik.handleChange}
                        />
                    </div>


                    {/* status */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.status && formik.errors.status ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.status && formik.errors.status ? formik.errors.status : "Status"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Select

                            onChange={(value) => {
                                formik.values.status = value;
                            }}
                            className=" md:w-[350px] "
                            options={[
                                {
                                    value: "OPEN",
                                    label: "Ouvert",
                                },
                                {
                                    value: "CLOSE",
                                    label: "Fermer",
                                }
                            ]}
                        />
                    </div>

                    {/* date */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.description && formik.errors.description ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : "Date"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="description"
                            className=" md:w-[350px] "
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>


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