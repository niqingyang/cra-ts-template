import {useLocalStore} from "mobx-react";
import {createContainer} from "unstated-next"

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
    unreadCount?: number;
}

export interface UserModelState {
    currentUser?: CurrentUser;
}

export interface UserModelType extends UserModelState {
    fetch: () => void;
    fetchCurrent: () => void;
    saveCurrentUser: () => void;
    changeNotifyCount: () => void;
}

const useUser = () => {
    const store = useLocalStore<UserModelType>(() => {
        return {
            currentUser: {},
            fetch: () => {

            },
            fetchCurrent: () => {

            },
            saveCurrentUser: () => {

            },
            changeNotifyCount: () => {

            }
        }
    });
    return store;
}

export default createContainer(useUser);
