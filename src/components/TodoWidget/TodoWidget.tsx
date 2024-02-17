import { useGraphClient } from "@/api/MicrosoftGraph/GraphClientContext";
import { loginRequest } from "@/api/MicrosoftGraph/authConfig";
import { useMicrosoftGraphApi } from "@/api/MicrosoftGraph/useMicrosoftGraphApi";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button } from "../ui/button";
import { TodoCard, TodoCardItem } from "./TodoCard/TodoCard";
import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";




export const TodoWidget = () => {
    const { graphClient } = useGraphClient();
    const isAuthenticated = useIsAuthenticated();
    const { todos, refetchTodos } = useMicrosoftGraphApi(graphClient);

    const completedTodosCount = todos.data?.filter(todo => todo.status === 'completed').length ?? 0;
    return (
        <div className="p-4">
            <TodoCard>
                <TodoCard.Header text="Todos" refetch={refetchTodos} isLoading={todos.isLoading} button={!isAuthenticated && <SignInButton />} />
                <TodoCard.Content>
                    <div>
                        {todos.data?.filter(todo => todo.status !== 'completed').length === 0 && <div>No todos</div>}
                        {todos.data && todos.data?.filter(todo => todo.status !== 'completed').map((todo) => (
                            <TodoCardItem key={todo.id} todo={todo} />
                        ))}
                    </div>
                    {completedTodosCount > 0 ?
                        <div className=" mt-28">
                            <Accordion type="single" collapsible className="w-full border dark:bg-stone-900 rounded-lg dark:hover:bg-stone-600 hover:bg-stone-100">
                                <AccordionItem className="my-1 border-b-0" value={`${todos.dataUpdatedAt}-j`}>
                                    <AccordionTrigger className="font-medium p-3">
                                        ({completedTodosCount}) Completed
                                    </AccordionTrigger>
                                    <AccordionContent className="p-2">
                                        {
                                            todos.data && todos.data?.filter(todo => todo.status === 'completed').map((todo) => (
                                                <TodoCardItem key={todo.id} todo={todo} />
                                            ))
                                        }
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                        :
                        <span className="">No todos</span>
                    }
                </TodoCard.Content>
            </TodoCard>
        </div>
    )
}

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType: string) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch((e) => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch((e) => {
                console.log(e);
            });
        }
    };

    return (<Button onClick={() => handleLogin('popup')}>Login</Button>)
}

export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType: string) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/",
            });
        } else if (logoutType === "redirect") {
            instance.logoutRedirect({
                postLogoutRedirectUri: "/",
            });
        }
    };

    return (<Button onClick={() => handleLogout('popup')}>Log out</Button>)
}

