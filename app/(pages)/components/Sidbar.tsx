"use client"

import SidbarContent from "./SidbarContent";

const Sidbar = ()  => {
    return (
        <div className="hidden md:flex bg-gray-50 shadow-md top-0 fixed left-0 p-5 h-screen  w-[250px]">
            <SidbarContent/>
        </div>
    );
}
export default Sidbar;