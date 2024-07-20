"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, FolderDown, UserPlus, Trash2 } from "lucide-react";
import type { TableProps } from 'antd';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import ExportDialog from "@/app/(pages)/components/ExportDialog";
import { useEffect, useRef, useState } from "react";
import { searchFunction } from "@/lib/utils";
import HeadList from "@/app/(pages)/components/HeadList";
import { UserModel } from "@/models/UserModel";
import { Api } from "@/app/api/Api";
import SearchInput from "@/app/(pages)/components/SearchInput";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MenuTable } from "@/app/(pages)/components/MenuTable";
import { DepartementModel } from "@/models/DepartementModel";
import { DropdownMenuGroup, DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Image from "next/image";

interface DataType {
    key: string;
    name: string;
    poste: string;
    phone: number;
    address: string;
    role: string;
}


export default function Employees() {
    const router = useRouter();
    const refPdf: any = useRef();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [data, setData] = useState<UserModel[]>([]);

    useEffect(() => {
        Api.read('/api/user').then((value) => {
            setData(value);
        })
    }, []);

    //tableau

    const tableConstruction = (data: UserModel[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">
                    <Image src={String(items.imageUrl)} alt="" width={80} height={80} className="rounded-full " />

                </TableCell>

                <TableCell className="font-medium">{items.firstName} {items.lastName}</TableCell>
                <TableCell className="font-medium">{items.departement}</TableCell>
                <TableCell className="font-medium">{items.phone}</TableCell>
                <TableCell className="font-medium">{items.position}</TableCell>
                <TableCell className="font-medium">{items.role}</TableCell>

                {/*actions*/}
                <TableCell className="text-right">
                    <MenuTable childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                    size={"sm"}
                                    onClick={() => {
                                        router.push(`/edit_employees/${items.id}`)
                                    }}
                                    className={'self-center w-full'}
                                >
                                    Editer
                                </Button>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                {/** delate button */}
                                <Button type="button"
                                    variant={'destructive'}
                                    size={'sm'}
                                    onClick={() => {
                                        Swal.fire({
                                            title: "supression",
                                            text: `Voulez-vous suprimer l employer ${items.firstName} ?`,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Suprimer"
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                const userModel = new UserModel(items.email, items.firstName, items.lastName, items.phone, items.departement, items.position, items.role, items.password, false, false, items.hire_date, items.imageUrl, items.salary, items.id);

                                                const resp = await Api.update(`/api/user/${items.id}`, userModel)
                                                if (resp.ok) {
                                                    Swal.fire({
                                                        title: "Suprimé!",
                                                        text: "Votre supression a été effectuer.",
                                                        icon: "success"
                                                    });

                                                    setData(data.filter((item) => item.id !== items.id));
                                                    setResults(results.filter((item) => item.id !== items.id));
                                                    router.refresh();
                                                } else {
                                                    Swal.fire({
                                                        title: "Erreur",
                                                        text: "Votre supression a échoué.",
                                                        icon: "error"
                                                    });
                                                }



                                            }
                                        });

                                    }}

                                >
                                    Suprimer
                                </Button>

                            </DropdownMenuItem>

                        </DropdownMenuGroup>


                    } />
                </TableCell>
            </TableRow>
        ))

    }


    return (
        <div className="flex flex-col gap-5">
            {/** head */}
            <HeadList title={"Liste des employés "} subtitle={"Gestion des employés"} link={"/add_employees"} buttonTitle={"Ajouté un Employer"} count={data.length} />


            {/** saparator */}
            <Separator className="w-full" />


            {/** searche input */}
            <div className="grid grid-cols-1 md:grid-cols-2">
                <SearchInput query={query} setQuery={setQuery} data={data} element="firstName" setResults={setResults} palceholder={"Trouver un employé par le nom"} />
            </div>




            {/*table*/}
            <div className="flex flex-col space-y-3 ">
                <div className="w-auto">
                    <ExportDialog data={data} />
                </div>


                <Table>
                    <TableCaption>Liste des départements.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Profil</TableHead>
                            <TableHead className="">Nom prenom</TableHead>
                            <TableHead className="">Poste</TableHead>
                            <TableHead className="">Télépone</TableHead>
                            <TableHead className="">Adresse</TableHead>
                            <TableHead className="">Rôle</TableHead>

                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                            query == '' ? tableConstruction(data) : tableConstruction(results)
                        }
                    </TableBody>
                    <TableFooter>

                    </TableFooter>
                </Table>
            </div>/
        </div>
    );
}