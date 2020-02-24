import {useLocalStore} from "mobx-react";
import {createContainer} from "unstated-next"
import {queryCurrent, queryUsers} from "@/services/user";

export interface CurrentUser {
    avatar?: string;
    name?: string;
    title?: string;
    group?: string;
    signature?: string;
    tags?: {
        key: string;
        label: string;
    }[];
    userId?: string;
    totalCount?: number;
    unreadCount?: number;
}

export interface UserStateType {
    currentUser?: CurrentUser;
}

export interface UserType extends UserStateType {
    users?: UserStateType[],
    fetch: () => void;
    fetchCurrent: () => void;
    saveCurrentUser: (currentUser: CurrentUser) => void;
    changeNotifyCount: (payload: {totalCount: number, unreadCount: number}) => void;
}

const useUser = () => {
    const store = useLocalStore<UserType>(() => {
        return {
            currentUser: {},
            fetch: async () => {
                const response = await queryUsers();
                store.users = response.data;
            },
            fetchCurrent: async () => {
                const response = await queryCurrent();
                store.saveCurrentUser(response.data);
            },
            saveCurrentUser: (currentUser) => {
                store.currentUser = {
                    ...store.currentUser,
                    ...currentUser
                }
            },
            changeNotifyCount: ({totalCount, unreadCount}) => {
                store.currentUser = {
                    ...store.currentUser,
                    totalCount,
                    unreadCount
                }
            }
        }
    });
    return store;
}

export default createContainer(useUser);
