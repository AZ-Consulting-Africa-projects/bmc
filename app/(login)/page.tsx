"use client"
import Image from "next/image";
import { Button, Input } from 'antd';
import * as Yup from 'yup';
import { useFormik } from "formik";
import { useState } from "react";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [loading, setLoadint] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const { toast } = useToast();

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
     
      setErrorMsg("");
      console.log(values);
      toast({
        title: "Vous ete maintenant connecter"
      })
      router.push("/dashboard");
      setLoadint(false);
    }
  })

  return (
    <main className="flex h-screen items-center justify-center mx-4 ">
      <div className="bg-slate-200 md:w-[400px] w-full px-4 py-8 rounded-xl justify-center flex flex-col space-y-8">
      <h1 className="text-4xl  text-center font-black  ">LOGO</h1>
        <div className="">
          <h1 className="md:text-4xl text-2xl text-center font-bold  ">Page de connection</h1>
          <h1 className="text-right mr-10 text-[15px]  text-blue-600 ">Mot de passe oublié</h1>
        </div>

        <h1 className="font-bold text-red-600 text-center"> {errorMsg != "" && errorMsg} </h1>

        <form onSubmit={formik.handleSubmit} className="flex flex-col space-y-5">

          <div>
            <label className={formik.errors.phone && formik.touched.phone ? "text-red-600 text-sm" : "text-gray-600 text-sm"}>{formik.errors.phone && formik.touched.phone ? formik.errors.phone : "Numéro de téléphone"}</label>
            <Input type="tel" name="phone" value={formik.values.phone} onChange={formik.handleChange} className="" />
          </div>

          <div>
            <label className={formik.errors.password && formik.touched.password ? "text-red-600 text-sm" : "text-gray-600 text-sm"}> {formik.errors.password && formik.touched.password ? formik.errors.password : "Mot de passe"} </label>

            <Input.Password
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </div>

          <Button htmlType="submit" className="bg-blue-600 text-white w-[200px] flex self-center " loading={loading}>
            Se connecter
          </Button>
        </form>
      </div>
    </main>
  );
}
