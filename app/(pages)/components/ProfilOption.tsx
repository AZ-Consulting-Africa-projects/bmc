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
import { User } from "lucide-react"


const ProfilOption = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex space-x-1 border items-center rounded-2xl px-2 p-1">

                <div className="border-4 flex items-center justify-center h-[30px] w-[30px] rounded-full p-1 border-blue-600 ">
                    <User />
                </div>
                <h1 className="text-gray-600 font-bold text-[13px] ">
                    nom prenom
                </h1>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="text-center">Mon compte</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex justify-center">
                    <Button size="sm" type="button" variant={"outline"} className="w-full">
                        Profile
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex justify-center">
                    <Button size="sm" type="button" variant={"destructive"} className="w-full">
                        se Deconnecter
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

    );

}
export default ProfilOption;