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
import { PostModel } from "@/models/PosteModel";
import { SaleModel } from "@/models/modelCommercial/SaleModel";
import ExportDialog from "@/app/(pages)/components/ExportDialog";


export default function Customer() {
    const [data, setData] = useState<PostModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<PostModel[]>([]);
    const router = useRouter();

    useEffect(() => {
        Api.read('/api/sale').then((value) => {
            setData(value)
        })
    }, []);


    //tableau

    const tableConstruction = (data: any[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.name}</TableCell>
                <TableCell className="font-medium">{items.customer.name}</TableCell>
                <TableCell className="font-medium">{items.estimated_amount}</TableCell>
                <TableCell className="font-medium">{items.close_date}</TableCell>
                <TableCell className="font-medium">{items.status}</TableCell>
                {/*actions*/}
                <TableCell className="text-right">
                    <MenuTable childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                    size={"sm"}
                                    onClick={() => {
                                        router.push(`/edit_sale/${items.id}`)
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
                                            text: `Voulez-vous suprimer l opportunité ?`,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Suprimer"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                const saleModel = new SaleModel(items.name, items.customerId, items.stage, items.estimated_amount, items.close_date, items.description, items.status, items.id, false, false);
                                                Api.update(`/api/sale/${items.id}`, saleModel)
                                                Swal.fire({
                                                    title: "Suprimé!",
                                                    text: "La supression a été effectuer.",
                                                    icon: "success"
                                                });

                                                setData(data.filter((item) => item.id !== items.id));
                                                setResults(results.filter((item) => item.id !== items.id));
                                                router.refresh();
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
            <HeadList title={"Liste des Oportunités de vente "} subtitle={"Gestion du departement commercial"} link={"/add_sale"} buttonTitle={"Ajouté une oportunité de vente"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


            {/** searche input */}
            <SearchInput query={query} setQuery={setQuery} data={data} element="name" setResults={setResults} palceholder={"Recherche par nom de l'opportunité de vente"} />

            {/*table*/}
            <div className="flex flex-col space-y-3 ">
                 <div className="w-auto">
                    <ExportDialog data={data} />
                </div>
            <Table>
                <TableCaption>Liste des opportunité de vente.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Nom</TableHead>
                        <TableHead className="">Nom du client</TableHead>
                        <TableHead className="">Montant</TableHead>
                        <TableHead className="">Date de cloture</TableHead>
                        <TableHead className="text-right">status</TableHead>
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