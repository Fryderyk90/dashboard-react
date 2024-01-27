import { Button } from '@/components/ui/button'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrain, faTrainSubway } from '@fortawesome/free-solid-svg-icons'
import { linesToSollentuna } from '@/api/PublicTransport/constants'
import { usePublicTransportApi } from '@/api/PublicTransport/usePublicTransportApi'
import { DepartureTable } from './DepartureTable/DepartureTable'
import { PublicTransportationCard } from './PublicTransportCard/PublicTransportCard'
import React from 'react'
//import { Card, CardFooter } from '../ui/card'

export const PublicTransportWidget = () => {
  const { trains, metros, refetchMetros, refetchTrains } = usePublicTransportApi()

  return (
    <div className="grid grid-cols-2 gap-4">
      <PublicTransportationCard key="train-card">
        <PublicTransportationCard.Header
          isLoading={trains.isLoading}
          lastUpdated={new Date(trains?.data?.ResponseData?.LatestUpdate ?? '')}
          refetchButton={
            <Button
              className="active:bg-white active:text-black mr-2 my-auto px-3 border-b-8 border-[#cd407f] w-full flex justify-start"
              onClick={refetchTrains}
            >
              <FontAwesomeIcon className="mr-3" icon={faTrain} /> Odenplan
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
              className="mr-2 my-auto px-3 border-b-8 border-[#168541] active:bg-white active:text-black w-full flex justify-start shadow-lg"
              onClick={refetchMetros}
            >
              <FontAwesomeIcon className="mr-3" icon={faTrainSubway} /> Abrahamsberg
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
