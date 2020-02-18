import React from 'react';
import {observer} from "mobx-react";
import Count from '@/pages/Demo/MobxCounter/models';
import Tips from './models/tips';

let num = 0;

const Test = observer((props) => {

    const store = Count.useContainer();

    const tips = Tips.useContainer();

    num += 1;

    return (
        <div>
            Clicked: {store.count} times, render {num} times
            {' '}
            <button onClick={store.increment}>
                +
            </button>
            {' '}
            <button onClick={store.decrement}>
                -
            </button>
            <div>Tips: {tips.content}</div>
            <div>
                <input onChange={(e) => tips.setContent(e.target.value)}/>
            </div>

        </div>
    )
})

export default Test;
