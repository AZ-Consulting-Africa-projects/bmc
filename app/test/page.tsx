
"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export default function Test() {
    return (
        <div className="flex flex-col items-center justify-center">
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>RH</AccordionTrigger>
                    <AccordionContent>
                        <h1>Employer</h1>
                        <h1>Employer</h1>
                        <h1>Employer</h1>
                        <h1>Employer</h1>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}