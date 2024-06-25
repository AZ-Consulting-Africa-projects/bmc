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

interface DataType {
    key: string;
    title: string;
    beginDate: string;
    endDate: string;
    userName: string;
    status: string;
}


export default function Formation() {
    const router = useRouter();


    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Titre',
            dataIndex: 'title',
            key: 'title',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Date de debut',
            dataIndex: 'beginDate',
            key: 'beginDate',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Date de fin',
            dataIndex: 'endDate',
            key: 'endDate',
        },
        {
            title: 'Emplyer ',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Rôle',
            key: 'status',
            dataIndex: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button onClick={() => {
                        router.push(`/edit_formation/${record.key}`)
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
            title: 'Formation Big Dara',
            beginDate: '02/12/2024',
            endDate: '12/12/2024',
            userName: 'Kodjo kossi',
            status: "comming",
        },

        {
            key: '1',
            title: 'Formation Big Dara',
            beginDate: '02/12/2024',
            endDate: '12/12/2024',
            userName: 'Kodjo kossi',
            status: "comming",
        },



    ];


    return (
        <main className="flex flex-col gap-5">
            {/** head */}
            <div className="flex justify-between content-between w-full items-center">
                <div>
                    <h1 className="md:text-3xl text-xl font-bold">Liste des formations (0)</h1>
                    <p className="text-gray-600 text-[13px] ">Employees mangement</p>
                </div>

                <Button
                    size={"sm"}
                    className="bg-blue-600 flex space-x-2"
                    onClick={() => {
                        router.push('/add_formation')
                    }}
                >
                    <h1>Ajouté une formation</h1>
                    <UserPlus />

                </Button>
            </div>


            {/** saparator */}
            <Separator className="w-full" />

            {/** searche input */}
            <div className="flex items-center justify-center my-5">
                <div className="flex space-x-3 items-center">
                    <Input className="md:w-[300px] w-[250px] " placeholder="Trouver une formation" />
                    <Search className="text-blue-600" />
                </div>

            </div>

            {/** Tables */}
            <div className="flex flex-col space-y-3 ">

                <Table id="table" columns={columns} dataSource={data} />
            </div>
        </main>
    );
}