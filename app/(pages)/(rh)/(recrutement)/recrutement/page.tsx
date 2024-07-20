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
import SearchInput from "@/app/(pages)/components/SearchInput";
import ExportDialog from "@/app/(pages)/components/ExportDialog";
import { RecrutementModel } from "@/models/RecrutementModel";
import { Select, SelectProps } from "antd";
export default function Formation() {
    const [data, setData] = useState<RecrutementModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<RecrutementModel[]>([]);
    const [query1, setQuery1] = useState('');
    const [results1, setResults1] = useState<RecrutementModel[]>([]);
    const router = useRouter();

    useEffect(() => {
        Api.read('/api/recrutement').then((value) => {
            setData(value);
        })
    }, []);

    //tableau

    const tableConstruction = (data: RecrutementModel[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="">{items.title}</TableCell>
                <TableCell className="font-medium">{items.poste}</TableCell>

                <TableCell className="">{items.posting_date}</TableCell>
                <TableCell className="">{items.closing_date}</TableCell>

                <TableCell className={items.status == "CLOSE" ? "bg-red-600 text-white" : "bg-green-600 text-white"}>
                    <Select

                        defaultValue={items.status}
                        onChange={async (value) => {
                            const recrutementModel = new RecrutementModel(items.title, items.poste, items.description, items.responsability, items.requirement, items.location, items.salary, items.posting_date, items.closing_date, value, items.id);
                            const resp = await Api.update(`/api/recrutement/${items.id}`, recrutementModel);
                            if (resp.ok) {
                                Swal.fire({
                                    title: "Mise à jour",
                                    text: "Votre mise à jour a été effectuer.",
                                    icon: "success"
                                });
                                router.refresh();
                            } else {
                                console.log(resp);
                                Swal.fire({
                                    title: "Erreur de Mise à jour",
                                    text: "Une erreur est survenu lors du mise à jour.",
                                    icon: "error"
                                });
                            }


                        }}
                        className="w-full"
                        options={[
                            {
                                value: "OPEN",
                                label: "OPEN",
                            },
                            {
                                value: "CLOSE",
                                label: "CLOSE",
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
                                        router.push(`/edit_recrutement/${items.id}`)
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
                                            title: "Supression",
                                            text: `Voulez-vous suprimer ce recrutement? `,
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Suprimer"
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                const recrutementModel = new RecrutementModel(items.title, items.poste, items.description, items.responsability, items.requirement, items.location, items.salary, items.posting_date, items.closing_date, items.status, items.id, false, false);
                                                const resp = await Api.update(`/api/recrutement/${items.id}`, recrutementModel);
                                                if(resp.ok) {
                                                    Swal.fire({
                                                    title: "Suprimé!",
                                                    text: "Votre supression a été effectuer.",
                                                    icon: "success"
                                                });

                                                setData(data.filter((item) => item.id !== items.id));
                                                setResults(results.filter((item) => item.id !== items.id));
                                                router.refresh();
                                                } else {
                                                    console.log(resp);
                                                    Swal.fire({
                                                        title: "Erreur de Supression",
                                                        text: "Une erreur est survenu lors de la supression.",
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

     let tableContent;

  if (query !== '') {
    tableContent = results.length > 0 ? tableConstruction(results) : tableConstruction(data);
  } else if (query1 !== '') {
    tableContent = results1.length > 0 ? tableConstruction(results1) : tableConstruction(data);
  } else {
    tableContent = tableConstruction(data);
  }


    return (
        <main className="flex flex-col gap-5">
            {/** head */}
            <HeadList title={"Liste des recrutements "} subtitle={"employees mangement"} link={"/add_recrutement"} buttonTitle={"Ajouté un recrutement"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


            {/** searche input */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchInput query={query} setQuery={setQuery} data={data} element="title" setResults={setResults} palceholder={"Recherche parte titre"} />
                <SearchInput query={query1} setQuery={setQuery1} data={data} element="poste" setResults={setResults1} palceholder={"Recherche par poste"} />
                {/*<SearchInput query={query} setQuery={setQuery} data={data} element="posting_date" setResults={setResults} palceholder={"Recherche par date d'ouverture"} />
            <SearchInput query={query} setQuery={setQuery} data={data} element="closing_date" setResults={setResults} palceholder={"Recherche par date de fermeture"} />
            */}</div>


            {/*table*/}
            <div className="flex flex-col space-y-3 ">
                <div className="w-auto">
                    <ExportDialog data={data} />
                </div>


                <Table>
                    <TableCaption>Liste des recrutements.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="">Titre</TableHead>
                            <TableHead className="">Poste</TableHead>
                            <TableHead className="">Date d'ouverture</TableHead>
                            <TableHead className="">Date de cloture</TableHead>
                            <TableHead className="">Status</TableHead>
                            <TableHead className="text-right">Action</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {
                          tableContent
                        }
                    </TableBody>
                    
                    <TableFooter>

                    </TableFooter>
                </Table>
            </div>

        </main>
    );
}