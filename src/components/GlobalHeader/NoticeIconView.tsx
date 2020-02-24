import React, {useEffect} from 'react';
import {observer} from "mobx-react";
import {Tag, message} from 'antd';
import {useIntl} from 'react-intl';
import groupBy from 'lodash/groupBy';
import moment from 'moment';

import Global, {NoticeItem} from '@/models/global';
import NoticeIcon from '../NoticeIcon';
import User, {CurrentUser} from '@/models/user';
import styles from './index.less';

export interface GlobalHeaderRightProps {
    notices?: NoticeItem[];
    currentUser?: CurrentUser;
    fetchingNotices?: boolean;
    onNoticeVisibleChange?: (visible: boolean) => void;
    onNoticeClear?: (tabName?: string) => void;
}

const GlobalHeaderRight: React.FC<GlobalHeaderRightProps> = (props) => {
    const {onNoticeVisibleChange} = props;
    const {formatMessage} = useIntl();
    const global = Global.useContainer();
    const {currentUser} = User.useContainer();

    useEffect(() => {
        global.fetchNotices();
    }, []);

    const changeReadState = (clickedItem: NoticeItem): void => {
        const {id} = clickedItem;
        global.changeNoticeReadState(id);
    };

    const handleNoticeClear = (title: string, key: string) => {
        message.success(`${formatMessage({id: 'component.noticeIcon.cleared'})} ${title}`);
        global.clearNotices(key);
    };

    const getNoticeData = (): { [key: string]: NoticeItem[] } => {
        const {notices = []} = global;
        if (notices.length === 0) {
            return {};
        }
        const newNotices = notices.map(notice => {
            const newNotice = {...notice};
            if (newNotice.datetime) {
                newNotice.datetime = moment(notice.datetime as string).fromNow();
            }
            if (newNotice.id) {
                newNotice.key = newNotice.id;
            }
            if (newNotice.extra && newNotice.status) {

                const colors: { [key: string]: string } = {
                    todo: '',
                    processing: 'blue',
                    urgent: 'red',
                    doing: 'gold',
                }

                const color: string = colors[newNotice.status];

                newNotice.extra = (
                    <Tag color={color} style={{marginRight: 0}}>
                        {newNotice.extra}
                    </Tag>
                );
            }
            return newNotice;
        });
        return groupBy(newNotices, 'type');
    };

    const getUnreadData = (noticeData: { [key: string]: NoticeItem[] }) => {
        const unreadMsg: { [key: string]: number } = {};
        Object.keys(noticeData).forEach(key => {
            const value = noticeData[key];
            if (!unreadMsg[key]) {
                unreadMsg[key] = 0;
            }
            if (Array.isArray(value)) {
                unreadMsg[key] = value.filter(item => !item.read).length;
            }
        });
        return unreadMsg;
    };

    const fetchingNotices = false;
    const fetchingMoreNotices = false;

    const noticeData = getNoticeData();
    const unreadMsg = getUnreadData(noticeData);

    return (
        <NoticeIcon
            className={styles.action}
            count={currentUser?.unreadCount}
            onItemClick={item => {
                changeReadState(item as NoticeItem);
            }}
            loading={fetchingNotices}
            clearText={formatMessage({id: 'component.noticeIcon.clear'})}
            viewMoreText={formatMessage({id: 'component.noticeIcon.view-more'})}
            onClear={handleNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            onViewMore={() => message.info('Click on view more')}
            clearClose
        >
            <NoticeIcon.Tab
                tabKey="notification"
                count={unreadMsg.notification}
                list={noticeData.notification}
                title={formatMessage({id: 'component.globalHeader.notification'})}
                emptyText={formatMessage({id: 'component.globalHeader.notification.empty'})}
                showViewMore
            />
            <NoticeIcon.Tab
                tabKey="message"
                count={unreadMsg.message}
                list={noticeData.message}
                title={formatMessage({id: 'component.globalHeader.message'})}
                emptyText={formatMessage({id: 'component.globalHeader.message.empty'})}
                showViewMore
            />
            <NoticeIcon.Tab
                tabKey="event"
                title={formatMessage({id: 'component.globalHeader.event'})}
                emptyText={formatMessage({id: 'component.globalHeader.event.empty'})}
                count={unreadMsg.event}
                list={noticeData.event}
                showViewMore
            />
        </NoticeIcon>
    );
}


export default observer(GlobalHeaderRight);
