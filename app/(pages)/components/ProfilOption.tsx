"use client"

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logOut } from "@/redux/features/auth-slice";
import { RootState } from "@/redux/store";
import { User } from "lucide-react"
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

const ProfilOption = () => {
    const userName = useSelector((state: RootState) => state.auth.value.name)
    const router = useRouter();
    const dispatch = useDispatch();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex space-x-1 border items-center rounded-2xl px-2 p-1">

                <div className="border-4 flex items-center justify-center h-[30px] w-[30px] rounded-full p-1 border-blue-600 ">
                    <User />
                </div>
                <h1 className="text-gray-600 font-bold text-[13px] ">
                    {userName}
                </h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="text-center">Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-center">
                    <Button 
                    onClick={() => {
                        router.push('/profil');
                    }}
                    size="sm" 
                    type="button" 
                    variant={"outline"} 
                    className="w-full">
                        Profile
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-center">
                    <Button
                    onClick={() => {
                        dispatch(logOut());
                        router.push('/login');
                    }}
                     size="sm" type="button" variant={"destructive"} className="w-full">
                        se Deconnecter
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );

}
export default ProfilOption;