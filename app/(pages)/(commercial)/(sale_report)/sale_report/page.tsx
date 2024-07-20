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


export default function SaleReport() {
    const [data, setData] = useState<PostModel[]>([]);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<PostModel[]>([]);
    const router = useRouter();

    useEffect(() => {
        Api.read('/api/poste').then((value) => {
            setData(value)
        })
    }, []);


    return(
        <main className="flex flex-col gap-5">
            {/** head */}
            <HeadList title={"Liste des raports de vente "} subtitle={"Gestion du departement commercial"} link={"/add_sale_report"} buttonTitle={"Ajouté un raport"} count={data.length} />

            {/** saparator */}
            <Separator className="w-full" />


             {/** searche input */}
            <SearchInput query={query} setQuery={setQuery} data={data}  element="posteName" setResults={setResults} palceholder={"Trouver un poste"} />
            
            {/*table*/}
        </main>
    );
}