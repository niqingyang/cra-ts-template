import {useLocalStore} from "mobx-react";
import {createContainer} from "unstated-next";
import {NoticeIconData} from '@/components/NoticeIcon';

export interface NoticeItem extends NoticeIconData {
    id: string;
    type: string;
    status: string;
}

export interface GlobalModelState {
    collapsed: boolean;
    notices: NoticeItem[];
}

export interface GlobalModelType extends GlobalModelState {
    fetchNotices: () => void;
    clearNotices: (id: string) => void;
    changeNoticeReadState: (id: string) => void;
    changeLayoutCollapsed: (collapsed: boolean) => void;
    saveNotices: () => void;
    saveClearedNotices: () => void;
}

const useGlobal = () => {
    const store = useLocalStore<GlobalModelType>(() => {
        return {
            collapsed: true,
            notices: [],
            fetchNotices: () => {

            },
            clearNotices: (id: string) => {
                store.notices = [];
            },
            changeNoticeReadState: (id: string) => {

            },
            changeLayoutCollapsed: (collapsed: boolean) => {
                store.collapsed = collapsed;
            },
            saveNotices: () => {

            },
            saveClearedNotices: () => {

            }
        }
    });
    return store;
}

export default createContainer(useGlobal);
