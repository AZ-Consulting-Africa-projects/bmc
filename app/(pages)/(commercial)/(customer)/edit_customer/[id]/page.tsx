"use client"
import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { Separator } from "@/components/ui/separator";
import { Button, Input, SelectProps, Select } from "antd";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Api } from "@/app/api/Api";
import { PostModel } from "@/models/PosteModel";
import { useToast } from "@/components/ui/use-toast";
import { CustomerModel } from "@/models/modelCommercial/CustomerModel";


export default function EditCustomer({params}: {params: {id: string}}) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();


    useEffect(() => {
        
        const fechCat = async () => {
            try {
                const cust: CustomerModel = await Api.read(`/api/customer/${params.id}`);
                const initialVal = {
                    name: cust.name || "",
                    company: cust.company || "",
                    phone: String(cust.phone) || "",
                    email: cust.email || "",
                    address: cust.address || "",
                    status: cust.status || "",
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
            name: "",
            company: "",
            phone: "",
            email: "",
            address: "",
            status: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Le nom est obligatoirs"),
            company: Yup.string().required("Le nom de la companie est obligatoirs"),
            phone: Yup.string().required("Le télléphone est obligatoirs"),
            email: Yup.string().required("L'email est obligatoirs"),
            address: Yup.string().required("L'adresse est obligatoirs"),
            status: Yup.string().required("Le status est obligatoirs"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            const customerModel = new CustomerModel(values.name, values.company, +values.phone, values.email, values.address, values.status, +params.id);
            const resp = await Api.update(`/api/customer/${params.id}`, customerModel);
            if (resp.ok) {
                toast({
                    title: "client Modifié avec succès",
                });
                    setIsLoading(false);
            } else {
                console.log(resp.msg);
                toast({
                    title: "Une erreur c'est produit lors de la  modification",
                    variant: "destructive"
                });
                    setIsLoading(false);
            }

        }
    })

    return (
        <main className='flex flex-col space-y-10 mb-10'>
            {/** head */}
            <HeadDetaill title={"Editer une Client"} subtitle={"Organisation mangement"} />

            {/** saparator */}
            <Separator className="w-full" />

            {/** form section */}
            <div className="border-blue-600 w-full p-10 ">
                <form className="flex flex-col gap-5 items-center justify-center " onSubmit={formik.handleSubmit}>
                    <h1 className="text-center text-blue-400">Les champs précédés de * sont obligatoirs</h1>

                    {/*name*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.name && formik.errors.name ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.name && formik.errors.name ? formik.errors.name : "Nom du client"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="name"
                            className=" md:w-[350px] "
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/*company*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.company && formik.errors.company ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.company && formik.errors.company ? formik.errors.company : "Nom de la companie"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="company"
                            className=" md:w-[350px] "
                            value={formik.values.company}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/*phone*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.phone && formik.errors.phone ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.phone && formik.errors.phone ? formik.errors.phone : "Télléphone du client"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="phone"
                            className=" md:w-[350px] "
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/*email*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.email && formik.errors.email ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.email && formik.errors.email ? formik.errors.email : "email du client"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="email"
                            className=" md:w-[350px] "
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/*address*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.address && formik.errors.address ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.address && formik.errors.address ? formik.errors.address : "Adresse du client"}

                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="address"
                            className=" md:w-[350px] "
                            value={formik.values.address}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/*status*/}
                    <div className=" flex flex-col">
                        <label className={formik.touched.status && formik.errors.status ? "text-red-600 " : "text-gray-600 "}>
                            {formik.touched.status && formik.errors.status ? formik.errors.status : "Status du client"}

                            <span className="text-red-600">*</span>
                        </label>

                         <Select
                         defaultValue={formik.values.status}
                            onChange={(value) => {
                                formik.values.status = value
                            }}
                            className=" md:w-[350px] "
                            options={[
                                {
                                    value: "ACTIVE",
                                    label: "ACTIVE",
                                },
                                {
                                    value: "INACTIVE",
                                    label: "INACTIVE",
                                },
                                {
                                    value: "PROSPECT",
                                    label: "PROSPECT",
                                }
                            ]}
                        />

                        
                    </div>
                    {/** button */}
                    <div className="flex space-x-5">
                        <Button className="bg-blue-600 font-bold text-white" 
                        loading={isLoading} htmlType="submit">Modifier</Button>
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