import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import React from 'react'

interface PublicTransportationCardProps {
  children?: React.ReactNode
}

export const PublicTransportationCard = ({ children }: PublicTransportationCardProps) => {
  return <Card className="drop-shadow-lg  dark:bg-stone-700">{children}</Card>
}

interface HeaderProps {
  text?: string
  lastUpdated?: Date | undefined
  isLoading: boolean
  refetchButton?: React.ReactNode
}
PublicTransportationCard.Header = (props: HeaderProps) => {
  return (
    <CardHeader className='pt-2 pb-2' data-testid="public-transportation-card-header">
      <CardTitle className='py-0'>
        {props.refetchButton}
      </CardTitle>
    </CardHeader>
  )
}

interface ContentProps {
  children?: React.ReactNode
}
PublicTransportationCard.Content = (props: ContentProps) => {
  return <CardContent>{props.children}</CardContent>
}

