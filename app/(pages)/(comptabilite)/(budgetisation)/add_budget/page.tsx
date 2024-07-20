"use client"

import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Separator } from "@/components/ui/separator";
import { Button, Input, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { DepartementModel } from "@/models/DepartementModel";
import { Api } from "@/app/api/Api";
import { useToast } from "@/components/ui/use-toast";
import { BudgetModel } from "@/models/modelComptatibilite/BudgetModel";

const initialOptions: SelectProps['options'] = undefined;

export default function AddDepartement() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [depart, setDepart] = useState<SelectProps['options']>(initialOptions);

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

    const resetForm =  () => {
        formik.values.departementId = "";
        formik.values.description = "";
        formik.values.budget_allocated = "";
        formik.values.budget_spent = "";
        formik.values.budget_remaining = "";
        formik.values.period = "";
    }

    const formik = useFormik({
        initialValues: {
            departementId: "",
            description: "",
            budget_allocated: "",
            budget_spent: "",
            budget_remaining: "",
            period: ""
        },
        validationSchema: Yup.object({
            departementId: Yup.string().required("Le département est obligatoire"),
            description: Yup.string().required("La description est obligatoire"),
            budget_allocated: Yup.number().required("Le budget Alloué est obligatoire"),
            budget_spent: Yup.number().required("Le budget Dépensé est obligatoire"),
            budget_remaining: Yup.number().required("Le budget Restant est obligatoire"),
            period: Yup.string().required("La période est obligatoire"),

        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const budgetModel = new BudgetModel(+values.departementId, +values.budget_allocated, +values.budget_spent, +values.budget_remaining, values.period, values.description);
            const resp = await Api.create('/api/budget', budgetModel);
            if (resp.ok) {
                toast({
                    title: "Budget ajouté avec succès",
                });
                resetForm();
                setIsLoading(false);
            } else {
                console.log(resp);
                toast({
                    title: "Une erreur c'est produit lors de l'ajout",
                    variant: "destructive"
                });
            }
        }
    })
    return (
        <main className='flex flex-col space-y-10 mb-10'>
            {/** head */}
            <HeadDetaill title={"Ajouter un Budget"} subtitle={"Gestion de la comptatiblité"} />

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>

                    {/** input departement */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.departementId && formik.errors.departementId ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.departementId && formik.errors.departementId ? formik.errors.departementId : "selectioner le département"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Select
                            onChange={(value) => {
                                formik.values.departementId = value;
                            }}
                            className=" md:w-[350px] "
                            options={depart as { label: string; value: string; }[]}
                        />
                    </div>


                    {/** input period */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.period && formik.errors.period ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.period && formik.errors.period ? formik.errors.period : "Période de budgétisation"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="period"
                            placeholder="ex : Année 2024, Q1 2024"
                            className=" md:w-[350px] "
                            value={formik.values.period}
                            onChange={formik.handleChange}
                        />
                    </div>


                    {/** input budget allocate */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.budget_allocated && formik.errors.budget_allocated ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.budget_allocated && formik.errors.budget_allocated ? formik.errors.budget_allocated : "Buget Alloué"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="number" name="budget_allocated"
                            className=" md:w-[350px] "
                            value={formik.values.budget_allocated}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** input budget spent */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.budget_spent && formik.errors.budget_spent ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.budget_spent && formik.errors.budget_spent ? formik.errors.budget_spent : "Somme Dépensé"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="number" name="budget_spent"
                            className=" md:w-[350px] "
                            value={formik.values.budget_spent}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** input budget spent */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.budget_remaining && formik.errors.budget_remaining ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.budget_remaining && formik.errors.budget_remaining ? formik.errors.budget_remaining : "Somme Restant"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="number" name="budget_remaining"
                            className=" md:w-[350px] "
                            value={formik.values.budget_remaining}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** input description */}
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
                        <Button loading={isLoading} 
                        htmlType="submit" 
                        className="bg-blue-600 text-white font-bold">
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