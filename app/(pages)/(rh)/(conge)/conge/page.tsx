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
import { Select, Space } from 'antd';
import { LeaveModel } from "@/models/LeaveModel";


export default function Formation() {
    const [data, setData] = useState<any[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const router = useRouter();

    useEffect(() => {
        Api.read('/api/leaverequest').then((value) => {
            setData(value);
        })
    }, []);

    const tableConstruction = (data: any[]) => {
        return data.map((items) => (
            <TableRow key={items.id}>
                <TableCell className="font-medium">{items.user.firstName}</TableCell>

                <TableCell className="">{items.leave_type}</TableCell>
                <TableCell className="">{items.request_date}</TableCell>
                <TableCell className="">{items.start_date}</TableCell>
                <TableCell className="">{items.end_date}</TableCell>
                <TableCell className={items.status == "REJECTED"? "bg-red-400": "bg-lime-600"}>
                    <Select
                        defaultValue={items.status}
                        onChange={(value) => {
                            const leaveModel = new LeaveModel(+items.userId, items.leave_type, items.start_date, items.end_date, items.reason, value, items.request_date, items.approval_date);
                            Api.update(`/api/leaverequest/${items.id}`, leaveModel);
                            router.refresh();

                        }}
                        className=" w-full "
                        options={[
                            {
                                value: 'PENDING',
                                label: 'En cours',
                            },
                            {
                                value: 'APPROVED',
                                label: 'Approuver',
                            },
                            {
                                value: 'REJECTED',
                                label: 'Rejeter',
                            }
                        ]}/>
                        
                    </TableCell>
                {/*actions*/}
                <TableCell className="text-right">
                    <MenuTable childrens={

                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Button variant={"outline"}
                                    size={"sm"}
                                    onClick={() => {
                                        router.push(`/edit_conge/${items.id}`)
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
                                        }).then(async (result) => {
                                            if (result.isConfirmed) {
                                                const leaveModel = new LeaveModel(+items.userId, items.leave_type, items.start_date, items.end_date, items.reason, items.status, items.request_date, items.approval_date, +items.id, false, false);
                                                const resp = await Api.update(`/api/leaverequest/${items.id}`, leaveModel);
                                                
                                                if(resp.ok) {
                                                    Swal.fire({
                                                        title: "Suprimé!",
                                                        text: "La supression a été effectuer.",
                                                        icon: "success"
                                                    });
    
                                                    setData(data.filter((item) => item.id !== items.id));
                                                    setResults(results.filter((item) => item.id !== items.id));
                                                    router.refresh();
                                                }else {
                                                    console.log(resp)
                                                    Swal.fire({
                                                        title: "Erreur!",
                                                        text: "Use erreur est survenu lors de la supression. Reesayer!",
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
            <HeadList title={"Liste des congés "} subtitle={"Employees mangement"} link={"/add_conge"} buttonTitle={"Ajouté un congé"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


            {/** searche input */}
            <SearchInput query={query} setQuery={setQuery} data={data} element="leave_type" setResults={setResults} palceholder={"Recherche par type de congé"} />

            {/*table*/}
            <div className="flex flex-col space-y-3 ">
                 <div className="w-auto">
                    <ExportDialog data={data} />
                </div>

                 <Table>
                <TableCaption>Liste des congé.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Employer</TableHead>
                        <TableHead className="">type de congé</TableHead>
                        <TableHead className="">Date de la demande</TableHead>
                        <TableHead className="">Date de début</TableHead>
                        <TableHead className="">Date de fin</TableHead>
                        <TableHead className="">Status</TableHead>
                        <TableHead className="">Action</TableHead>
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