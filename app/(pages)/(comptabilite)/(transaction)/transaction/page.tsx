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
import { TransactionModel } from "@/models/modelComptatibilite/TransactionModel";
import { Select } from "antd";

export default function Transaction() {
    const [data, setData] = useState<TransactionModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<TransactionModel[]>([]);

    const router = useRouter();


    useEffect(() => {
        Api.read('/api/transaction').then((value) => {
            setData(value)
        })
    }, []);


    //tableau

    const tableConstruction = (data: TransactionModel[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.date}</TableCell>
                <TableCell className="">{items.type}</TableCell>
                <TableCell className="">{items.amount}</TableCell>
                <TableCell className="">{items.category}</TableCell>
                <TableCell className="">
                    <Select
                        defaultValue={items.status}
                        onChange={async (value) => {
                            const transactionModel = new TransactionModel(items.date, items.amount, items.type, items.category, value, items.description, items.id);
                            const resp = await Api.update(`/api/transaction/${items.id}`, transactionModel)

                            if (resp.ok) {
                                Swal.fire({
                                    title: "Modification!",
                                    text: "La Modification a été effectuer.",
                                    icon: "success"
                                });

                                setData(data.filter((item) => item.id !== items.id));
                                setResults(results.filter((item) => item.id !== items.id));
                                router.refresh();
                            } else {
                                console.log(resp);
                                Swal.fire({
                                    title: "Erreur!",
                                    text: "une erreur est survenue.",
                                    icon: "error"
                                });
                            }
                        }}
                        className=" md:w-[full "
                        options={[
                            {
                                label: "En attente",
                                value: "PENDING",
                            },
                            {
                                label: "Finie",
                                value: "COMPLETED",
                            },
                            {
                                label: "Échoié",
                                value: "FAILED",
                            },
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
                                        router.push(`/edit_transaction/${items.id}`)
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
                                            text: `Voulez-vous suprimer la transaction  ?`,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Suprimer"
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                //const posteModel = new PostModel(items.posteName, +items.deparetementId, items.description, false, false, items.id);
                                                const transactionModel = new TransactionModel(items.date, items.amount, items.type, items.category, items.status, items.description, items.id, false, false);
                                                const resp = await Api.update(`/api/transaction/${items.id}`, transactionModel)

                                                if (resp.ok) {
                                                    Swal.fire({
                                                        title: "Suprimé!",
                                                        text: "La supression a été effectuer.",
                                                        icon: "success"
                                                    });

                                                    setData(data.filter((item) => item.id !== items.id));
                                                    setResults(results.filter((item) => item.id !== items.id));
                                                    router.refresh();
                                                } else {
                                                    console.log(resp);
                                                    Swal.fire({
                                                        title: "Erreur!",
                                                        text: "une erreur est survenue.",
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
            <HeadList title={"Liste des Transactions "} subtitle={"Gestion de la comptatiblité"} link={"/add_transaction"} buttonTitle={"Ajouté une transation"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


            {/** searche input */}
            <SearchInput query={query} setQuery={setQuery} data={data} element="departementName" setResults={setResults} palceholder={"Trouver une transaction par "} />


            {/*table*/}
            <Table>
                <TableCaption>Liste des postes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">date</TableHead>
                        <TableHead className="">Type de transaction</TableHead>
                        <TableHead className="">Montant</TableHead>
                        <TableHead className="">Catégorie de transaction</TableHead>
                        <TableHead className="">Status</TableHead>
                        <TableHead className="">Description</TableHead>
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