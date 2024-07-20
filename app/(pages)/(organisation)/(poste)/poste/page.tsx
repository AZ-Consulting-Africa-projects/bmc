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


export default function Poste() {
    const [data, setData] = useState<PostModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<PostModel[]>([]);
    const router = useRouter();


    useEffect(() => {
        Api.read('/api/poste').then((value) => {
            setData(value)
        })
    }, []);

    //tableau

    const tableConstruction = (data: PostModel[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.posteName}</TableCell>

                <TableCell className="text-right">{items.description}</TableCell>
                {/*actions*/}
                <TableCell className="text-right">
                    <MenuTable childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                    size={"sm"}
                                    onClick={() => {
                                        router.push(`/edit_poste/${items.id}`)
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
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                const posteModel = new PostModel(items.posteName, +items.deparetementId, items.description, false, false, items.id);
                                                Api.update(`/api/poste/${items.id}`, posteModel)


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
            <HeadList title={"Liste des Postes "} subtitle={"Organisation mangement"} link={"/add_poste"} buttonTitle={"Ajouté un poste"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


             {/** searche input */}
            <SearchInput query={query} setQuery={setQuery} data={data}  element="posteName" setResults={setResults} palceholder={"Trouver un poste"} />
            
            {/*table*/}
            <Table>
                <TableCaption>Liste des postes.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Nom du poste</TableHead>
                        <TableHead className="text-right">Description</TableHead>
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
        </main>
    );
}