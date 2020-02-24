import {useLocalStore} from "mobx-react";
import {createContainer} from "unstated-next";
import {navigate} from "@reach/router";
import {fakeAccountLogin, LoginParamsType} from "@/services/login";
import {getPageQuery} from '@/utils/utils';
import {setAuthority} from '@/utils/authority';
import {useState} from "react";
import {stringify} from "querystring";

export interface LoginStateType {
    status?: 'ok' | 'error';
    type?: string;
    currentAuthority?: string;
}

export interface LoginType {
    state: LoginStateType;
    login: (payload: LoginParamsType & { type: string }) => Promise<any>;
    getCaptcha: () => void;
    logout: () => void;
    changeLoginStatus: (payload: {currentAuthority: string, status: 'ok' | 'error', type: string}) => void;
}

const useLogin = () => {

    const store = useLocalStore<LoginType>(() => {
        return {
            state: {
                status: undefined
            },
            login: async (payload) => {

                const response = await fakeAccountLogin(payload);

                // Login successfully
                if (response.data.status === 'ok') {
                    const urlParams = new URL(window.location.href);
                    const params = getPageQuery();
                    let {redirect} = params as { redirect: string };
                    if (redirect) {
                        const redirectUrlParams = new URL(redirect);
                        if (redirectUrlParams.origin === urlParams.origin) {
                            redirect = redirect.substr(urlParams.origin.length);
                            if (redirect.match(/^\/.*#/)) {
                                redirect = redirect.substr(redirect.indexOf('#') + 1);
                            }
                        } else {
                            window.location.href = '/';
                            return;
                        }
                    }
                    navigate(redirect || '/', {
                        replace: true
                    });
                }

            },
            getCaptcha: () => {

            },
            logout: () => {
                const { redirect } = getPageQuery();
                // Note: There may be security issues, please note
                if (window.location.pathname !== '/user/login' && !redirect) {
                    navigate('/user/login', {
                        replace: true,
                        state: {
                            search: stringify({
                                redirect: window.location.href,
                            })
                        }
                    });
                }
            },
            changeLoginStatus: ({currentAuthority, status, type}) => {
                setAuthority(currentAuthority);
                store.state = {
                    ...store.state,
                    currentAuthority,
                    status,
                    type
                }
            },
        }
    })
    return store;
}

export default createContainer(useLogin);
