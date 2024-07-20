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
import { QuoteModel } from "@/models/modelCommercial/QuoteModel";


export default function Quote() {
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        Api.read('/api/quote').then((value) => {
            setData(value)
        })
    }, []);

    //tableau

    const tableConstruction = (data: any[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.customer.name}</TableCell>

                <TableCell className="text-right">{items.type}</TableCell>
                <TableCell className="text-right">{items.date_issued}</TableCell>
                <TableCell className="text-right">{items.amount}</TableCell>
                <TableCell className="text-right">{items.status}</TableCell>
                {/*actions*/}
                <TableCell className="text-right">
                    <MenuTable childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                    size={"sm"}
                                    onClick={() => {
                                        router.push(`/edit_quote/${items.id}`)
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
                                            text: `Voulez-vous suprimer le quote?`,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Suprimer"
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                const quoteModel = new QuoteModel(items.type, +items.customerId, items.date_issued, +items.amount, items.description, items.status, +items.id, false, false);
                                                Api.update(`/api/quote/${items.id}`, quoteModel)
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


    return(
        <main className="flex flex-col gap-5">
            {/** head */}
            <HeadList title={"Liste des devies et facture "} subtitle={"Gestion du departement commercial"} link={"/add_quote"} buttonTitle={"Ajouté un devis/facture"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


             {/** searche input */}
            <SearchInput query={query} setQuery={setQuery} data={data}  element="type" setResults={setResults} palceholder={"Recherche par type"} />
            
            {/*table*/}
            <Table>
                <TableCaption>Liste des Quotes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Client</TableHead>
                        <TableHead className="text-right">Type</TableHead>
                        <TableHead className="text-right">Date</TableHead>
                        <TableHead className="text-right">Montant</TableHead>
                        <TableHead className="text-right">Status</TableHead>
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
        </main>
    );
}