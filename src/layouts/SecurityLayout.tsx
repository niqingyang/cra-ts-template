import React, {useEffect, useState} from 'react';
import {PageLoading} from '@ant-design/pro-layout';
import {Redirect} from '@reach/router';
import {stringify} from 'querystring';

import User from '@/models/user';

const SecurityLayout: React.FC<any> = (props) => {

    const [isReady, setIsReady] = useState(false);
    const {currentUser, fetchCurrent} = User.useContainer();

    useEffect(() => {
        setIsReady(true);
        fetchCurrent();
    }, []);

    const {children, loading} = props;

    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = currentUser && currentUser.userId;
    const queryString = stringify({
        redirect: window.location.href,
    });

    if ((!isLogin && loading) || !isReady) {
        return <PageLoading/>;
    }

    if (!isLogin) {
        return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
}

export default SecurityLayout;
