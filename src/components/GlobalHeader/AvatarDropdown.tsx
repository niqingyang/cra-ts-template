import React from 'react';
import {observer} from "mobx-react";
import {Avatar, Menu, Spin} from 'antd';
import {UserOutlined, SettingOutlined, LogoutOutlined} from '@ant-design/icons';
import {ClickParam} from 'antd/es/menu';
import {FormattedMessage} from 'react-intl';
import {navigate} from '@reach/router';

import User, {CurrentUser} from '@/models/user';
import Login from '@/models/login';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightProps {
    currentUser?: CurrentUser;
    menu?: boolean;
}

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = (props) => {

    const {menu} = props;

    const login = Login.useContainer();

    const {currentUser = {avatar: '', name: ''}} = User.useContainer();

    const onMenuClick = (event: ClickParam) => {
        const {key} = event;
        if (key === 'logout') {
            login.logout();
            return;
        }
        navigate(`/account/${key}`);
    };

    const menuHeaderDropdown = (
        <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
            {menu && (
                <Menu.Item key="center">
                    <UserOutlined />
                    <FormattedMessage id="menu.account.center" defaultMessage="account center"/>
                </Menu.Item>
            )}
            {menu && (
                <Menu.Item key="settings">
                    <SettingOutlined />
                    <FormattedMessage id="menu.account.settings" defaultMessage="account settings"/>
                </Menu.Item>
            )}
            {menu && <Menu.Divider/>}

            <Menu.Item key="logout">
                <LogoutOutlined />
                <FormattedMessage id="menu.account.logout" defaultMessage="logout"/>
            </Menu.Item>
        </Menu>
    );

    return currentUser && currentUser.name ? (
        <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar"/>
          <span className={styles.name}>{currentUser.name}</span>
        </span>
        </HeaderDropdown>
    ) : (
        <Spin size="small" style={{marginLeft: 8, marginRight: 8}}/>
    );
}

export default observer(AvatarDropdown);
