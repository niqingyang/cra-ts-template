import React, {useContext, useState} from 'react';
import {observer} from "mobx-react";
import {useIntl, defineMessages, FormattedMessage} from "react-intl";
import useMobxCount from '@/models/demo/MobxCount';
import messages from "@/pages/Demo/MobxCounter/messages";

let num = 0;


function MobxCounter(props) {

    const store = useMobxCount.useContainer();

    num += 1;

    messages.title.values = {count: store.count, num};

    return (
        <div>
            <FormattedMessage {...messages.title}/>
            {' '}
            <button onClick={store.increment}>
                +
            </button>
            {' '}
            <button onClick={store.decrement}>
                -
            </button>
        </div>
    )
}

export default observer(MobxCounter);
