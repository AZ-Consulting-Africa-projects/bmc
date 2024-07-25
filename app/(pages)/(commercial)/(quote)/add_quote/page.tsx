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
import { CustomerModel } from "@/models/modelCommercial/CustomerModel";
import { QuoteModel } from "@/models/modelCommercial/QuoteModel";

const initialOptions: SelectProps['options'] = undefined;

export default function AddQuote() {
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
            type: "",
            customerId: "",
            date_issued: "",
            amount: "",
            description: "",
            status: "",
        },
        validationSchema: Yup.object({
            type: Yup.string().required("Le type est obligatoire"),
            customerId: Yup.string().required("Le client est obligatoire"),
            date_issued: Yup.string().required("La date est obligatoire"),
            amount: Yup.number().required("Le montant est obligatoire"),
            description: Yup.string().required("La description est obligatoire"),
            status: Yup.string().required("Le status est obligatoire"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const quoteModel = new QuoteModel(values.type, +values.customerId, values.date_issued, +values.amount, values.description, values.status);
            
            const resp = await Api.create('/api/quote', quoteModel);
            if (resp.ok) {
                toast({
                    title: "quote ajouté avec succès",
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
            <HeadDetaill title={"Ajouter un devis ou une facture"} subtitle={"Gestion du departement commercial"} />

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>


                        {/** type */}
                        <div className=" flex flex-col">
                        <label className={formik.touched.type && formik.errors.type ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.type && formik.errors.type ? formik.errors.type : "Type: devis/facture"}
                            <span className="text-red-600">*</span>
                        </label>

                        <Select
                            onChange={(value) => {
                                formik.values.type = value;
                            }}
                            className=" md:w-[350px] "
                            options={[
                                {
                                    value: "DEVIS",
                                    label: "Devis",
                                },
                                {
                                    value: "FACTURE",
                                    label: "Facture",
                                }
                            ]}
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

                    {/* date */}
                      <div className=" flex flex-col">
                        <label className={formik.touched.date_issued && formik.errors.date_issued ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.date_issued && formik.errors.date_issued ? formik.errors.date_issued : "Date"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="date" name="date_issued"
                            className=" md:w-[350px] "
                            value={formik.values.date_issued}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/* amount */}
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


                    {/** status */}
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
                                    value: "ACCEPT",
                                    label: "accepter",
                                },
                                {
                                    value: "REJECT",
                                    label: "rejeter",
                                },
                            ]}
                        />
                    </div>


                    {/* description */}
                      <div className=" flex flex-col">
                        <label className={formik.touched.description && formik.errors.description ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : "Description"}

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