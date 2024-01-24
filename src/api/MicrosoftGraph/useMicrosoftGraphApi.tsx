import { graphConfig, listId, msalConfig } from "./authConfig";
import { Client } from "@microsoft/microsoft-graph-client";
import { UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query";
import { useIsAuthenticated } from "@azure/msal-react";
import { TodoItem } from "./types";




export const useMicrosoftGraphApi = (graphClient: Client | undefined) => {
  const queryClient = useQueryClient();
  const isAuthenticated = useIsAuthenticated();
  const todos = useQuery<TodoItem[] | undefined, Error>({
    queryKey: ['todoData'],
    queryFn: () => {
      if (graphClient) { // Your authentication check here
        return fetchTasks();
      }
    },
    enabled: isAuthenticated && !!graphClient,
    staleTime: 540000,
  }) as UseQueryResult<TodoItem[], Error>;


  const fetchTasks = async () => {

    try {
      const taskResponse = await graphClient?.api(graphConfig.graphToDoEndpoint).get();
      console.log('Tasks:', taskResponse);
      return taskResponse?.value || []; // Return taskResponse.value or an empty array if it's undefined
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }

  };

  const completeTask = async (taskId: string) => {
    if (graphClient) {

      try {
        const endPoint = `/me/todo/lists/${listId}/tasks/${taskId}`

        const taskResponse = await graphClient?.api(endPoint).patch({ status: 'completed' });
        if (taskResponse) {
          queryClient.invalidateQueries({ queryKey: ['todoData'] });
          queryClient.refetchQueries({ queryKey: ['todoData'] });
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    }
  };

  const subscribeToToDoNotifications = async () => {
    const subscription = {
      changeType: 'created,updated,deleted',
      notificationUrl: msalConfig.auth.redirectUri,
      resource: '/me/todo/lists/tasks',
      expirationDateTime: new Date(new Date().getTime() + 2592000000).toISOString(), // 30 days
    };

    const result = await graphClient?.api('/subscriptions').post(subscription);
    console.log(result);
  };





  return { todos, completeTask, subscribeToToDoNotifications };
};
