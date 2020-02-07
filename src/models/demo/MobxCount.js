import {useLocalStore} from "mobx-react";
import {createContainer} from "unstated-next"

const useMobxCount = function () {

    const store = useLocalStore(() => ({
        name: 0,
        count: 0,
        increment: () => {
            store.count += 1;
        },
        decrement: () => {
            store.count -= 1;
        },
        setName: (num) => {
            store.name = num;
        }
    }));

    return store;
}

export default createContainer(useMobxCount);

export {useMobxCount};
