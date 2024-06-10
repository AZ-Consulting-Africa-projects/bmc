"use client"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, FolderDown, UserPlus, Trash2 } from "lucide-react";
import { Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { useRouter } from "next/navigation";
import Swal from 'sweetalert2'
import Image from "next/image";

interface DataType {
    key: string;
    imageUrl: string;
    name: string;
    poste: string;
    in_h_d: string;
    out_h_d: string;
    status: string;
  }


export default function Attendance() {
    const router = useRouter();

    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'profil',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            render: (text) => <Image src={text}alt="" width={100} height={100} className="object-center rounded-full " />,
          },

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
          title: 'Date et heure d arrivé',
          dataIndex: 'in_h_d',
          key: 'in_h_d',
        },
        {
          title: 'Date et heure de départ',
          dataIndex: 'out_h_d',
          key: 'out_h_d',
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: (_, { status }) => (
            <div>
              {
                status == "ABSENT" ?
                  <Tag color={"red"} key={status}>
                    {status.toUpperCase()}
                  </Tag> : <Tag color={"green"} key={status}>
                    {status.toUpperCase()}
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
          imageUrl: '/image/homme.png',
          name: 'John Brown',
          poste: 'DG',
          in_h_d: "12/02/2024 07:30",
          out_h_d: '12/02/2024 18:30',
          status: "PRESENT",
        },

        {
            key: '1',
            imageUrl: '/image/homme.png',
            name: 'John Brown',
            poste: 'DG',
            in_h_d: "12/02/2024 07:30",
            out_h_d: '12/02/2024 18:30',
            status: "ABSENT",
          },

          {
            key: '1',
            imageUrl: '/image/homme.png',
            name: 'John Brown',
            poste: 'DG',
            in_h_d: "12/02/2024 07:30",
            out_h_d: '12/02/2024 18:30',
            status: "LATE",
          },
        
      ];
    return (
        <div className="flex flex-col gap-5">
            {/** head */}
            <div className="flex justify-between content-between w-full items-center">
                <div>
                    <h1 className="md:text-3xl text-xl font-bold">Liste des Présences (0)</h1>
                    <p className="text-gray-600 text-[13px] ">Employees mangement</p>
                </div>

                <Button
                    size={"sm"}
                    className="bg-blue-600 flex space-x-2"
                    onClick={() => {
                        router.push('/add_attendance')
                    }}
                >
                    <h1>Ajouté une Présence</h1>
                    <UserPlus />

                </Button>
            </div>

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

          <Button size={"sm"} variant="outline" className="flex space-x-2">
            <h1>Télecharger la liste</h1>
            <FolderDown />
          </Button>
        </div>
        <Table columns={columns} dataSource={data} />
      </div>

            <h1>Attendance</h1>
        </div>
    );
}