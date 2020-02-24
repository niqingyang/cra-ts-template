import {useLocalStore} from "mobx-react";
import {createContainer} from "unstated-next";
import {NoticeIconData} from '@/components/NoticeIcon';
import {queryNotices} from "@/services/user";
import User from "@/models/user";

export interface NoticeItem extends NoticeIconData {
    id: string;
    type: string;
    status: string;
}

export interface GlobalStateType {
    collapsed: boolean;
    notices: NoticeItem[];
}

export interface GlobalType extends GlobalStateType {
    fetchNotices: () => void;
    clearNotices: (type: string) => void;
    changeNoticeReadState: (id: string) => void;
    changeLayoutCollapsed: (collapsed: boolean) => void;
    saveNotices: (notices: NoticeItem[]) => void;
    saveClearedNotices: (type: string) => void;
}

const useGlobal = () => {

    const user = User.useContainer();

    const store = useLocalStore<GlobalType>(() => {
        return {
            collapsed: true,
            notices: [],
            fetchNotices: async () => {
                const response = await queryNotices();

                store.saveNotices(response.data);
            },
            clearNotices: (type: string) => {
                store.saveClearedNotices(type);

                user.changeNotifyCount({
                    totalCount: store.notices.length,
                    unreadCount: store.notices.filter((item):boolean => !item.read ).length
                });
            },
            changeNoticeReadState: (id: string) => {
                const notices = store.notices.map((item) => {
                    if(item.id == id){
                        item.read = true;
                    }
                    return item;
                });

                store.saveNotices(notices);

                user.changeNotifyCount({
                    totalCount: notices.length,
                    unreadCount: notices.filter((item):boolean => !item.read ).length
                });
            },
            changeLayoutCollapsed: (collapsed: boolean) => {
                store.collapsed = collapsed;
            },
            saveNotices: (notices) => {
                store.collapsed = false;
                store.notices = notices;
            },
            saveClearedNotices: (type) => {
                store.collapsed = false;
                store.notices = store.notices.filter((item): boolean => item.type != type)
            }
        }
    });
    return store;
}

export default createContainer(useGlobal);
