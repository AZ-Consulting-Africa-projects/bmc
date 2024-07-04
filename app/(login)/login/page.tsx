"use client"
import Image from "next/image";
import { Button, Input } from 'antd';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { LoginModel } from "@/models/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { logIn } from "@/redux/features/auth-slice";
import { Api } from "@/app/api/Api";

export default function Home() {
  const [loading, setLoadint] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const logo = useSelector((state: RootState) => state.logoReducer.value.url)


  const formik = useFormik({
    initialValues: {
      phone: "",
      password: ""
    },
    validationSchema: Yup.object({
      phone: Yup.string().required("Le numéro de téléphone est obligatoire"),
      password: Yup.string().required("Le mot de passe est obligatoire")
    }),
    onSubmit: async (values) => {
      
      setLoadint(true);
      const loginModel = new LoginModel(Number(values.phone), values.password);
      
      const resp = await Api.create("/api/login", loginModel);
      
        if(resp.ok) {
         dispatch(logIn({uid:resp.id, role: resp.role, name: resp.name}));
 
         toast({
           title: "Vous ete maintenant connecter"
         })
 
         router.push("/dashboard");
         setLoadint(false);
         formik.initialValues = {
           phone: "",
           password: ""
         }
       }else {
         setErrorMsg("Le numéro de téléphone ou le mot de passe est incorrect");
         setLoadint(false);
         formik.initialValues = {
           phone: "",
           password: ""
         }
       }
      router.push("/dashboard");
      setLoadint(false);

    }
  })

  return (
    <main className="flex h-screen items-center justify-center mx-4 md:px-[16rem] xl:[150rem] ">
      <div className="bg-slate-200 pt-10 grid grid-cols-1 md:grid-cols-2 gap-4  w-full  p-10 rounded-xl ">
        {/*immage*/}
        <div className="w-full">
            <Image src={"/illustrations/login.png"} alt={""} quality={100} width={650} height={650} className="object-cover bg-center bg-cover" />
        </div>

        {/*form*/}
        <div className=" flex flex-col items-center justify-center space-y-5">
          
          <div className="">
            <h1 className="md:text-4xl text-2xl text-center   ">Connectez-vous</h1>
            {/*<h1 className="text-right mr-10 text-[15px]  text-blue-600 ">Mot de passe oublié</h1>*/}
          </div>

          <h1 className="font-bold text-red-600 text-center"> {errorMsg != "" && errorMsg} </h1>

          <form onSubmit={formik.handleSubmit} className="flex flex-col self-center  space-y-5">

            <div className="flex flex-col">
              <label className={formik.errors.phone && formik.touched.phone ? "text-red-600 text-sm" : "text-gray-600 text-sm"}>{formik.errors.phone && formik.touched.phone ? formik.errors.phone : "Numéro de téléphone"}</label>
              <Input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} className=" " />
            </div>

            <div className="flex flex-col ">
              <label className={formik.errors.password && formik.touched.password ? "text-red-600 text-sm" : "text-gray-600 text-sm"}> {formik.errors.password && formik.touched.password ? formik.errors.password : "Mot de passe"} </label>

              <Input.Password
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                className=" "
              />
            </div>

            <Button htmlType="submit" className="bg-blue-600 text-white w-[200px] flex self-center " loading={loading}>
              Se connecter
            </Button>
          </form>
        </div>
      </div>

    </main>
  );
}
