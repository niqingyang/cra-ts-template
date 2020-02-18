import React from 'react';
import Counter from './Counter';
import CounterName from './CounterName';

let num = 0;

function Index(props) {

    num += 1;

    return (
        <div>
            <div>Counter 第 {num} 次渲染</div>
            <CounterName/>
            <Counter/>
            <Counter/>
        </div>
    );
}

export default Index;
