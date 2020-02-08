import React from 'react';
import {Redirect} from '@reach/router';
import Authorized from './Authorized';
import {IAuthorityType} from './CheckPermissions';

interface AuthorizedRoutePops {
    currentAuthority: string;
    component: React.ComponentClass<any, any>;
    render: (props: any) => React.ReactNode;
    redirectPath: string;
    authority: IAuthorityType;
}

const AuthorizedRoute: React.FC<AuthorizedRoutePops> = (props) => {

    const {
        component: Component,
        render,
        authority,
        redirectPath,
        ...rest
    } = props;

    return (
        <Authorized
            authority={authority}
            noMatch={<Redirect path={redirectPath}/>}
        >
            {Component ? <Component {...rest} /> : render(rest)}
        </Authorized>
    )
};

export default AuthorizedRoute;
