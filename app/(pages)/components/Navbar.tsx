"use client"

import NavbarSm from "./NavbarSm";
import ProfilOption from "./ProfilOption";
import { Badge } from 'antd';
import {Bell} from "lucide-react";
import { AudioOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import type { SearchProps } from 'antd/es/input/Search';


const Navbar = () => {

    const { Search } = Input;
    const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
    return (
        <div className="flex p-3 md:pr-10 shadow-md  items-center justify-between content-between ">
            <div className="md:ml-[250px] hidden md:flex">
                <Search placeholder="input search text" onSearch={onSearch} enterButton />
            </div>
            
            <div className="flex ">
                <div className="flex md:hidden ">
                    <NavbarSm />
                </div>
            </div>

            

            <div className="flex space-x-10 items-center ">
                {/** notification */}
                <Badge count={0} showZero>
                    <Bell />
                </Badge>
                <ProfilOption />
            </div>
        </div>
    );
}
export default Navbar;