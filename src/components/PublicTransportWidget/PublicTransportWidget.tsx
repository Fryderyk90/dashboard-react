
import { Button } from "@/components/ui/button"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrain, faTrainSubway } from "@fortawesome/free-solid-svg-icons"
import { linesToSollentuna } from "@/api/PublicTransport/constants"
import { usePublicTransportApi } from "@/api/PublicTransport/usePublicTransportApi"
import { DepartureTable } from "./DepartureTable/DepartureTable"
import { PublicTransportationCard } from "./PublicTransportCard/PublicTransportCard"

export const PublicTransportWidget = () => {
    const { trains, metros, refetchMetros, refetchTrains } = usePublicTransportApi()

    return (
        <div className='grid grid-cols-2 gap-4 border-red-300'>
            <PublicTransportationCard key='train-card'>
                <PublicTransportationCard.Header
                    text={'Odenplan'}
                    isLoading={trains.isLoading}
                    lastUpdated={new Date(trains?.data?.ResponseData?.LatestUpdate ?? '')}
                    refetchButton={
                        <Button className="mr-2 my-auto px-3 border-b-8 border-[#cd407f]" onClick={refetchTrains}>
                            <FontAwesomeIcon className="my-auto" icon={faTrain} />
                        </Button>}
                />
                <PublicTransportationCard.Content>
                    <DepartureTable data={trains?.data?.ResponseData?.Trains?.filter(train => train.JourneyDirection === 2 && linesToSollentuna.includes(train.LineNumber))} />
                </PublicTransportationCard.Content>
            </PublicTransportationCard>
            <PublicTransportationCard key='metro-card'>
                <PublicTransportationCard.Header
                    text={'Abrahamsberg'}
                    isLoading={metros?.isLoading}
                    lastUpdated={new Date(metros?.data?.ResponseData?.LatestUpdate ?? '')}
                    refetchButton={
                        <Button className="mr-2 my-auto px-3 border-b-8 border-[#168541]" onClick={refetchMetros}>
                            <FontAwesomeIcon className="my-auto" icon={faTrainSubway} />
                        </Button>
                    }
                />
                <PublicTransportationCard.Content >
                    <DepartureTable data={metros?.data?.ResponseData?.Metros?.filter(metro => metro.JourneyDirection === 2)} />
                </PublicTransportationCard.Content>
            </PublicTransportationCard>
        </div>
    )





}




