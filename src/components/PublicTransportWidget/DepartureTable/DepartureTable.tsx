import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faWarning } from '@fortawesome/free-solid-svg-icons'
import { Transport } from '@/api/PublicTransport/types'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion'


interface DepartureTableProps {
  data: Transport[]
}

export const DepartureTable = ({ data }: DepartureTableProps) => {
  return (
    <div className="overflow-auto rounded-lg min-h-[12rem] max-h-[12rem] sm:min-h-[43rem] sm:max-h-[43rem]">
      <Table className="dark:bg-stone-950 sticky top-0 z-10">
        <TableHeader className="sticky top-0 z-10">
          <TableRow>
            <TableHead>Line</TableHead>
            <TableHead>Departure</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((departure, i) => {
            const hasCancelledDepartures = departure.Deviations?.some(
              (deviation) => deviation?.Consequence === 'CANCELLED'
            )
            return (
              <React.Fragment key={`departure-${departure?.StopAreaName}-${i}`}>
                <TableRow
                  className={`${departure?.Deviations?.length > 0 && 'border-b-0'} ${
                    ClassesByStatus(departure?.Deviations?.[0]?.Consequence ?? '')
                  }`}
                >
                  <TableCell className="font-medium">{departure?.LineNumber}</TableCell>
                  <TableCell>{departure?.DisplayTime}</TableCell>
                  <TableCell>{departure?.Destination}</TableCell>
                  <TableCell>
                    {new Date(departure?.ExpectedDateTime ?? '').toLocaleTimeString(
                      undefined,
                      { hour: '2-digit', minute: '2-digit' }
                    )}
                  </TableCell>
                </TableRow>
                {departure?.Deviations?.map((deviation, j) => (
                  <TableRow
                    key={`${deviation.Consequence}-${j}`}
                    className={`border-t-0 ${
                      hasCancelledDepartures
                        ? 'dark:bg-red-300 bg-red-200'
                        : 'dark:bg-blue-300 bg-blue-200'
                    }`}
                  >
                    <TableCell className="py-1" colSpan={4}>
                      <Accordion type="single" collapsible className="">
                        <AccordionItem
                          className="my-1 border-b-0"
                          value={`${deviation.Consequence}-j`}
                        >
                          <AccordionTrigger className="font-medium py-1 w-full flex justify-start">
                            <FontAwesomeIcon
                              className={`mr-2 my-auto ${
                                ClassesByStatus(deviation?.Consequence)
                              }`}
                              icon={hasCancelledDepartures ? faWarning : faInfoCircle}
                            />
                            <span className="dark:text-black">
                              {deviation?.Consequence}
                            </span>
                          </AccordionTrigger>
                          <AccordionContent
                            className={`font-medium  text-pretty py-2 ${
                              ClassesByStatus(deviation?.Consequence)
                            }`}
                          >
                            {deviation?.Text}
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

function ClassesByStatus(status:string){
  switch (status) {
    case 'CANCELLED':
      return 'bg-red-400 dark:bg-red-700';
    case 'INFORMATION':
      return 'bg-blue-400 dark:bg-blue-700';
    default:
      return '';
  }
}
