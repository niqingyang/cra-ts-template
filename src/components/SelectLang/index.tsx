import {Menu} from 'antd';
import {GlobalOutlined} from '@ant-design/icons';
import {useIntl} from "react-intl";
import Locale from '@/models/locale';

import {ClickParam} from 'antd/es/menu';
import React from 'react';
import classNames from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

interface SelectLangProps {
    className?: string;
}

const SelectLang: React.FC<SelectLangProps> = props => {
    const {className} = props;
    const {formatMessage} = useIntl();
    const localeStore = Locale.useContainer();
    const selectedLang = localeStore.locale;
    const changeLang = ({key}: ClickParam): void => localeStore.setLocale(key);
    const locales = ['zh-CN', 'en-US'];
    const languageLabels: { [key: string]: string } = {
        'zh-CN': '简体中文',
        'en-US': 'English',
    };
    const languageIcons: { [key: string]: string } = {
        'zh-CN': '🇨🇳',
        'en-US': '🇺🇸',
    };
    const langMenu = (
        <Menu className={styles.menu} selectedKeys={[selectedLang]} onClick={changeLang}>
            {locales.map(locale => (
                <Menu.Item key={locale}>
                    <span role="img" aria-label={languageLabels[locale]}>
                        {languageIcons[locale]}
                    </span>
                    {' '}
                    {languageLabels[locale]}
                </Menu.Item>
            ))}
        </Menu>
    );
    return (
        <HeaderDropdown overlay={langMenu} placement="bottomRight">
            <span className={classNames(styles.dropDown, className)}>
                <GlobalOutlined title={formatMessage({id: 'navBar.lang'})}/>
            </span>
        </HeaderDropdown>
    );
};

export default SelectLang;
