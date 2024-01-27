import { useGraphClient } from "@/api/MicrosoftGraph/GraphClientContext";
import { loginRequest } from "@/api/MicrosoftGraph/authConfig";
import { useMicrosoftGraphApi } from "@/api/MicrosoftGraph/useMicrosoftGraphApi";
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Button } from "../ui/button";
import { TodoCard, TodoCardItem } from "./TodoCard/TodoCard";
import React from "react";


export const TodoWidget = () => {
    const { graphClient } = useGraphClient();
    const isAuthenticated = useIsAuthenticated();
    const { todos } = useMicrosoftGraphApi(graphClient);

    if (todos.isError) {
        const error = todos?.error
        return (<div>{error.message}</div>)
    }
    return (
        <TodoCard>
            <TodoCard.Header text="Todos" isLoading={todos.isLoading} button={!isAuthenticated && <SignInButton />} />
            <TodoCard.Content>
                <div>
                    {todos.data?.filter(todo => todo.status !== 'completed').length === 0 && <div>No todos</div>}
                    {todos.data && todos.data?.filter(todo => todo.status !== 'completed').map((todo) => (
                        <TodoCardItem key={todo.id} todo={todo} />
                    ))}
                </div>
            </TodoCard.Content>
        </TodoCard>
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

