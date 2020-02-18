/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */

import React, {useEffect} from 'react';
import ProLayout, {
    MenuDataItem,
    BasicLayoutProps as ProLayoutProps,
    Settings,
    DefaultFooter,
} from '@ant-design/pro-layout';
import {Link} from '@reach/router';
import {useIntl} from 'react-intl';
import {Result, Button} from 'antd';
import {GithubOutlined} from '@ant-design/icons';

import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import {isAntDesignPro, getAuthorityFromRouter} from '@/utils/utils';

import User from '@/models/user';
import Global from '@/models/global';
import Setting from '@/models/settings';
import {RouteType} from '@/config/default.routes';

import logo from '@/assets/logo.svg';

const noMatch = (
    <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page."
        extra={
            <Button type="primary">
                <Link to="/user/login">Go Login</Link>
            </Button>
        }
    />
);

export interface BasicLayoutProps extends ProLayoutProps {
    breadcrumbNameMap?: {
        [path: string]: MenuDataItem;
    };
    route: RouteType & {
        authority: string[];
    };
    settings?: Settings;
}

export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
    breadcrumbNameMap: {
        [path: string]: MenuDataItem;
    };
};

/**
 * use Authorized check all menu item
 */
const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
    menuList.map(item => {
        const localItem = {
            ...item,
            children: item.children ? menuDataRender(item.children) : [],
        };
        return Authorized.check(item.authority, localItem, null) as MenuDataItem;
    });

const defaultFooterDom = (
    <DefaultFooter
        copyright="2019 蚂蚁金服体验技术部出品"
        links={[
            {
                key: 'Ant Design Pro',
                title: 'Ant Design Pro',
                href: 'https://pro.ant.design',
                blankTarget: true,
            },
            {
                key: 'github',
                title: <GithubOutlined />,
                href: 'https://github.com/ant-design/ant-design-pro',
                blankTarget: true,
            },
            {
                key: 'Ant Design',
                title: 'Ant Design',
                href: 'https://ant.design',
                blankTarget: true,
            },
        ]}
    />
);

const footerRender: BasicLayoutProps['footerRender'] = () => {
    if (!isAntDesignPro()) {
        return defaultFooterDom;
    }
    return (
        <>
            {defaultFooterDom}
            <div
                style={{
                    padding: '0px 24px 24px',
                    textAlign: 'center',
                }}
            >
                <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer">
                    <img
                        src="https://www.netlify.com/img/global/badges/netlify-color-bg.svg"
                        width="82px"
                        alt="netlify logo"
                    />
                </a>
            </div>
        </>
    );
};

const BasicLayout: React.FC<BasicLayoutProps> = props => {
    const {children, route, path = '/'} = props;

    /**
     * constructor
     */
    const user = User.useContainer();
    const global = Global.useContainer();
    const {state: settings} = Setting.useContainer();

    useEffect(() => {
        user.fetchCurrent();
    }, []);
    /**
     * init variables
     */
    const handleMenuCollapse = (collapsed: boolean): void => {
        global.changeLayoutCollapsed(collapsed);
    };
    // get children authority
    const authorized = getAuthorityFromRouter(route.routes, location.pathname || '/') || {
        authority: undefined,
    };

    const {formatMessage} = useIntl();

    return (
        <ProLayout
            logo={logo}
            menuHeaderRender={(logoDom, titleDom) => (
                <Link to="/">
                    {logoDom}
                    {titleDom}
                </Link>
            )}
            onCollapse={handleMenuCollapse}
            menuItemRender={(menuItemProps, defaultDom) => {
                if (menuItemProps.isUrl || menuItemProps.children || !menuItemProps.path) {
                    return defaultDom;
                }
                return <Link to={menuItemProps.path}>{defaultDom}</Link>;
            }}
            breadcrumbRender={(routers = []) => [
                {
                    path: '/',
                    breadcrumbName: formatMessage({
                        id: 'menu.home',
                        defaultMessage: 'Home',
                    }),
                },
                ...routers,
            ]}
            itemRender={(route, params, routes, paths) => {
                const first = routes.indexOf(route) === 0;
                return first ? (
                    <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
                ) : (
                    <span>{route.breadcrumbName}</span>
                );
            }}
            footerRender={footerRender}
            menuDataRender={menuDataRender}
            formatMessage={formatMessage}
            rightContentRender={() => <RightContent/>}
            style={{
                minHeight: '100vh'
            }}
            {...props}
            {...settings}
        >
            <Authorized authority={authorized!.authority} noMatch={noMatch}>
                {children}
            </Authorized>
        </ProLayout>
    );
};

export default BasicLayout;
