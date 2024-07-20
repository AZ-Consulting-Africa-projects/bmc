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
import ExportDialog from "@/app/(pages)/components/ExportDialog";
import { BudgetModel } from "@/models/modelComptatibilite/BudgetModel";

export default function Transaction() {
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const router = useRouter();


    useEffect(() => {
        Api.read('/api/budget').then((value) => {
            setData(value)
        })
    }, []);

    //tableau

    const tableConstruction = (data: any[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.departement.departementName}</TableCell>
                <TableCell className="font-medium">{items.budget_allocated}</TableCell>
                <TableCell className="font-medium">{items.budget_spent}</TableCell>
                <TableCell className="font-medium">{items.budget_remaining}</TableCell>
                <TableCell className="text-right">{items.period}</TableCell>
                {/*actions*/}
                <TableCell className="text-right">
                    <MenuTable childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                    size={"sm"}
                                    onClick={() => {
                                        router.push(`/edit_budget/${items.id}`)
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
                                            text: `Voulez-vous suprimer ce budget  ?`,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Suprimer"
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                const buggetModel = new BudgetModel(+items.departementId, +items.budget_allocated, +items.budget_spent, +items.budget_remaining, items.period, items.description, items.id, false, false);
                                                const resp = await Api.update(`/api/poste/${items.id}`, buggetModel)

                                                if(resp.ok) {
                                                    Swal.fire({
                                                        title: "Suprimé!",
                                                        text: "La supression a été effectuer.",
                                                        icon: "success"
                                                    });
                                                    
                                                    setData(data.filter((item) => item.id !== items.id));
                                                    setResults(results.filter((item) => item.id !== items.id));
                                                    router.refresh();
                                                }
                                                else {
                                                    console.log(resp);
                                                    Swal.fire({
                                                        title: "Erreur!",
                                                        text: "Une erreur s'est produit.",
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
            <HeadList title={"Liste des Budgets "} subtitle={"Gestion de la comptatiblité"} link={"/add_budget"} buttonTitle={"Ajouté une transation"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


            {/** searche input */}
            <SearchInput query={query} setQuery={setQuery} data={data} element="budget_allocated" setResults={setResults} palceholder={"Recherche par budget aloué "} />

             {/*table*/}
             <Table>
                <TableCaption>Liste des budgets.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Département</TableHead>
                        <TableHead className="">Budget Alloué</TableHead>
                        <TableHead className="">Somme dépansé</TableHead>
                        <TableHead className="">Somme restants</TableHead>
                        <TableHead className="">Période</TableHead>
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
        </main >
    );
}