import React from 'react';
import {observer} from "mobx-react";
import Count from './models';

let num = 0;

function CounterName(props) {

    const {name, setName} = Count.useContainer();

    num += 1;

    return (
        <div>
            Name: {name}, render times {num} &nbsp;
            <button onClick={() => setName(num)}>
                setName
            </button>
        </div>
    )
}

export default observer(CounterName);
