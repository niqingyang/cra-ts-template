import React from 'react';
import {useLocalStore} from "mobx-react";
import {createContainer} from "unstated-next"
import zhCN from '@/locales/zh-CN';
import enUS from '@/locales/en-US';

function setLocale(lang, realReload = true) {
    const {g_langSeparator = '-'} = window;
    const localeExp = new RegExp(`^([a-z]{2})${g_langSeparator}?([A-Z]{2})?$`);
    if (lang !== undefined && !localeExp.test(lang)) {
        // for reset when lang === undefined
        throw new Error('setLocale lang format error');
    }
    if (getLocale() !== lang) {
        window.g_lang = lang;
        window.localStorage.setItem('lang', lang || '');

        if (realReload) {
            window.location.reload();
        }
        // chrome 不支持这个事件。所以人肉触发一下
        if (window.dispatchEvent) {
            const event = new Event('languagechange');
            window.dispatchEvent(event);
        }
    }
}

function getLocale() {
    // support SSR
    const {g_langSeparator = '-', g_lang} = window;
    const lang = typeof localStorage !== 'undefined' ? window.localStorage.getItem('lang') : '';
    const isNavigatorLanguageValid =
        typeof navigator !== 'undefined' && typeof navigator.language === 'string';
    const browserLang = isNavigatorLanguageValid
        ? navigator.language.split('-').join(g_langSeparator)
        : '';
    return lang || g_lang || browserLang;
}

const useLocale = function () {

    const messages = {
        'zh-CN': zhCN,
        'en-US': enUS,
    }

    const store = useLocalStore(() => ({
        locale: 'zh-CN',
        messages: messages['zh-CN'],
        setLocale: (lang) => {
            store.locale = lang;
            store.messages = messages[lang];
        }
    }));

    return store;
}

export default createContainer(useLocale);
