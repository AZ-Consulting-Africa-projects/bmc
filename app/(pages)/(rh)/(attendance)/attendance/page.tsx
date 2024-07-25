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
import { AttendanceModel } from "@/models/AttendanceModel";
import { Select } from 'antd';


interface AttendanceInterface {
  userName: string;
  date: string;
  inTime: string;
  outTime: string;
  status: string;
  id?: number;
}

export default function Attendance() {
  const [data, setData] = useState<any[]>([]);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    Api.read('/api/attendance').then((value) => {
      setData(value);
    })
  }, []);

  const tableConstruction = (data: any[]) => {
    return data.map((items) => (
      <TableRow key={items.id}>
        <TableCell className="font-medium">{items.user.firstName}</TableCell>
        <TableCell className="font-medium">{items.date}</TableCell>
        <TableCell className="">{items.inTime}</TableCell>
        <TableCell className="">{items.outTime}</TableCell>
        <TableCell className={items.status == "ABSENT" ? "border-2 bg-red-600" : "border-2 bg-lime-600"}>
          <Select
            defaultValue={items.status}

            onChange={async (value) => {
              const attendanceModel = new AttendanceModel(Number(items.user.id), items.date, items.inTime, items.outTime, value, Number(items.id));
              const resp = await Api.update(`/api/attendance/${items.id}`, attendanceModel);
              if (resp.ok) {
                Swal.fire({
                  title: "Mise ajour effectuer",
                  text: "Votre mise a ajour a été effectuer.",
                  icon: "success"
                });
                /*setData(data.filter((item) => item.id !== items.id));
                setResults(results.filter((item) => item.id !== items.id));*/
                router.refresh();

              } else {
                console.log(resp);
                Swal.fire({
                  title: "Une erreur est survenue",
                  text: "La mise a jour a echoué",
                  icon: "error"
                });

              }
            }}
            className=" "
            options={
              [
                {
                  value: 'PRESENT',
                  label: 'Present',
                },
                {
                  value: 'ABSENT',
                  label: 'Absent',
                },

                {
                  value: 'LATE',
                  label: 'En retard',
                },
              ]
            }

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
                    router.push(`/edit_attendance/${items.id}`)
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
                      text: `Voulez-vous suprimer la presence  ?`,
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Suprimer"
                    }).then((result) => {
                      if (result.isConfirmed) {
                        //const departementModem = new DepartementModel(items.departementName, items.description, false, false, items.id);
                        //Api.update(`/api/departement/${items.id}`, departementModem)


                        Swal.fire({
                          title: "Suprimé!",
                          text: "Votre supression a été effectuer.",
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
    <div className="flex flex-col gap-5">
      {/** head */}
      <HeadList title={"Liste des presences "} subtitle={"Organisation mangement"} link={"/add_attendance"} buttonTitle={"Ajouté une presence"} count={data.length} />

      {/** saparator */}
      <Separator className="w-full" />


      {/** searche input */}
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 gap-4">
        <SearchInput query={query} setQuery={setQuery} data={data} element="date" setResults={setResults} palceholder={"Trouver une presence par date"} />

      </div>



      {/*table*/}
      <div className="flex flex-col space-y-3 ">
        <div className="w-auto">
          <ExportDialog data={data} />
        </div>


        <Table>
          <TableCaption>Liste des présences.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="">Employé</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead className="">Heure d'arrivé</TableHead>
              <TableHead className="">Heure de départ</TableHead>
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




    </div>
  );
}