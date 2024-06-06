"use client"

import NavbarSm from "./NavbarSm";
import ProfilOption from "./ProfilOption";
import { Badge } from 'antd';
import {Bell} from "lucide-react";


const Navbar = () => {
    return (
        <div className="flex p-3 md:pr-10 shadow-md  items-center justify-between content-between ">
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