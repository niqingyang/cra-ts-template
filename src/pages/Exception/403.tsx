import {Button, Result} from 'antd';
import React from 'react';
import {navigate} from '@reach/router';

// 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage: React.FC<{}> = () => (
    <Result
        status="403"
        title="403"
        subTitle="Sorry, you don't have access to this page."
        extra={
            <Button type="primary" onClick={() => navigate('/')}>
                Back Home
            </Button>
        }
    />
);

export default NoFoundPage;
