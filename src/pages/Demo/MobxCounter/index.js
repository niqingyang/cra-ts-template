import React from 'react';
import Counter from './MobxCounter';
import CounterName from './MobxCounterName';

let num = 0;

function Index(props) {

    num += 1;

    return (
        <div>
            <div>Mobx Counter 第 {num} 次渲染</div>
            <CounterName/>
            <Counter/>
            <Counter/>
        </div>
    );
}

export default Index;
