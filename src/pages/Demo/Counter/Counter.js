import React from 'react';
import Count from './models';

let num = 0;

function Counter(props) {

    const store = Count.useContainer();

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
        </div>
    )
}

export default Counter;
