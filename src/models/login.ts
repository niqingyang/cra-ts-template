import {useLocalStore} from "mobx-react";
import {createContainer} from "unstated-next";

export interface LoginModelState {
    status?: 'ok' | 'error';
    type?: string;
    currentAuthority?: 'user' | 'guest' | 'admin';
}

export interface LoginModelType {
    state: LoginModelState;
    login: () => void;
    getCaptcha: () => void;
    logout: () => void;
    changeLoginStatus: () => void;
}

const useLogin = () => {
    const store = useLocalStore<LoginModelType>(() => {
        return {
            state: {
                status: undefined
            },
            login: () => {

            },
            getCaptcha: () => {

            },
            logout: () => {

            },
            changeLoginStatus: () => {

            },
        }
    })
    return store;
}

export default createContainer(useLogin);
