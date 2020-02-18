import React from 'react';
import {observer} from "mobx-react";
import {FormattedMessage} from "react-intl";
import Count from './models';
import messages from "@/pages/Demo/MobxCounter/messages";

let num = 0;

function MobxCounter(props) {

    const store = Count.useContainer();

    num += 1;

    return (
        <div>
            <FormattedMessage {...messages.title} values={{count: store.count, num}}/>
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
