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
import { VisitorModel } from "@/models/VisitorModel";
import { Select } from "antd";

export default function Visitor() {
    const [data, setData] = useState<VisitorModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<VisitorModel[]>([]);
    const router = useRouter();

    useEffect(() => {
        Api.read('/api/visitor').then((value) => {
            setData(value);
            console.log(value)
        })
    }, []);

    const tableConstruction = (data: VisitorModel[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.name}</TableCell>

                <TableCell className="">{items.company}</TableCell>
                <TableCell className="">{items.arrival_time}</TableCell>
                <TableCell className="">{items.departure_date}</TableCell>
                <TableCell className="">{items.person_to_meet}</TableCell>
                <TableCell className="">{items.purpose_of_visit}</TableCell>
                <TableCell className="">
                    <Select
                        defaultValue={items.status}
                        onChange={async (value) => {
                            const visitorModel = new VisitorModel(items.name, items.company, items.purpose_of_visit, items.arrival_date, items.arrival_time, items.departure_date, items.person_to_meet, value, items.visitor_id_card, items.id);
                            const resp = await Api.update(`/api/visitor/${items.id}`, visitorModel);
                            if (resp.ok) {
                                Swal.fire({
                                    title: "Moficiation!",
                                    text: "Votre Modification a été effectuer.",
                                    icon: "success"
                                });

                                setData(data.filter((item) => item.id !== items.id));
                                setResults(results.filter((item) => item.id !== items.id));
                                router.refresh();
                            } else {
                                Swal.fire({
                                    title: "Modification!",
                                    text: "Votre Modificaiton a été effectuer.",
                                    icon: "error"
                                });
                            }
                        }}
                        className="w-full "
                        options={[
                            {
                                label: "En attente",
                                value: "WAITING",
                            },
                            {
                                label: "En cours",
                                value: "GOING",
                            },
                            {
                                label: "Fini",
                                value: "DONE",
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
                                        router.push(`/edit_visitor/${items.id}`)
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
                                            text: `Voulez-vous suprimer le visiteur ${items.name} ?`,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Suprimer"
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {

                                                const visitorModel = new VisitorModel(items.name, items.company, items.purpose_of_visit, items.arrival_date, items.arrival_time, items.departure_date, items.person_to_meet, items.status, items.visitor_id_card, items.id, false, false);
                                                const resp = await Api.update(`/api/visitor/${items.id}`, visitorModel);
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
                                                        title: "Suprimé!",
                                                        text: "Votre supression a été effectuer.",
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
            <HeadList title={"Liste des visiteurs "} subtitle={"visitor mangement"} link={"/add_visitor"} buttonTitle={"Ajouté un Visiteur"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


            {/** searche input */}
            <SearchInput query={query} setQuery={setQuery} data={data} element="name" setResults={setResults} palceholder={"Trouver un departement"} />

            {/*table*/}
            <div className="flex flex-col space-y-3 ">
                <div className="w-auto">
                    <ExportDialog data={data} />
                </div>


                <Table>
                    <TableCaption>Liste des visitor.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Nom complet</TableHead>
                            <TableHead className="">Nom de l'entreprise</TableHead>
                            <TableHead className="">Date</TableHead>
                            <TableHead className="">Heure d'arrivé</TableHead>
                            <TableHead className="">Heure de départ</TableHead>
                            <TableHead className="">Persone à voir </TableHead>
                            <TableHead className="">Raison de la visite</TableHead>
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

        </main>
    )
}