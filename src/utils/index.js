import React from 'react';

/**
 * 合并 unstated-next 中的多个容器
 *
 * https://github.com/jamiebuilds/unstated-next/issues/35
 *
 * @param containers
 * @returns {function(*): *}
 */
export function compose(containers) {

    if (typeof containers === 'object') {
        containers = Object.keys(containers).filter((key) => {
            return containers[key].Provider
        });
    }

    return function Component(props) {
        return containers.reduceRight((children, Container) => {
            return <Container.Provider>{children}</Container.Provider>
        }, props.children);
    }
}

/**
 * 提取 containers 中的 Provider 合并为一个数组
 * @param containers
 * @returns {*[]|*}
 */
export function providers(containers) {

    if (typeof containers === 'object') {
        return Object.keys(containers).filter((key) => {
            return containers[key].Provider
        }).map((key) => {
            return containers[key].Provider
        })
    }

    return containers.map((container) => {
        return container.Provider;
    });
}