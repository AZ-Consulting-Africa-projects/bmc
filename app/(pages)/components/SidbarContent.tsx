"use client"
import Link from "next/link"
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { User, Building2, LayoutDashboard, Settings, ShoppingBag, BadgeDollarSign, Users, ContactRound } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";



const SidbarContent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const logo = useSelector((state: RootState) => state.logoReducer.value.url);

    
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    return (
        <div className="w-full flex flex-col space-y-10 ">
            {/**logo */}
            <Image src={logo == "" || logo == undefined ? "/next.svg": logo} alt="logo" width={100} height={100} className="object-cover bg-center flex self-center md:mt-10"/>
            

            <div className="flex h-screen flex-col justify-between content-between">
                {/** links */}
                <div className="flex flex-col gap-3">
                    <Link href="" className="flex space-x-3" >
                        <LayoutDashboard className={pathname == "/dashboard" ? "text-blue-600" : ""} />
                        <h1 className={pathname == "/dashboard" ? "font-bold" : ""}>Dashboard</h1>
                    </Link>
                    
                     {/** Organistion*/}
                     <div className="flex space-x-3 " >
                        <div className="mt-3">
                            <Building2 className={pathname == "/poste" || pathname == "/poste" ? "text-blue-600 flex self-start" : "flex self-start"} />
                        </div>
                        
                        <Accordion type="single" collapsible >
                            <AccordionItem value="item-1">
                                <AccordionTrigger className={pathname == "/departement" || pathname == "/poste" ? "font-bold flex" :  "flex "}>Organisation</AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-3">
                                    <Link className={pathname == "/departement" ? "font-bold text-blue-600" : ""} href="/departement">Departement</Link>
                                     <Link className={pathname == "/poste" ? "font-bold text-blue-600" : ""} href="/poste">Poste</Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/** resource humain */}
                    <div className="flex space-x-3 " >
                        <div className="mt-3">
                            <Users className={pathname == "/employees" || pathname == "/attendance" ? "text-blue-600 flex self-start" : "flex self-start"} />
                        </div>
                        
                        <Accordion type="single" collapsible >
                            <AccordionItem value="item-1">
                                <AccordionTrigger className={pathname == "/employees" || pathname == "/attendance" ? "font-bold flex" :  "flex "}>RH</AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-3">
                                    <Link className={pathname == "/employees" ? "font-bold text-blue-600" : ""} href="/employees">Employer</Link>
                                     <Link className={pathname == "/attendance" ? "font-bold text-blue-600" : ""} href="/attendance">Presences</Link>
                                    <Link className={pathname == "/recrutement" ? "font-bold text-blue-600" : ""} href="/recrutement">Recrutements</Link>
                                    <Link className={pathname == "/conge" ? "font-bold text-blue-600" : ""} href="/conge">Congé</Link>
                                    <Link className={pathname == "/formation" ? "font-bold text-blue-600" : ""} href="/formation">Formations</Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>


                    {/** visiteuz */}
                    <div className="flex space-x-3 " >
                        <div className="mt-3">
                            <ContactRound className={pathname == "" || pathname == "" ? "text-blue-600 flex self-start" : "flex self-start"} />
                        </div>
                        
                        <Accordion type="single" collapsible >
                            <AccordionItem value="item-1">
                                <AccordionTrigger className={pathname == "/employees" || pathname == "" ? "font-bold flex" :  "flex "}> Visiteurs</AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-3">
            
                                    <Link className={pathname == "/employees" ? "font-bold text-blue-600" : ""} href="/employees">Employer</Link>
                                    <Link className={pathname == "/" ? "font-bold text-blue-600" : ""} href="/">Visiteurs</Link>
                                    <Link className={pathname == "/" ? "font-bold text-blue-600" : ""} href="/">Recrutements</Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/** commercial */}
                    <div className="flex space-x-3 " >
                        <div className="mt-3">
                            <ShoppingBag className={pathname == "" || pathname == "" ? "text-blue-600 flex self-start" : "flex self-start"} />
                        </div>
                        
                        <Accordion type="single" collapsible >
                            <AccordionItem value="item-1">
                                <AccordionTrigger className={pathname == "/employees" || pathname == "" ? "font-bold flex" :  "flex "}> Commercial</AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-3">
            
                                    <Link className={pathname == "/employees" ? "font-bold text-blue-600" : ""} href="/employees">Employer</Link>
                                    <Link className={pathname == "/" ? "font-bold text-blue-600" : ""} href="/">Visiteurs</Link>
                                    <Link className={pathname == "/" ? "font-bold text-blue-600" : ""} href="/">Recrutements</Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>


                    {/** comptabilité */}
                    <div className="flex space-x-3 " >
                        <div className="mt-3">
                            <BadgeDollarSign className={pathname == "/" || pathname == "" ? "text-blue-600 flex self-start" : "flex self-start"} />
                        </div>
                        
                        <Accordion type="single" collapsible >
                            <AccordionItem value="item-1">
                                <AccordionTrigger className={pathname == "/employees" || pathname == "" ? "font-bold flex" :  "flex "}>Comptabilité</AccordionTrigger>
                                <AccordionContent className="flex flex-col space-y-3">
            
                                    <Link className={pathname == "/employees" ? "font-bold text-blue-600" : ""} href="/employees">Employer</Link>
                                    <Link className={pathname == "/" ? "font-bold text-blue-600" : ""} href="/">Visiteurs</Link>
                                    <Link className={pathname == "/" ? "font-bold text-blue-600" : ""} href="/">Recrutements</Link>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                </div>


                {/** frams */}
                <div className="flex flex-col gap-5">
                <Link href="" className="flex space-x-3" >
                        <Settings className={pathname == "/dashboard" ? "text-blue-600" : ""} />
                        <h1 className={pathname == "/dashboard" ? "font-bold" : ""}>Parametre</h1>
                    </Link>

                    <Link href="" className="flex space-x-3" >
                        <h1 className="text-sm font-bold text-center">Suport d'aide</h1>
                    </Link>

                </div>
            </div>

        </div>


    );
}

export default SidbarContent;