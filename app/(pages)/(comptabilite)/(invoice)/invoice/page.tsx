"use client"
import HeadList from "@/app/(pages)/components/HeadList";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";
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
import { InvoiceModel } from "@/models/modelComptatibilite/InvoiceModel";

export default function Transaction() {
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    const router = useRouter();


    useEffect(() => {
        Api.read('/api/invoice').then((value) => {
            setData(value)
        })
    }, []);

    //tableau

    const tableConstruction = (data: any[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.user.firstNae}</TableCell>
                <TableCell className="font-medium">{items.date}</TableCell>
                <TableCell className="font-medium">{items.amount}</TableCell>
                <TableCell className="font-medium">{items.due_date}</TableCell>
                <TableCell className="font-medium">{items.status}</TableCell>

                {/*actions*/}
                <TableCell className="text-right">
                    <MenuTable childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                    size={"sm"}
                                    onClick={() => {
                                        router.push(`/edit_invoice/${items.id}`)
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
                                            text: `Voulez-vous suprimer le poste ${items.posteName} ?`,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Suprimer"
                                        }).then(async(result) => {
                                            if (result.isConfirmed) {
                                                //const posteModel = new PostModel(items.posteName, +items.deparetementId, items.description, false, false, items.id);
                                                const invoiceModel = new InvoiceModel(items.date, +items.amount, +items.userId, items.due_date, items.status, items.description, items.id, false, false)
                                                const resp = await Api.update(`/api/invoice/${items.id}`, invoiceModel)

                                                if(resp.ok) {
                                                    Swal.fire({
                                                        title: "Suprimé!",
                                                        text: "La supression a été effectuer.",
                                                        icon: "success"
                                                    });
                                                    
                                                    setData(data.filter((item) => item.id !== items.id));
                                                    setResults(results.filter((item) => item.id !== items.id));
                                                    router.refresh();
                                                } else {
                                                    Swal.fire({
                                                        title: "Erreur!",
                                                        text: "Une erreur est survenue lors de la supression.",
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
            <HeadList title={"Liste des factures "} subtitle={"Gestion de la comptatiblité"} link={"/add_invoice"} buttonTitle={"Ajouté une facture"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


            {/** searche input */}
            <SearchInput query={query} setQuery={setQuery} data={data} element="departementName" setResults={setResults} palceholder={"Trouver une transaction par date"} />

             {/*table*/}
             <div className="flex flex-col space-y-3 ">
                 <div className="w-auto">
                    <ExportDialog data={data} />
                </div>
             <Table>
                <TableCaption>Liste des factures.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Nom de l'utilisateur</TableHead>
                        <TableHead className="">Date</TableHead>
                        <TableHead className="">Montant</TableHead>
                        <TableHead className="">Date d'expiration</TableHead>
                        <TableHead className="">Status</TableHead>
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
        </main >
    );
}