import {Button, Result} from 'antd';
import React from 'react';
import {navigate} from '@reach/router';

// 这里应该使用 antd 的 404 result 组件，
// 但是还没发布，先来个简单的。

const NoFoundPage: React.FC<{}> = () => (
    <Result
        status="500"
        title="500"
        subTitle="Sorry, the server is reporting an error."
        extra={
            <Button type="primary" onClick={() => navigate('/')}>
                Back Home
            </Button>
        }
    />
);

export default NoFoundPage;
