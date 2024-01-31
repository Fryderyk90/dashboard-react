import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import React from 'react'
// import { BounceLoader } from "react-spinners";

interface PublicTransportationCardProps {
  children?: React.ReactNode
}

export const PublicTransportationCard = ({ children }: PublicTransportationCardProps) => {
  return <Card className="drop-shadow-lg overflow-y-auto">{children}</Card>
}

interface HeaderProps {
  text?: string
  lastUpdated?: Date | undefined
  isLoading: boolean
  refetchButton?: React.ReactNode
}
PublicTransportationCard.Header = (props: HeaderProps) => {
  return (
    <CardHeader data-testid="public-transportation-card-header">
      <CardTitle>
        {props.refetchButton}
      </CardTitle>
    </CardHeader>
  )
}

interface ContentProps {
  children?: React.ReactNode
}
PublicTransportationCard.Content = (props: ContentProps) => {
  return <CardContent className="py-2">{props.children}</CardContent>
}

interface FooterProps {
  lastUpdated: Date
}
PublicTransportationCard.Footer = ({ lastUpdated }: FooterProps) => {
  return (
    <CardFooter>
      Last updated:{' '}
      {lastUpdated.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
    </CardFooter>
  )
}
