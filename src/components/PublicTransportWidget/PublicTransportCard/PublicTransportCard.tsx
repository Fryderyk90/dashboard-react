import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
// import { BounceLoader } from "react-spinners";


interface PublicTransportationCardProps {
    children?: React.ReactNode;
}

export const PublicTransportationCard = ({ children }: PublicTransportationCardProps) => {
    return (
        <Card className="drop-shadow-lg overflow-y-auto max-h-[31rem]">
            {children}
        </Card>
    )
};

interface HeaderProps { text?: string, lastUpdated?: Date | undefined, isLoading: boolean, refetchButton?: React.ReactNode }
PublicTransportationCard.Header = (props: HeaderProps) => {
    return (
        <CardHeader data-testid="public-transportation-card-header">
            <CardTitle >                
                    {props.refetchButton}
                {/* {props.lastUpdated &&
                    <span className="my-auto mr-2 text-sm">
                        Last updated: {props.lastUpdated.toLocaleTimeString(undefined,{ hour: '2-digit', minute: '2-digit' })}
                    </span>}
                <BounceLoader className="my-auto" data-testid="public-transportation-card-spinner" loading={props.isLoading} speedMultiplier={0.5} size={20} color="black" /> */}
            </CardTitle>
        </CardHeader>)
};

interface ContentProps {
    children?: React.ReactNode;
}
PublicTransportationCard.Content = (props: ContentProps) => {
    return (
        <CardContent className="py-2">
            {props.children}
        </CardContent>
    )
};