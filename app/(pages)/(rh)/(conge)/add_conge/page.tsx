"use client"

import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Separator } from "@/components/ui/separator";
import { Button, Input, SelectProps } from "antd";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Api } from "@/app/api/Api";
import { useToast } from "@/components/ui/use-toast";
import { Select, Space } from 'antd';
import { UserModel } from "@/models/UserModel";
import { LeaveModel } from "@/models/LeaveModel";

const initialOptions: SelectProps['options'] = undefined;

export default function AddConge() {
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
    {/**
             * TODO : add conger
             * Champs pour sélectionner le type de congé, 
             * les dates de début et de fin, 
             * et ajouter une note ou une raison.
             * Affichage des jours de congé restants pour l'employé
             */}

    const formik = useFormik({
        initialValues: {
            userId: "",
            leave_type: "",
            start_date: "",
            end_date: "",
            reason: "",
            status: "",
            request_date: "",
            approval_date: "",
        },
        validationSchema: Yup.object({
            userId: Yup.string().required("L'employé est obligatoire"),
            leave_type: Yup.string().required("Le type de congé est obligatoire"),
            start_date: Yup.string().required("La date de début est obligatoire"),
            end_date: Yup.string().required("La date de fin est obligatoire"),
            reason: Yup.string().required("La raison est obligatoire"),
            status: Yup.string().required("Le status est obligatoire"),
            request_date: Yup.string().required("La date de la demande est obligatoire"),
            approval_date: Yup.string().required("La date d'approbation est obligatoire"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const leaveModel = new LeaveModel(+values.userId, values.leave_type, values.start_date, values.end_date, values.reason, values.status, values.request_date, values.approval_date);
            const resp = await Api.create('/api/leaverequest', leaveModel);
            if (resp.ok) {
                toast({
                    title: "congé ajouté avec succès",
                });
                
                setIsLoading(false);
            }else {
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
            <HeadDetaill title={"Ajouter un congé"} subtitle={"Organisation mangement"} />

            {/** saparator */}
            <Separator className="w-full" />

            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>
                    {/** user and leave type */}
                    <div className="flex space-x-4">
                        <div className=" flex flex-col">
                            <label className={formik.touched.userId && formik.errors.userId ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.userId && formik.errors.userId ? formik.errors.userId : "Employé"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Select

                                onChange={(value) => {
                                    formik.values.userId = value

                                }}
                                className=" md:w-[350px] "
                                options={user as { label: string; value: string; }[]}
                            />


                        </div>

                        <div className=" flex flex-col">
                            <label className={formik.touched.leave_type && formik.errors.leave_type ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.leave_type && formik.errors.leave_type ? formik.errors.leave_type : "Type de congé"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Select

                                onChange={(value) => {
                                    formik.values.leave_type = value

                                }}
                                className=" md:w-[350px] "
                                options={[
                                    {
                                        label: "Congé annuel",
                                        value: "Congé annuel",
                                    },
                                    {
                                        label: "Congé maladie",
                                        value: "Congé maladie",
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    {/** start date aend date */}
                    <div className="flex space-x-4">
                        <div className=" flex flex-col">
                            <label className={formik.touched.start_date && formik.errors.start_date ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.start_date && formik.errors.start_date ? formik.errors.start_date : "Date de début"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="date" name="start_date"
                                className=" md:w-[350px] "
                                value={formik.values.start_date}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className=" flex flex-col">
                            <label className={formik.touched.end_date && formik.errors.end_date ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.end_date && formik.errors.end_date ? formik.errors.end_date : "Date de fin"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="date" name="end_date"
                                className=" md:w-[350px] "
                                value={formik.values.end_date}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>

                    {/** request date reason */}
                    <div className="flex space-x-4">
                        <div className=" flex flex-col">
                            <label className={formik.touched.request_date && formik.errors.request_date ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.request_date && formik.errors.request_date ? formik.errors.request_date : "Date de la demande"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="date" name="request_date"
                                className=" md:w-[350px] "
                                value={formik.values.request_date}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className=" flex flex-col">
                            <label className={formik.touched.reason && formik.errors.reason ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.reason && formik.errors.reason ? formik.errors.reason : "Raison du congé"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="text" name="reason"
                                className=" md:w-[350px] "
                                value={formik.values.reason}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>


                    {/**aproval and status*/}
                    <div className="flex space-x-4">
                        <div className=" flex flex-col">
                            <label className={formik.touched.approval_date && formik.errors.approval_date ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.approval_date && formik.errors.approval_date ? formik.errors.approval_date : "Date d'approbation"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="date" name="approval_date"
                                className=" md:w-[350px] "
                                value={formik.values.approval_date}
                                onChange={formik.handleChange}
                            />
                        </div>

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
                                        value: 'PENDING',
                                    label: 'En cours',
                                },
                                {
                                    value: 'APPROVED',
                                    label: 'Approuver',
                                },
                                {
                                    value: 'REJECTED',
                                    label: 'Rejeter',
                                    }
                                ]}
                            />
                        </div>
                    </div>

                    {/** button */}
                    <div className="flex space-x-5">
                        <Button loading={isLoading} htmlType="submit">Ajouter</Button>

                        <Button danger htmlType="button"
                            onClick={() => {
                                null;
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