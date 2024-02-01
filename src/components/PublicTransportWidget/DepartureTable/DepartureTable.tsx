
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { Transport } from "@/api/PublicTransport/types";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@radix-ui/react-accordion';


interface DepartureTableProps {
    data: Transport[];
}

export const DepartureTable = ({ data }: DepartureTableProps) => {
    const hasCancelledDepartures = data?.some(departure => departure?.Deviations?.some(deviation => deviation?.Consequence === "CANCELLED"))
    return (
        <Table className="dark:bg-stone-950">
            <TableHeader>
                <TableRow >
                    <TableHead>Line</TableHead>
                    <TableHead>Departure</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Time</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data?.map((departure, i) => (
                    <React.Fragment key={`departure-${departure?.StopAreaName}-${i}`}>
                        <TableRow className={`${departure?.Deviations?.length > 0 && 'border-b-0'} ${hasCancelledDepartures && 'bg-red-200'}`}>
                            <TableCell className="font-medium">{departure?.LineNumber}</TableCell>
                            <TableCell>{departure?.DisplayTime}</TableCell>
                            <TableCell>{departure?.Destination}</TableCell>
                            <TableCell>{new Date(departure?.ExpectedDateTime ?? ''
                            ).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</TableCell>
                        </TableRow>
                        {departure?.Deviations?.map((deviation, j) => (
                            <TableRow key={`${deviation.Consequence}-${j}`} className={`border-t-0 ${hasCancelledDepartures && 'bg-red-200'}`}>
                                <TableCell className="py-1" colSpan={3}>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem className="my-1 border-b-0" value={`${deviation.Consequence}-j`}>
                                            <AccordionTrigger className="font-medium py-1">
                                                <div>
                                                    <FontAwesomeIcon className="mr-2 my-auto" color={hasCancelledDepartures ? 'red' : 'blue'} icon={hasCancelledDepartures ? faWarning : faInfoCircle} />
                                                    <span>
                                                        {deviation?.Consequence}
                                                    </span>

                                                </div>
                                            </AccordionTrigger>
                                            <AccordionContent className={`font-medium  text-pretty py-2 ${hasCancelledDepartures ? 'text-red-500' : 'text-blue-500'}`}>{deviation?.Text}</AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </TableCell>
                            </TableRow>
                        ))}
                    </React.Fragment>
                ))}
            </TableBody>
        </Table>
    );
};