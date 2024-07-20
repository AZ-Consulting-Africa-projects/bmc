"use client"
import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Separator } from "@/components/ui/separator";
import { Button, Input, Select, SelectProps } from "antd";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Api } from "@/app/api/Api";
import { useToast } from "@/components/ui/use-toast";
import { RecrutementModel } from "@/models/RecrutementModel";
import { PostModel } from "@/models/PosteModel";

const initialOptions: SelectProps['options'] = undefined;

export default function Formation() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const [poste, setPoste] = useState<SelectProps['options']>(initialOptions);


    useEffect(() => {


        Api.read('/api/poste').then((value: any[]) => {
            const newdep: SelectProps['options'] = [];
            value.forEach((element: PostModel) => {
                newdep.push({
                    value: String(element.posteName),
                    label: String(element.posteName),
                })
            })
            setPoste(newdep);
        })

    }, []);

    const formik = useFormik({
        initialValues: {
            title: "",
            poste: "",
            description: "",
            responsability: "",
            requirement: "",
            location: "",
            salary: "",
            posteDdate: "",
            clossingDate: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("Le titre est obligatoire"),
            poste: Yup.string().required("Le poste est obligatoire"),
            description: Yup.string().required('La description est obligatoire'),
            responsability: Yup.string().required("Les responssabilités du poste est obligatoire"),
            requirement: Yup.string().required("Les requis du poste est obligatoire"),
            location: Yup.string().required("Le lieu du travail est obligatoire"),
            salary: Yup.string().required("Le salaire du poste est obligatoire"),
            posteDdate: Yup.string().required("La date du poste est obligatoire"),
            clossingDate: Yup.string().required("La date de cloture est obligatoire"),

        }),

        onSubmit: async (values) => {
            setIsLoading(true);
            const recrutementModel = new RecrutementModel(values.title, values.poste, values.description, values.responsability, values.requirement, values.location, Number(values.salary), values.posteDdate, values.clossingDate, "OPEN")
            const resp = await Api.create('/api/recrutement', recrutementModel);
            if (resp.ok) {
                toast({
                    title: " ajout effectué avec succès",
                });
                formik.values.description = "";
                formik.values.title = "",
                    formik.values.poste = "",
                    formik.values.responsability = "",
                    formik.values.requirement = "",
                    formik.values.location = "",
                    formik.values.salary = "",
                    formik.values.posteDdate = "",
                    formik.values.clossingDate = "",

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
            <HeadDetaill title={"Ajouter une poste de recrutement"} subtitle={"Organisation mangement"} />

            {/** saparator */}
            <Separator className="w-full" />


            {/** form section */}
            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>

                    <div className="flex flex-col space-y-8">
                        {/** input title and poste */}
                        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3">
                            <div className=" flex flex-col">
                                <label className={formik.touched.title && formik.errors.title ? "text-red-600 " : "text-gray-600 "}>
                                    {formik.touched.title && formik.errors.title ? formik.errors.title : "titre du recrutement"}

                                    <span className="text-red-600"></span>
                                </label>

                                <Input type="text" name="title"
                                    className=" md:w-[350px]"
                                    value={formik.values.title}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/** poste */}
                            <div className="flex flex-col ">
                                <label className={formik.touched.poste && formik.errors.poste ? "text-red-600 " : "text-gray-600 "}>
                                    {formik.touched.poste && formik.errors.poste ? formik.errors.poste : "poste du recrutement"}
                                    <span className="text-red-600"></span>
                                </label>

                                <Select
                                    onChange={(value) => {
                                        formik.values.poste = value
                                    }}
                                    className="md:w-[350px]"
                                    options={poste as { label: string; value: string; }[]}
                                />
                            </div>
                        </div>
                        
                        {/** location and salary */}
                        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3">
                            <div className=" flex flex-col">
                                <label className={formik.touched.location && formik.errors.location ? "text-red-600 " : "text-gray-600 "}>
                                    {formik.touched.location && formik.errors.location ? formik.errors.location : "Lieu du travail"}

                                    <span className="text-red-600"></span>
                                </label>

                                <Input type="text" name="location"
                                    className=" md:w-[350px]"
                                    value={formik.values.location}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/** poste */}
                            <div className=" flex flex-col">
                                <label className={formik.touched.salary && formik.errors.salary ? "text-red-600 " : "text-gray-600 "}>
                                    {formik.touched.salary && formik.errors.salary ? formik.errors.salary : "salire du poste"}

                                    <span className="text-red-600"></span>
                                </label>

                                <Input type="number" name="salary"
                                    className=" md:w-[350px]"
                                    value={formik.values.salary}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>
                        {/** date du poste date de cloture */}
                        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3">
                            <div className=" flex flex-col">
                                <label className={formik.touched.posteDdate && formik.errors.posteDdate ? "text-red-600 " : "text-gray-600 "}>
                                    {formik.touched.posteDdate && formik.errors.posteDdate ? formik.errors.posteDdate : "Date du poste"}

                                    <span className="text-red-600"></span>
                                </label>

                                <Input type="date" name="posteDdate"
                                    className=" md:w-[350px]"
                                    value={formik.values.posteDdate}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/** poste */}
                            <div className=" flex flex-col">
                                <label className={formik.touched.clossingDate && formik.errors.clossingDate ? "text-red-600 " : "text-gray-600 "}>
                                    {formik.touched.clossingDate && formik.errors.clossingDate ? formik.errors.clossingDate : "Date de cloture"}

                                    <span className="text-red-600"></span>
                                </label>

                                <Input type="date" name="clossingDate"
                                    className=" md:w-[350px]"
                                    value={formik.values.clossingDate}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>

                        {/** date du poste date de cloture */}
                        <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row md:space-x-3">
                            <div className=" flex flex-col">
                                <label className={formik.touched.responsability && formik.errors.responsability ? "text-red-600 " : "text-gray-600 "}>
                                    {formik.touched.responsability && formik.errors.responsability ? formik.errors.responsability : "Les responssabilités du poste"}

                                    <span className="text-red-600"></span>
                                </label>

                                <Input type="text" name="responsability"
                                    className=" md:w-[350px]"
                                    value={formik.values.responsability}
                                    onChange={formik.handleChange}
                                />
                            </div>

                            {/** poste */}
                            <div className=" flex flex-col">
                                <label className={formik.touched.requirement && formik.errors.requirement ? "text-red-600 " : "text-gray-600 "}>
                                    {formik.touched.requirement && formik.errors.requirement ? formik.errors.requirement : "Les requis du poste"}

                                    <span className="text-red-600"></span>
                                </label>

                                <Input type="text" name="requirement"
                                    className=" md:w-[350px]"
                                    value={formik.values.requirement}
                                    onChange={formik.handleChange}
                                />
                            </div>
                        </div>

                        <div className=" flex flex-col">
                            <label className={formik.touched.description && formik.errors.description ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.description && formik.errors.description ? formik.errors.description : "Description du département"}

                                <span className="text-red-600"></span>
                            </label>

                            <Input type="text" name="description"
                                className="  h-[150px]"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                            />
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
                    </div>
                </form>
            </div>

        </main>
    );
}