import axios from 'axios';
import {notification} from 'antd';
import {navigate} from '@reach/router';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

// 自定义成功失败规则：RESOLVE / REJECT（默认规则：状态码以2|3开头算作成功）
axios.defaults.validateStatus = function validateStatus(status) {
    return /^(2|3)\d{2}$/.test(status);
};

// 设置在POST请求中基于请求主体向服务器发送内容的格式，默认是RAW，项目中常用的是URL-ENCODEED格式
const contentType = 'form';

if (contentType === 'form') {
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

    // form 格式需要对参数进行转换
    axios.defaults.transformRequest = (data) => {
        // data 是请求主体中需要传递给服务器的内容（对象）
        if (typeof data === 'object') {
            let str = ``;
            Object.keys(data).forEach((attr) => {
                if (data[attr]) {
                    str += `${attr}=${data[attr]}&`;
                }
            });
            return str.substring(0, str.length - 1);
        }

        return data;
    };
} else if (contentType === 'json') {
    axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
}

// 添加一个请求拦截器
axios.interceptors.request.use((config) => {
    // Do something before request is sent
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

const successHandler = (response) => {
    return response.data;
};

const errorHandler = (error) => {
    const {response = {}} = error;
    const errorText = codeMessage[response.status] || response.statusText;
    const {status, config: {url}} = response;

    if (status === 401) {
        notification.error({
            message: '未登录或登录已过期，请重新登录。',
        });

        navigate('/logout');

        return Promise.reject(error);
    }

    notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
    });

    // environment should not be used
    if (status === 403) {
        navigate('/exception/403');
    }
    if (status <= 504 && status >= 500) {
        navigate('/exception/500');
    }
    if (status >= 404 && status < 422) {
        navigate('/exception/404');
    }

    return Promise.reject(error);
};

// 添加一个响应拦截器
axios.interceptors.response.use(successHandler, errorHandler);

export default axios;

