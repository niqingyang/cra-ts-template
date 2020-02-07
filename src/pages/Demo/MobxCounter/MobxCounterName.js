import React from 'react';
import {observer} from "mobx-react";
import useMobxCount from '@/models/demo/MobxCount';
import {defineMessages, FormattedMessage} from "react-intl";
import messages from "@/pages/Demo/MobxCounter/messages";

let num = 0;

function MobxCounterName(props) {

    const {name, setName} = useMobxCount.useContainer();

    num += 1;

    messages.nameTitle.values = {name, num};

    return (
        <div>
            <FormattedMessage {...messages.nameTitle}/>
            <button onClick={() => setName(num)}>
                setName
            </button>
        </div>
    )
}

export default observer(MobxCounterName);
