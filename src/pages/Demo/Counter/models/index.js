import React, {useState} from "react"
import {createContainer} from "unstated-next"

function useCount(initialState = 0) {
    const [count, setCount] = useState(initialState);
    const [name, setName] = useState(initialState);
    const decrement = () => setCount(count - 1);
    const increment = () => setCount(count + 1);
    return {count, name, decrement, increment, setName}
}

const Count = createContainer(useCount);

export default Count;


