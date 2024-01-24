export type TransportDataObject = {
    isLoading:  boolean,
    isError:  boolean,
    error:  Error | null,
    response: DeparturesResponse | undefined,
}

export type  UseQueryResult<TData, TError> = {
    isLoading: boolean;
    isError: boolean;
    error: TError;
    data: TData;
  }

export type DeparturesResponse = {
    StatusCode: number
    Message: string
    ExecutionTime: number
    ResponseData: Departure
  }
  
  export type Departure = {
    LatestUpdate: string
    DataAge: number
    Buses: Transport[]
    Metros: Transport[]
    Trains: Transport[]
    trams: Transport[]
    Ships: Transport[]
    StopPointDeviations: StopPointDeviation[]
  }
  
  export interface Transport {
    TransportMode: TransportMode
    LineNumber: string
    Destination: string
    JourneyDirection: number
    GroupOfLine: string
    StopAreaName: string
    StopAreaNumber: number
    StopPointNumber: number
    StopPointDesignation: string
    TimeTabledDateTime: string
    ExpectedDateTime: string
    DisplayTime: string
    JourneyNumber: number
    Deviations: Deviation[]
    SecondaryDestinationName?: string
    PredictionState: PredictionState
  }
  export type PredictionState = 'UNKNOWN' | 'NORMAL' | 'UNRELIABLE'
  
  export type TransportMode = 'BUS' | 'METRO' | 'TRAIN' | 'TRAM' | 'SHIP'
  
  export type Deviation = {
    Consequence: string
    ImportanceLevel: number
    Text: string
  }
  
  export type StopInfo = {
    GroupOfline: string
    StopAreaName: string
    StopAreaNumber: number
    TransportMode: TransportMode
  }
  
  export type StopPointDeviation = {
    StopInfo?: StopInfo
    Deviation?: Deviation
  }
  