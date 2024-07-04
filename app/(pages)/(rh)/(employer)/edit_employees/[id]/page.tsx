"use client"
import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import { Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import type { RadioChangeEvent } from 'antd';
import { Radio } from 'antd';
import { useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import { useToast } from "@/components/ui/use-toast";
import { UserModel } from "@/models/UserModel";
import HeadDetaill from "@/app/(pages)/components/HeadDetail";

export default function EditEmployer({params}: {params: {id: string}}) {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { toast } = useToast();
    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };


    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            position: "",
            hire_date: "",
            departement: "",
            salary: "",
            password: "",
            password2: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Le nom est obligatoire"),
            lastName: Yup.string().required("Le prénom est obligatoire"),
            email: Yup.string().email("Email invalide").required("L'email est obligatoire"),
            phone: Yup.string().required("Le numéro de téléphone est obligatoire"),
            position: Yup.string().required("La position est obligatoire"),
            hire_date: Yup.string().optional(),
            departement: Yup.string().required("Le departement est obligatoire"),
            salary: Yup.number().required("Le salaire est obligatoire"),
            password: Yup.string().optional(),
            password2: Yup.string().optional(),
        }),
        onSubmit: async (values) => {

            setIsLoading(true);
            if (value != "") {
                const userModel = new UserModel(values.email, values.firstName, values.lastName, Number(values.phone), values.departement, values.position, value, values.password, true, true, String(values.hire_date), String(image), Number(values.salary));
                console.log(userModel);
                toast({
                    title: "Employé ajouté avec succès",
                })

                setIsLoading(false)
                formik.initialValues = {
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    position: "",
                    hire_date: "",
                    departement: "",
                    salary: "",
                    password: "",
                    password2: "",
                }
                setImage("");
                setValue("")
            }
            else {
                toast({
                    title: "Veiller selectionner un rôle",
                    variant: "destructive"
                })
                setIsLoading(false)
            }


            setIsLoading(false)
        }
    })

    return (
        <div className='flex flex-col space-y-10 mb-10'>
        {/** head */}
        <HeadDetaill title={"Editer  les info de"} subtitle={"Employees mangement"} />
       

        {/** saparator */}
        <Separator className="w-full" />

        {/** form section */}
        <div className=" md:flex md:items-center md:justify-center ">
            <form className="flex flex-col gap-5 md:w-[600px] " onSubmit={formik.handleSubmit}>

                <h1 className="text-center text-sky-400">Les champs précédés de * sont obligatoirs</h1>

                {/** image */}
                <div className="flex flex-col">
                    <label className="text-gray-600">Profil de l'employer</label>

                    <ImageUpload

                        value={image}
                        disable={isLoading}
                        onChange={(url: string) => {
                            if (url != "") {
                                setImage(url);
                            }

                        }}
                        onRemove={() => {
                            setImage("");
                        }}

                    />
                </div>


                {/** names */}
                <div className="flex gap-3">
                    {/**last name */}
                    <div className="w-full flex flex-col">
                        <label className={formik.touched.firstName && formik.errors.firstName ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : "Nom"}
                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="firstName"
                            className=" md:w-[250px] "
                            value={formik.values.firstName}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** first name */}
                    <div className="w-full flex flex-col">
                        <label className={formik.touched.lastName && formik.errors.lastName ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : "Prénom"}
                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="lastName"
                            className=" md:w-[250px] "
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                        />
                    </div>

                </div>

                {/** email and phone */}
                <div className="flex gap-3">

                    {/**mail */}
                    <div className="w-full">
                        <label className={formik.touched.email && formik.errors.email ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.email && formik.errors.email ? formik.errors.email : "Email"}
                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="email" name="email"
                            className="md:w-[250px]"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** phone */}
                    <div className="w-full">
                        <label className={formik.touched.phone && formik.errors.phone ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.phone && formik.errors.phone ? formik.errors.phone : "Numéro de téléphone"}
                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="tel" name="phone"
                            className="md:w-[250px]"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                        />
                    </div>

                </div>

                {/** addresse and hire */}
                <div className="flex gap-3">

                    {/**address */}
                    <div className="w-full">
                        <label className={formik.touched.position && formik.errors.position ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.position && formik.errors.position ? formik.errors.position : "Addresse"}
                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="position"
                            className="md:w-[250px]"
                            value={formik.values.position}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** hire date*/}
                    <div className="w-full">
                        <label className={formik.touched.hire_date && formik.errors.hire_date ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.hire_date && formik.errors.hire_date ? formik.errors.hire_date : "Date d'embauche"}
                            <span className="text-red-600"></span>
                        </label>

                        <Input type="date" name="hire_date"
                            className="md:w-[250px]"
                            value={formik.values.hire_date}
                            onChange={formik.handleChange}
                        />
                    </div>

                </div>

                {/** departement and salarie */}
                <div className="flex gap-3">

                    {/**departement */}
                    <div className="w-full">
                        <label className={formik.touched.departement && formik.errors.departement ? "text-red-600" : "text-gray-600"}>
                            {formik.touched.departement && formik.errors.departement ? formik.errors.departement : "Département"}
                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="text" name="departement"
                            className="md:w-[250px]"
                            value={formik.values.departement}
                            onChange={formik.handleChange}
                        />
                    </div>

                    {/** salary*/}
                    <div className="w-full">
                        <label className={formik.touched.salary && formik.errors.salary ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.salary && formik.errors.salary ? formik.errors.salary : "Salaire"}
                            <span className="text-red-600">*</span>
                        </label>

                        <Input type="number" name="salary"
                            className="md:w-[250px]"
                            value={formik.values.salary}
                            onChange={formik.handleChange}
                        />
                    </div>

                </div>

                {/** password */}
                <div className="flex gap-3">

                    {/**password1 */}
                    <div className="w-full">
                        <label className={formik.touched.password && formik.errors.password ? "text-red-600" : "text-gray-600"}>
                            {formik.touched.password && formik.errors.password ? formik.errors.password : "Mot de passe"}
                            <span className="text-red-600"></span>
                        </label>

                        <Input.Password type="password" name="password"
                            className="md:w-[250px]"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>

                    {/** password2 */}
                    <div className="w-full">
                        <label className={formik.touched.password2 && formik.errors.password2 ? "text-red-600" : "text-gray-600 "}>
                            {formik.touched.password2 && formik.errors.password2 ? formik.errors.password2 : "Confirmer le mot de passe"}
                            <span className="text-red-600"></span>
                        </label>

                        <Input.Password type="password" name="password2"
                            className="md:w-[250px]"
                            value={formik.values.password2}
                            onChange={formik.handleChange}
                            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </div>

                </div>

                <div className="flex gap-5">
                    <label className={"text-gray-600 "}>
                        Rôle
                        <span className="text-red-600">*</span>
                    </label>


                    <Radio.Group defaultValue="EMPLOYEE" onChange={onChange} value={value}>
                        <Radio value={"EMPLOYEE"}>EMPLOYEE</Radio>
                        <Radio value={"MANAGER"}>MANAGER</Radio>
                        <Radio value={"HR"}>HR</Radio>
                        <Radio value={"ADMIN"}>ADMIN</Radio>
                    </Radio.Group>

                </div>

                {/** button */}
                <div className="flex space-x-5">
                    <Button loading={isLoading} htmlType="submit">Ajouter</Button>

                    <Button danger htmlType="button"
                        onClick={() => {
                            formik.initialValues = {
                                firstName: "",
                                lastName: "",
                                email: "",
                                phone: "",
                                position: "",
                                hire_date: "",
                                departement: "",
                                salary: "",
                                password: "",
                                password2: "",
                            }
                            setImage("");
                            setValue("")

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