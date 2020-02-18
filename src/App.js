import React from 'react';
import {observer} from "mobx-react";
import {Compose} from 'provider-compose';
import {PageLoading} from '@ant-design/pro-layout';
import {IntlProvider} from 'react-intl';
import AppRouter from "@/AppRouter";
import * as containers from '@/models';
import {providers} from '@/utils';

import routes from '@/config/default.routes';
import Locale from '@/models/locale';

import './App.less';

const App = observer((props) => {

    const {locale, messages} = Locale.useContainer();

    return (
        <IntlProvider locale={locale} messages={messages}>
            <AppRouter {...{routes, defaultLoadingComponent: PageLoading}}/>
        </IntlProvider>
    );
})

export default () => (
    <Locale.Provider>
        <App/>
    </Locale.Provider>
);
