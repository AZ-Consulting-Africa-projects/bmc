"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, FolderDown, UserPlus, Trash2 } from "lucide-react";
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import ExportDialog from "@/app/(pages)/components/ExportDialog";
import {useEffect, useRef, useState} from "react";
import { searchFunction } from "@/lib/utils";
import HeadList from "@/app/(pages)/components/HeadList";

interface DataType {
  key: string;
  name: string;
  poste: string;
  phone: number;
  address: string;
  role: string;
}


export default function Employees() {
  const router = useRouter();
  const refPdf: any = useRef();
  const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);


  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Poste',
      dataIndex: 'poste',
      key: 'poste',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Téléphone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Rôle',
      key: 'role',
      dataIndex: 'role',
      render: (_, { role }) => (
        <div>
          {
            role == "ADMIN" ?
              <Tag color={"red"} key={role}>
                {role.toUpperCase()}
              </Tag> : <Tag color={"blue"} key={role}>
                {role.toUpperCase()}
              </Tag>

          }
        </div>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => {
            router.push(`/edit_employees/${record.key}`)
          }} size={"sm"} variant="outline">Editer</Button>

          <Button size={"sm"} variant="destructive" onClick={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be able to revert this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "Deleted!",
                  text: "Your file has been deleted.",
                  icon: "success"
                });
              }
            });
          }}>
            <Trash2 />
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: '1',
      name: 'John Brown',
      poste: 'DG',
      phone: 32,
      address: 'New York No. 1 Lake Park',
      role: "ADMIN",
    },
    {
      key: '2',
      name: 'Jim Green',
      poste: 'RH',
      phone: 42,
      address: 'London No. 1 Lake Park',
      role: "EMPLOYEE",
    },
    {
      key: '3',
      name: 'Joe Black',
      poste: 'DIRECTEUR BI',
      phone: 32,
      address: 'Sydney No. 1 Lake Park',
      role: "ADMIN",
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      {/** head */}
      <HeadList title={"Liste des employés "} subtitle={"Employees mangement"} link={"/add_employees"} buttonTitle={"Ajouté un Employer"} count={0} />


      {/** saparator */}
      <Separator className="w-full" />


      {/** searche input */}
      <div className="flex items-center justify-center my-5">
        <div className="flex space-x-3 items-center">
          <Input className="md:w-[300px] w-[250px] " placeholder="Trouver un employé" />
          <Search className="text-blue-600" />
        </div>

      </div>


      {/** Tables */}
      <div className="flex flex-col space-y-3 ">
        <div className="flex space-x-5 ">
          <Button size={"sm"} className="">
            Recharger
          </Button>

          <ExportDialog data={data} refTable={refPdf} idTable={"table"} />
        </div>
         <Table ref={refPdf} id="table" columns={columns} dataSource={data} />
      </div>
    </div>
  );
}