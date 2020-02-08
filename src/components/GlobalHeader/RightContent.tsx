import React from 'react';
import {Icon, Tooltip} from 'antd';
import {useIntl} from "react-intl";

import Setting from '@/models/settings';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC<any> = props => {

    const {state: {navTheme: theme, layout}} = Setting.useContainer();

    const {formatMessage} = useIntl();

    let className = styles.right;

    if (theme === 'dark' && layout === 'topmenu') {
        className = `${styles.right}  ${styles.dark}`;
    }

    return (
        <div className={className}>
            <HeaderSearch
                className={`${styles.action} ${styles.search}`}
                placeholder={formatMessage({
                    id: 'component.globalHeader.search',
                })}
                defaultValue="umi ui"
                dataSource={[
                    formatMessage({
                        id: 'component.globalHeader.search.example1',
                    }),
                    formatMessage({
                        id: 'component.globalHeader.search.example2',
                    }),
                    formatMessage({
                        id: 'component.globalHeader.search.example3',
                    }),
                ]}
                onSearch={value => {
                    console.log('input', value);
                }}
                onPressEnter={value => {
                    console.log('enter', value);
                }}
            />
            <Tooltip
                title={formatMessage({
                    id: 'component.globalHeader.help',
                })}
            >
                <a
                    target="_blank"
                    href="https://pro.ant.design/docs/getting-started"
                    rel="noopener noreferrer"
                    className={styles.action}
                >
                    <Icon type="question-circle-o"/>
                </a>
            </Tooltip>
            <Avatar/>
            <SelectLang className={styles.action}/>
        </div>
    );
};

export default GlobalHeaderRight;
