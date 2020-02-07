import React from 'react';
import useAxios from 'axios-hooks';
import {observer} from "mobx-react";

function RandomUser(props) {

    const [{data, loading, error}, refetch] = useAxios('https://randomuser.me/api');

    let html = null;

    if (loading) {
        html = (
            <div>
                <p>
                    <img
                        src='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1656427518,3440311722&fm=26&gp=0.gif'
                        alt=""
                    />
                </p>
            </div>
        );
    } else if (error) {
        html = (
            <div>
                <p>{error}</p>
                <p><img src='http://www.999zx.cn/adm_file/images/201811/infoCont/20181124-169314-41180.jpg' alt=""/>
                </p>
            </div>
        );
    } else if (data) {

        let user = data.results[0];

        user = {
            name: `${user.name.first} ${user.name.last}`,
            email: user.email,
            picture: user.picture.large
        };

        html = (
            <div>
                <p>
                    {user.name}{' - '}{user.email}
                </p>
                <p>
                    <img src={user.picture} alt=""/>
                </p>
            </div>
        );
    }

    return (
        <div>
            <div>
                <button type='button' onClick={refetch}>
                    Fetch User
                </button>
            </div>
            {html}
        </div>
    )
}

export default observer(RandomUser);
