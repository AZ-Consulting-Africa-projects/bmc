"use client"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"
import SidbarContent from "./SidbarContent";

const NavbarSm = () => {
    return (
        <Sheet >
            <SheetTrigger>
                <AlignJustify />

            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                    <SheetDescription>

                    </SheetDescription>
                </SheetHeader>
                <div className="">
                    <SidbarContent />
                </div>
            </SheetContent>
        </Sheet>

    );
}

export default NavbarSm;