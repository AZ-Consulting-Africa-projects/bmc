"use client"

import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Separator } from "@/components/ui/separator";
import { Button, Input, Select, SelectProps } from "antd";
import { useState, useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { DepartementModel } from "@/models/DepartementModel";
import { Api } from "@/app/api/Api";
import { useToast } from "@/components/ui/use-toast";
import { UserModel } from "@/models/UserModel";
import { InvoiceModel } from "@/models/modelComptatibilite/InvoiceModel";

const initialOptions: SelectProps['options'] = undefined;

export default function AddInvoice() {
    const [isLoading, setIsLoading] = useState(false);
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

    const resetForm = () => {
        formik.values.userId = "";
        formik.values.date = "";
        formik.values.amount = "";
        formik.values.due_date = "";
        formik.values.status = "";
        formik.values.description = "";
    }

    const formik = useFormik({
        initialValues: {
            userId: "",
            date: "",
            amount: "",
            due_date: "",
            status: "",
            description: "",
        },
        validationSchema: Yup.object({
            userId: Yup.string().required("L'employé est obligatoire"),
            date: Yup.string().required("La date est obligatoire"),
            amount: Yup.string().required("Le montant est obligatoire"),
            due_date: Yup.string().required("La date d'expiration est obligatoire"),
            status: Yup.string().required("Le status est obligatoire"),
            description: Yup.string().required("La description est obligatoire"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const invoiceModel = new InvoiceModel(values.date, +values.amount, +values.userId, values.due_date, values.status, values.description);
            const resp = await Api.create('/api/invoice', invoiceModel);
            if (resp.ok) {
                toast({
                    title: "facture ajouté avec succès",
                });
                resetForm();
                setIsLoading(false);
            } else {
                console.log(resp.msg);
                toast({
                    title: "Une erreur s'est produit lors de l'ajout",
                    variant: "destructive"
                });

                setIsLoading(false);
            }
        }
    })
    return (
        <main className='flex flex-col space-y-10 mb-10'>
            {/** head */}
            <HeadDetaill title={"Ajouter une Facture"} subtitle={"Gestion de la comptatiblité"} />

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>

                    {/** user and leave type */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.userId && formik.errors.userId ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.userId && formik.errors.userId ? formik.errors.userId : "Employé"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Select

                            onChange={(value) => {
                                formik.values.userId = value;
                            }}
                            className=" md:w-[350px] "
                            options={user as { label: string; value: string; }[]}
                        />
                    </div>

                    {/** date */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.date && formik.errors.date ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.date && formik.errors.date ? formik.errors.date : "Date de début"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="date" name="date"
                            className=" md:w-[350px] "
                            value={formik.values.date}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** amount */}
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

                    {/** due_date */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.due_date && formik.errors.due_date ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.due_date && formik.errors.due_date ? formik.errors.due_date : "Date de fin"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="date" name="due_date"
                            className=" md:w-[350px] "
                            value={formik.values.due_date}
                            onChange={formik.handleChange}
                        />
                    </div>


                    {/* status*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.status && formik.errors.status ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.status && formik.errors.status ? formik.errors.status : "Status"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Select

                            onChange={(value) => {
                                formik.values.status = value

                            }}
                            className=" md:w-[350px] "
                            options={[
                                {
                                    value: 'PAID',
                                    label: 'Payer',
                                },
                                {
                                    value: 'UNPAID',
                                    label: 'Non Payer',
                                },
                            ]}
                        />
                    </div>

                    {/** description */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.description && formik.errors.description ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.description && formik.errors.description ? formik.errors.description : "Description"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="description"
                            className=" md:w-[350px] h-[10rem] "
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        />
                    </div>



                    {/** button */}
                    <div className="flex space-x-5">
                        <Button loading={isLoading} htmlType="submit" className="bg-blue-600 font-bold text-white">
                            Ajouter
                        </Button>

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