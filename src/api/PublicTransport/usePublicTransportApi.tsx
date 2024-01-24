import { useQuery,useQueryClient } from "@tanstack/react-query";
import { getMetroInformation, getTrainInformation } from "./constants";
import { DeparturesResponse, UseQueryResult } from "./types";



export const usePublicTransportApi = () => {
    const trains = useQuery<DeparturesResponse, Error>({
        queryKey: ['trainData'],
        queryFn: () => fetchTransportData(getTrainInformation),
        staleTime: 540000
    }) as UseQueryResult<DeparturesResponse, Error>;

    const metros = useQuery<DeparturesResponse, Error>({
        queryKey: ['metroData'],
        queryFn: () => fetchTransportData(getMetroInformation),
        staleTime: 540000
    }) as UseQueryResult<DeparturesResponse, Error>;

    const queryClient = useQueryClient()
    const refetchMetros = () => queryClient.invalidateQueries({ queryKey: ['metroData'] });
    const refetchTrains = () => queryClient.invalidateQueries({ queryKey: ['trainData'] });


    return { trains, metros,refetchMetros,refetchTrains };
}


const fetchTransportData = async (request: string): Promise<DeparturesResponse> => {
    try {
        // fetch request
        const response = await fetch(request);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseText = await (response.json() as Promise<DeparturesResponse>);
        console.log('Response text:', responseText);

        return responseText;
    } catch (error) {
        console.error('Failed to fetch:', error);
        throw error;
    }
};