"use client"
import Link from "next/link"
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { User, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const treeData: TreeDataNode[] = [
    {
        title: 'RH',
        key: '0-0',
        children: [
            {
                title: 'Employées',
                key: '0-0-0',
            },
            {
                title: 'Visiteurs',
                key: '0-0-1',
                
            },
            {
                title: 'Recrutements',
                key: '0-0-2',
                
            },
            {
                title: 'Formations',
                key: '0-0-3',
                
            },
            {
                title: 'Presences',
                key: '0-0-4',
                
            },
        ],
    },
];



const SidbarContent = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };
    return (
        <div className="w-full flex flex-col space-y-10 ">
            <h1 className="text-3xl font-bold text-center md:mt-10 ">Logo</h1>
            <div className="flex h-screen flex-col justify-between content-between">
                {/** links */}
                <div className="flex flex-col gap-5">
                    <Link href="" className="flex space-x-3" >
                        <LayoutDashboard className={pathname == "/dashboard" ? "text-blue-600" : ""}/>
                        <h1 className={pathname == "/dashboard" ? "font-bold" : ""}>Dashboard</h1>
                    </Link>
                    

                    <div className="flex space-x-3 " >
                    <User className=""/>
                    <Tree
                        showLine
                        switcherIcon={<DownOutlined />}
                        onSelect={onSelect}
                        treeData={treeData}
                    />
                    </div>
                    
                </div>


                {/** frams */}
                <div className="flex flex-col gap-5">
                    <Link href="" className="flex space-x-3" >
                        <h1>Parametre</h1>
                    </Link>

                    <Link href="" className="flex space-x-3" >
                        <h1>Suport d'aide</h1>
                    </Link>
                    
                </div>
            </div>

        </div>


    );
}

export default SidbarContent;