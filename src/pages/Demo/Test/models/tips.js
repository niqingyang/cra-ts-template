import {useLocalStore} from "mobx-react";
import {createContainer} from "unstated-next";

function useTips() {
    const store = useLocalStore(() => ({
        content: "",
        setContent: (content) => {
            store.content = content;
        }
    }));

    return store;
}

export default createContainer(useTips);
