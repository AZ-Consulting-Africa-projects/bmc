"use client"
import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Separator } from "@/components/ui/separator";
import { Button, Input, Select } from "antd";
import { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Api } from "@/app/api/Api";
import { useToast } from "@/components/ui/use-toast";
import { VisitorModel } from "@/models/VisitorModel";

export default function AddVisitor() {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const formik = useFormik({
        initialValues: {
            name: "",
            company: "",
            purpose_of_visit: "",
            arrival_date: "",
            arrival_time: "",
            departure_date: "",
            person_to_meet: "",
            status: "",
            visitor_id_card: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Le nom est obligatoire"),
            company: Yup.string().required("Le nom de l'entreprise est obligatoire"),
            purpose_of_visit: Yup.string().required("La raison de la visite est obligatoire"),
            arrival_date: Yup.string().required("La date d'arrivée est obligatoire"),
            arrival_time: Yup.string().required("L'heure d'arrivée est obligatoire"),
            departure_date: Yup.string().required("L'heure de départ est obligatoire"),
            person_to_meet: Yup.string().required("La personne à rencontrer est obligatoire"),
            status: Yup.string().required("Le status est obligatoire"),
            visitor_id_card: Yup.string().required("Le numéro de la carte d'identité est obligatoire"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const visitorModel = new VisitorModel(values.name, values.company, values.purpose_of_visit, values.arrival_date, values.arrival_time, values.departure_date, values.person_to_meet, values.status, values.visitor_id_card);
            const resp = await Api.create('/api/visitor', visitorModel);
            if(resp.ok) {
                toast({
                    title: "visiteur ajouté avec succès",
                });
                
                setIsLoading(false);
            } else {
                console.log(resp);
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
            <HeadDetaill title={"Ajouter un visiteur"} subtitle={"visitor mangement"} />

            {/** saparator */}
            <Separator className="w-full" />

            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>

                    {/** input name */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.name && formik.errors.name ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.name && formik.errors.name ? formik.errors.name : "Nom complet"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="name"
                            className=" md:w-[350px] "
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** input company */}
                    <div className=" flex flex-col">
                        <label className={formik.touched.company && formik.errors.company ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.company && formik.errors.company ? formik.errors.company : "Nom complet"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="company"
                            className="md:w-[350px]  "
                            value={formik.values.company}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** input purpose_of_visit arrival_date */}
                    <div className="grid grid-cols-1  gap-5">
                        <div className=" flex flex-col">
                            <label className={formik.touched.purpose_of_visit && formik.errors.purpose_of_visit ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.purpose_of_visit && formik.errors.purpose_of_visit ? formik.errors.purpose_of_visit : "Raison de la visite"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="text" name="purpose_of_visit"
                                className="  md:w-[350px]"
                                value={formik.values.purpose_of_visit}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className=" flex flex-col">
                            <label className={formik.touched.arrival_date && formik.errors.arrival_date ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.arrival_date && formik.errors.arrival_date ? formik.errors.arrival_date : "Date"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="date" name="arrival_date"
                                className=" md:w-[350px] "
                                value={formik.values.arrival_date}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>

                    {/** input arrival_time departure_date */}
                    <div className="grid grid-cols-1  gap-5">
                        <div className=" flex flex-col">
                            <label className={formik.touched.arrival_time && formik.errors.arrival_time ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.arrival_time && formik.errors.arrival_time ? formik.errors.arrival_time : "Heure d\' arrivé"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="time" name="arrival_time"
                                className=" md:w-[350px] "
                                value={formik.values.arrival_time}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className=" flex flex-col">
                            <label className={formik.touched.departure_date && formik.errors.departure_date ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.departure_date && formik.errors.departure_date ? formik.errors.departure_date : "Heure de départ"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="time" name="departure_date"
                                className=" md:w-[350px] "
                                value={formik.values.departure_date}
                                onChange={formik.handleChange}
                            />
                        </div>
                    </div>

                    {/** input person_to_meet visitor_id_card */}
                    <div className="grid grid-cols-1  gap-5">
                        <div className=" flex flex-col">
                            <label className={formik.touched.person_to_meet && formik.errors.person_to_meet ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.person_to_meet && formik.errors.person_to_meet ? formik.errors.person_to_meet : "Nom de la personne à rencontrer"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="text" name="person_to_meet"
                                className=" md:w-[350px] "
                                value={formik.values.person_to_meet}
                                onChange={formik.handleChange}
                            />
                        </div>

                        <div className=" flex flex-col">
                            <label className={formik.touched.visitor_id_card && formik.errors.visitor_id_card ? "text-red-600 " : "text-gray-600 "}>
                                {formik.touched.visitor_id_card && formik.errors.visitor_id_card ? formik.errors.visitor_id_card : "numéro de la carte d'identité"}

                                <span className="text-red-600">*</span>
                            </label>

                            <Input type="text" name="visitor_id_card"
                                className=" md:w-[350px] "
                                value={formik.values.visitor_id_card}
                                onChange={formik.handleChange}
                            />
                        </div>
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
                                    label: "En attente",
                                    value: "WAITING",
                                },
                                  {
                                    label: "En cours",
                                    value: "GOING",
                                },
                                {
                                    label: "Fini",
                                    value: "DONE",
                                },
                            ]}
                        />

                        
                        </div>

                    {/** button */}
                    <div className="flex space-x-5 self-center">
                        <Button className="bg-blue-600" loading={isLoading} htmlType="submit">Ajouter</Button>

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