import { Button } from '@/components/ui/button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrain, faTrainSubway } from '@fortawesome/free-solid-svg-icons'
import { linesToSollentuna } from '@/api/PublicTransport/constants'
import { usePublicTransportApi } from '@/api/PublicTransport/usePublicTransportApi'
import { DepartureTable } from './DepartureTable/DepartureTable'
import { PublicTransportationCard } from './PublicTransportCard/PublicTransportCard'
import React from 'react'
import { Badge } from '../ui/badge'
//import { Card, CardFooter } from '../ui/card'

export const PublicTransportWidget = () => {
  const { trains, metros, refetchMetros, refetchTrains } = usePublicTransportApi()

  return (
    <div className="grid grid-cols-1 grid-rows-2 row-span-2 sm:row-span-1 sm:grid-rows-1 sm:grid-cols-2 gap-4 ">
      <PublicTransportationCard key="train-card">
        <PublicTransportationCard.Header
          isLoading={trains.isLoading}
          lastUpdated={new Date(trains?.data?.ResponseData?.LatestUpdate ?? '')}
          refetchButton={
            <Button
            style={{height: '3rem'}}
              className="pt-2 active:bg-white active:text-black dark:hover:bg-stone-800 hover:bg-stone-800 dark:active:bg-white dark:active:text-black mr-2 my-auto py-3 px-3 border-b-8 dark:bg-black dark:text-white dark:boarder-[##8b2d5a] border-[#cd407f] w-full flex justify-between"
              onClick={refetchTrains}
            >
              <div>
                <FontAwesomeIcon className="mr-3" icon={faTrain} />
                Odenplan
              </div>
              <Badge className='text-white bg-stone-600'>
                updated:{' '}
                {new Date(
                  trains?.data?.ResponseData?.LatestUpdate ?? ''
                ).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
              </Badge>
            </Button>
          }
        />
        <PublicTransportationCard.Content>
          <DepartureTable
            data={trains?.data?.ResponseData?.Trains?.filter(
              (train) =>
                train.JourneyDirection === 2 &&
                linesToSollentuna.includes(train.LineNumber)
            )}
          />
        </PublicTransportationCard.Content>
      </PublicTransportationCard>
      <PublicTransportationCard key="metro-card">
        <PublicTransportationCard.Header
          isLoading={metros?.isLoading}
          lastUpdated={new Date(metros?.data?.ResponseData?.LatestUpdate ?? '')}
          refetchButton={
            <Button
            style={{height: '3rem'}}
              className="mr-2  my-auto px-3 dark:hover:bg-stone-800 hover:bg-stone-800 border-b-8 border-[#168541] dark:boarder-[#0f5a2c] dark:active:bg-white dark:active:text-black active:bg-white active:text-black dark:bg-black  dark:text-white w-full flex justify-between shadow-lg"
              onClick={refetchMetros}
            >
              <div>
                <FontAwesomeIcon className="mr-3" icon={faTrainSubway} />
                Abrahamsberg
              </div>

              <Badge className=' bg-stone-700 text-white'>
                updated:{' '}
                {new Date(
                  metros?.data?.ResponseData?.LatestUpdate ?? ''
                ).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
              </Badge>
            </Button>
          }
        />
        <PublicTransportationCard.Content>
          <DepartureTable
            data={metros?.data?.ResponseData?.Metros?.filter(
              (metro) => metro.JourneyDirection === 2
            )}
          />
        </PublicTransportationCard.Content>
      </PublicTransportationCard>
    </div>
  )
}
