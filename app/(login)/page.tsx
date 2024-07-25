"use client"
import Image from "next/image";
import { Button, Input } from 'antd';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { LoginModel } from "@/models/LoginModel";
import { Api } from "../api/Api";
import { useDispatch, useSelector } from "react-redux";
import { configIn } from "@/redux/features/config-slice";
import ImageUpload from "@/components/ImageUpload";
import { SettingsModel } from "@/models/SettingsModel";
import { UserModel } from "@/models/UserModel";
import { RootState } from "@/redux/store";
import { setLogo } from "@/redux/features/logo-slice";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [image, setImage] = useState("");
  const isConfig = useSelector((state: RootState) => state.config.isConfig)
  const ui = useSelector((state: RootState) => state.auth.value.isAuth);
  
  useEffect(() => {
    console.log(isConfig);
    if (isConfig) {
      router.replace("/login");
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      phone: "",
      password: "",
      email: "",
      entreprise_name: "",
      logo: "",
      address: "",
      lastName: "",
      firstName: "",
      password1: "",


    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Le numéro de téléphone est obligatoire"),
      password: Yup.string().required("Le mot de passe est obligatoire"),
      email: Yup.string().required("L'email est obligatoire"),
      entreprise_name: Yup.string().required("Le nom de l'entreprise est obligatoire"),
      logo: Yup.string().required("Le logo de l'entreprise est obligatoire"),
      address: Yup.string().required("L'adresse est obligatoire"),
      lastName: Yup.string().required("Le nom est obligatoire"),
      firstName: Yup.string().required("Le prénom est obligatoire"),
      password1: Yup.string().required("Le mot de passe est obligatoire"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      if (values.password == values.password1) {
        
        const settingsModel = new SettingsModel(values.entreprise_name, values.logo, values.address, Number(values.phone), values.email);
        const userModel = new UserModel(values.email, values.firstName, values.lastName, Number(values.phone), "admin", "admin", "ADMIN", values.password, true, true, "12/02/2020", values.logo, 0);
      

        const resp = await Api.create("/api/settings", settingsModel);
        
        const resp2 = await Api.create("/api/user", userModel);
        
        if (resp.ok && resp2.ok) {
          dispatch(configIn());
           dispatch(setLogo(values.logo));
          toast({
            title: "Informations enrégistrés avec succès."
          });
          formik.handleReset;
          router.push("/login");

          setLoading(false);
        } else {
          toast({
            title: "Une erreur s'est produite",
            variant: "destructive"
          });
          console.error(resp.msg);
          console.error(resp2.msg);
          setLoading(false);
          formik.handleReset;
        }


      }
      else {
        toast({
          title: "Les mots de passe ne sont pas conformes",
          variant: "destructive"
        });
        setLoading(false);
      }
      setLoading(false);
    }
  })

  if(isConfig) {
    return (
      <main></main>
    )
  }else {
    return (
    <main className="flex flex-col gap-10 h-screen items-center justify-center md:px-[16rem] px-4 ">
      <h1 className="text-center text-4xl font-bold text-blue-600">
        Configurations de base
      </h1>

      <form onSubmit={formik.handleSubmit} className=" p-10 grid grid-cols-1 md:grid-cols-2 gap-4  w-full border border-blue-600 h-auto rounded-3xl ">
        {/** form1 */}
        <div className="flex flex-col space-y-5 w-full">
          <h1 className="text-2xl font-bold text-blue-400">Information de l'entreprise</h1>
          {/** name  */}
          <div>
            <label className={formik.touched.entreprise_name && formik.errors.entreprise_name ? "text-red-600" : ""}>
              {formik.touched.entreprise_name && formik.errors.entreprise_name ? formik.errors.entreprise_name : " Nom de l'enteprise "}
              <span className="text-red-600">*</span>
            </label>
            <Input type="text" name="entreprise_name" value={formik.values.entreprise_name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="" />
          </div>


          {/** logo */}
          <div>
            <label className={formik.touched.logo && formik.errors.logo ? "text-red-600" : ""}>
              {formik.touched.logo && formik.errors.logo ? formik.errors.logo : "Logo de l'entreprise"}
              <span className="text-red-600">*</span>
            </label>

            <ImageUpload
              style1="border border-gray-200 rounded-xl"
              style2="h-[25px] "
              value={image}
              disable={loading}
              onChange={(url: string) => {
                if (url != "") {
                  setImage(url);
                  formik.setFieldValue("logo", url);
                }

              }}
              onRemove={() => {
                setImage("");
              }}

            />
            {/*<Input type="text" name="logo" value={formik.values.logo} onChange={formik.handleChange} onBlur={formik.handleBlur} className="" />*/}
          </div>

          {/** Address */}
          <div>
            <label className={formik.touched.address && formik.errors.address ? "text-red-600" : ""}>
              {formik.touched.address && formik.errors.address ? formik.errors.address : "Adresse de l'entreprise"}
              <span className="text-red-600">*</span>
            </label>
            <Input type="text" name="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} className="" />
          </div>

          {/** number */}
          <div>
            <label className={formik.touched.phone && formik.errors.phone ? "text-red-600" : ""}>
              {formik.touched.phone && formik.errors.phone ? formik.errors.phone : "Numéro de téléphone"}
              <span className="text-red-600">*</span>
            </label>
            <Input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="" />
          </div>
        </div>



        {/** form2 */}
        <div className="flex flex-col space-y-5 w-full">
          <h1 className="text-2xl font-bold text-blue-400">Information de l'adminisatrteur</h1>
          {/** name  */}
          <div>
            <label className={formik.touched.firstName && formik.errors.firstName ? "text-red-600" : ""}>
              {formik.touched.firstName && formik.errors.firstName ? formik.errors.firstName : "Nom de l'adminisatrteur"}
              <span className="text-red-600">*</span>
            </label>
            <Input type="text" name="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="" />
          </div>


          {/** last name */}
          <div>
            <label className={formik.touched.lastName && formik.errors.lastName ? "text-red-600" : ""}>
              {formik.touched.lastName && formik.errors.lastName ? formik.errors.lastName : "Prénom de l'adminisatrteur"}
              <span className="text-red-600">*</span>
            </label>
            <Input type="text" name="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="" />
          </div>

          {/** email */}
          <div>
            <label className={formik.touched.email && formik.errors.email ? "text-red-600" : ""}>
              {formik.touched.email && formik.errors.email ? formik.errors.email : "Email de l'adminisatrteur"}
              <span className="text-red-600">*</span>
            </label>
            <Input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="" />
          </div>

          {/** password */}
          <div className="flex md:flex-row flex-col gap-4 md:justify-between md:content-between md:items-center">
            {/** passs1 */}
            <div>
              <label className={formik.touched.password && formik.errors.password ? "text-red-600" : ""}>
                {formik.touched.password && formik.errors.password ? formik.errors.password : "Mot de Passe"}
                <span className="text-red-600">*</span>
              </label>
              <Input
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                pattern="(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}"
                title="Le mot de passe doit contenir au moins 8 caractères, dont au moins un chiffre et un caractère spécial."
                required
                className="" />
            </div>

            {/** passs2 */}
            <div>
              <label className={formik.touched.password1 && formik.errors.password1 ? "text-red-600" : ""}>
                {formik.touched.password1 && formik.errors.password1 ? formik.errors.password1 : "Confirmer le Mot de Passe"}
                <span className="text-red-600">*</span>
              </label>
              <Input type="password" name="password1" value={formik.values.password1} onChange={formik.handleChange} className="" />
            </div>
          </div>

          <Button htmlType="submit" loading={loading} className="flex self-end bg-blue-600 text-white font-bold">
            Enregistrer
          </Button>

        </div>

      </form>
    </main>
  );
  }
  
}
