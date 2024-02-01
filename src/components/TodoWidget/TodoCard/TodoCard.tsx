import { useGraphClient } from '@/api/MicrosoftGraph/GraphClientContext'
import { TodoItem } from '@/api/MicrosoftGraph/types'
import { useMicrosoftGraphApi } from '@/api/MicrosoftGraph/useMicrosoftGraphApi'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2 } from "lucide-react"
import React from 'react'
import { ReactNode, useState } from 'react'

interface TodoCardProps {
  children?: ReactNode
}

export const TodoCard = ({ children }: TodoCardProps) => {
  return <Card className="drop-shadow-lg overflow-y-auto dark:bg-stone-700">{children}</Card>
}
interface HeaderProps {
  text: string
  button?: ReactNode
  isLoading: boolean
  refetch: () => void
}
TodoCard.Header = ({ text, button, isLoading, refetch }: HeaderProps) => {
  return (
    <CardHeader>
      <CardTitle className="text-xl flex">
        <Button
          style={{ height: '3rem' }}
          className='mr-2  my-auto w-full dark:hover:bg-stone-800 hover:bg-stone-800 border-b-8 dark:active:bg-white dark:active:text-black active:bg-white active:text-black dark:bg-black  dark:text-white flex justify-between shadow-lg'
          onClick={refetch}>{isLoading ? <Loader2 className="animate-spin" size={24} /> : text}
        </Button>
      </CardTitle>
      {button}
    </CardHeader>
  )
}

interface ContentProps {
  children?: ReactNode
}
TodoCard.Content = ({ children }: ContentProps) => {
  return <CardContent>{children}</CardContent>
}

interface ItemProps {
  todo: TodoItem
}
export const TodoCardItem = ({ todo }: ItemProps) => {
  const [status, setStatus] = useState<boolean>(todo.status === 'completed')
  const { graphClient } = useGraphClient()
  const { completeTask } = useMicrosoftGraphApi(graphClient)
  const handleTask = () => {
    setStatus(!status)
    setTimeout(() => {
      completeTask(todo.id, todo.status === 'completed' ? 'notStarted' : 'completed')
    }, 100)
  }
  return (
    <div
      onClick={handleTask}
      className="flex justify-between p-4 mb-2 border rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800  dark:bg-stone-950 cursor-pointer"
    >
      <RadioGroup defaultValue="comfortable">
        <div className="flex items-center space-x-4">
          <RadioGroupItem checked={status} value="default" id={`todo-item-${todo.id}`} />
          <Label className={`${todo.status === 'completed' ? 'line-through' : ''}`} htmlFor={`todo-item-${todo.id}`}>{todo.title}</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
