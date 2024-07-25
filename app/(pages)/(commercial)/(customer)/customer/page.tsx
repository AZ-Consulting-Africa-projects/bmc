"use client"
import HeadList from "@/app/(pages)/components/HeadList";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
import { DepartementModel } from "@/models/DepartementModel";
import { Api } from "@/app/api/Api";
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
import { DropdownMenuGroup, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { searchFunction } from "@/lib/utils";
import SearchInput from "@/app/(pages)/components/SearchInput";
import { CustomerModel } from "@/models/modelCommercial/CustomerModel";
import { Select } from "antd";
import ExportDialog from "@/app/(pages)/components/ExportDialog";


export default function Customer() {
    const [data, setData] = useState<CustomerModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<CustomerModel[]>([]);
    const router = useRouter();

    useEffect(() => {
        Api.read('/api/customer').then((value) => {
            setData(value)
        })
    }, []);

    //tableau

    const tableConstruction = (data: CustomerModel[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.name}</TableCell>
                <TableCell className="font-medium">{items.phone}</TableCell>
                <TableCell className="font-medium">{items.email}</TableCell>
                <TableCell className="font-medium">{items.address}</TableCell>
                <TableCell className="font-medium">{items.company}</TableCell>
                <TableCell className="text-right">
                    <Select
                        defaultValue={items.status}
                        onChange={async (value) => {
                            const customerModel = new CustomerModel(items.name, items.company, items.phone, items.email, items.address, value, items.id);
                            const resp = await Api.update(`/api/customer/${items.id}`, customerModel)

                            if (resp.ok) {
                                Swal.fire({
                                    title: "Modification!",
                                    text: "Modification effectuer avec succès.",
                                    icon: "success"
                                });
                                router.refresh();
                            } else {
                                console.log(resp)
                                Swal.fire({
                                    title: "Erreur!",
                                    text: "Une erreur est survénu ",
                                    icon: "error"
                                });
                            }
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

                </TableCell>
                {/*actions*/}
                <TableCell className="text-right">
                    <MenuTable childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                    size={"sm"}
                                    onClick={() => {
                                        router.push(`/edit_customer/${items.id}`)
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
                                            text: `Voulez-vous suprimer le client ${items.name} ?`,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Suprimer"
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                const customerModel = new CustomerModel(items.name, items.company, items.phone, items.email, items.address, items.status, items.id, false, false);
                                                const resp = await Api.update(`/api/customer/${items.id}`, customerModel)

                                                if (resp.ok) {
                                                    Swal.fire({
                                                        title: "Modification!",
                                                        text: "Modification effectuer avec succès.",
                                                        icon: "success"
                                                    });
                                                    setData(data.filter((item) => item.id !== items.id));
                                                    setResults(results.filter((item) => item.id !== items.id));
                                                    router.refresh();
                                                    router.refresh();
                                                } else {
                                                    console.log(resp)
                                                    Swal.fire({
                                                        title: "Erreur!",
                                                        text: "Une erreur est survénu ",
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
        <main className="flex flex-col gap-5">
            {/** head */}
            <HeadList title={"Liste des Clients "} subtitle={"Gestion du departement commercial"} link={"/add_customer"} buttonTitle={"Ajouté un client"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


            {/** searche input */}
            <SearchInput query={query} setQuery={setQuery} data={data} element="name" setResults={setResults} palceholder={"Recherche par le nom du client"} />

            {/*table*/}
             <div className="flex flex-col space-y-3 ">
                <div className="w-auto">
                    <ExportDialog data={data} />
                </div>

                 <Table>
                <TableCaption>Liste des client.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Nom du Client</TableHead>
                        <TableHead className="">Numéro de téléphone</TableHead>
                        <TableHead className="">Email du client</TableHead>
                        <TableHead className="">Adresse du client</TableHead>
                        <TableHead className="text-right">Status</TableHead>
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
             </div>
                 
           
        </main>
    );
}