"use client"

import { Separator } from "@/components/ui/separator";

import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ArrowLeft } from "lucide-react";
import { Button, Input, Select } from "antd";
import type { RadioChangeEvent, SelectProps } from 'antd';
import { Radio } from 'antd';
import { useEffect, useState } from "react";
import ImageUpload from "@/components/ImageUpload";
import { useToast } from "@/components/ui/use-toast";
import { UserModel } from "@/models/UserModel";
import { Api } from "@/app/api/Api";
import { DepartementModel } from "@/models/DepartementModel";
import { PostModel } from "@/models/PosteModel";
import HeadDetaill from "@/app/(pages)/components/HeadDetail";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const initialOptions: SelectProps['options'] = undefined;

export default function Profil() {
    const router = useRouter();
    const [value, setValue] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const { toast } = useToast();
    const [user, setUser] = useState<UserModel>();
    const [poste, setPoste] = useState<SelectProps['options']>(initialOptions);
    const userId = useSelector((state: RootState) => state.auth.value.uid);


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

        const fechCat = async () => {
            try {
                const users: UserModel = await Api.read(`/api/user/${userId}`);

                setUser(users)
                setImage(String(users.imageUrl))
                const initialVal = {
                    email: users.email || '',
                    firstName: users.firstName || '',
                    lastName: users.lastName || '',
                    phone: String(users.phone) || '',
                    position: users.position || '',
                    hire_date: users.hire_date || '',
                    departement: users.departement || '',
                    salary: String(users.salary) || '',
                };
                formik.setValues(initialVal);
            }catch (error) {
                console.error("Error fetching category data:", error);
            }
        }

        fechCat();

    }, []);



    const onChange = (e: RadioChangeEvent) => {
        //console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const handleChangeDepart = (value: string) => {
        console.log(`selected ${value}`);
        formik.values.departement = value;
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
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required("Le nom est obligatoire"),
            lastName: Yup.string().required("Le prénom est obligatoire"),
            email: Yup.string().email("Email invalide").required("L'email est obligatoire"),
            phone: Yup.string().required("Le numéro de téléphone est obligatoire"),
            position: Yup.string().required("L'adresse est obligatoire"),
            hire_date: Yup.string().optional(),
            departement: Yup.string().required("Le poste est obligatoire"),
            salary: Yup.number().required("Le salaire est obligatoire"),
           // password: Yup.string().optional(),
           // password2: Yup.string().optional(),
        }),
        onSubmit: async (values) => {

            setIsLoading(true);
            if (value != "") {
                const userModel = new UserModel(values.email, values.firstName, values.lastName, Number(values.phone), values.departement, values.position, value, String(user?.password), true, true, String(values.hire_date), String(image), Number(values.salary), +userId);
                console.log(userModel);
                const resp= await Api.update(`/api/user/${userId}`, userModel);
                if (resp.ok ) {
                    
                    toast({
                      title: "Informations mise a jour avec succès."
                    });
                    
                    router.refresh();
                    setIsLoading(false);

                  } else {
                    toast({
                      title: "Une erreur s'est produite",
                      description: "Réessayer!!",
                      variant: "destructive"
                    });
                    console.error(resp.msg);
                    
                    setIsLoading(false);
                    formik.setValues({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        position: "",
                        hire_date: "",
                        departement: "",
                        salary: "",
                        
                    });;
                  }
                

                setIsLoading(false)
                
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
            {/** head 
            <HeadDetaill title={"Editer un employé"} subtitle={"Gestion des Employés"} />

            */}

            {/** saparator 
            <Separator className="w-full" />*/}

            {/** form section */}
            <div className=" md:flex md:items-center md:justify-center ">
                <form className="flex flex-col gap-5 md:w-[600px] " onSubmit={formik.handleSubmit}>

                    <h1 className="text-center text-sky-400">Les champs précédés de * sont obligatoirs</h1>

                    {/** image */}
                    <div className="flex flex-col">
                        <label className="text-gray-600">Profil de l'employer</label>

                        <ImageUpload

                            value={image != "undefined" ? image : "/next.svg"}
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
                        <div className="w-full flex flex-col">
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
                        <div className="w-full flex flex-col">
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
                        <div className="w-full flex flex-col">
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
                        <div className="w-full flex flex-col">
                            <label className={formik.touched.departement && formik.errors.departement ? "text-red-600" : "text-gray-600"}>
                                {formik.touched.departement && formik.errors.departement ? formik.errors.departement : "Poste"}
                                <span className="text-red-600">*</span>
                            </label>

                            <Select
                            defaultValue={String(user?.departement)}
                            onChange={handleChangeDepart}
                            className="md:w-[250px]"
                            options={poste as { label: string; value: string; }[]}
                        />

                
                        </div>

                        {/** salary*/}
                        <div className="w-full flex flex-col">
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

                        {/**password1 
                        <div className="w-full flex flex-col ">
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
                        </div>*/}

                        {/** password2 
                        <div className="w-full flex flex-col">
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


                        <Radio.Group defaultValue={String(user?.role)} onChange={onChange} value={value}>
                            <Radio value={"EMPLOYEE"}>EMPLOYEE</Radio>
                            <Radio value={"MANAGER"}>MANAGER</Radio>
                            <Radio value={"HR"}>HR</Radio>
                            <Radio value={"ADMIN"}>Modifier</Radio>
                        </Radio.Group>*/}

                    </div>

                    {/** button */}
                    <div className="flex space-x-5">
                        <Button loading={isLoading} htmlType="submit">Ajouter</Button>

                        <Button danger htmlType="button"
                            onClick={() => {
                                formik.setValues ({
                                    firstName: "",
                                    lastName: "",
                                    email: "",
                                    phone: "",
                                    position: "",
                                    hire_date: "",
                                    departement: "",
                                    salary: "",
                                })
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