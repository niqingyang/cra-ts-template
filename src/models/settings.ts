import React from 'react';
import {useLocalStore} from "mobx-react";
import {createContainer} from "unstated-next";
import defaultSettings, {DefaultSettings} from '@/config/default.settings';

export interface SettingModelType {
    state: DefaultSettings;
    changeSetting: (settings: DefaultSettings) => void;
}

const useSetting = () => {
    const store = useLocalStore<SettingModelType>(() => {
        return {
            state: defaultSettings,
            changeSetting: (settings: DefaultSettings) => {
                store.state = {
                    ...store.state,
                    ...settings
                }
            }
        }
    });
    return store;
}

export default createContainer(useSetting);
