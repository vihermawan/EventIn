/**
 * @author spindyzel
 * @since 28 Desember 2019
*/


import { createBrowserHistory } from 'history';
import * as v from 'voca';
import { push, go } from 'connected-react-router';

import { SELECT_MENU } from './nav-action-type'
import menu from './../../appMenu.properties';

const baseUrl = process.env.PUBLIC_URL;

const dispatchMenu = (payload) => {
    return {
        type: SELECT_MENU,
        payload,
    };
};

export const navigate = (key, additionalLink = '', query = null) => {
    return (dispatch) => {
        const history = createBrowserHistory();
        if (menu[key]) {
            if (history.location.pathname !== menu[key].link || (!v.isEmpty(additionalLink) || query !== null)) {
                dispatch(dispatchMenu({
                    menuKey: key,
                    openedMenuKey: menu[key].open ? [menu[key].open] : [],
                }));
                if (!v.isEmpty(additionalLink)) {
                    dispatch(push(`${baseUrl}${menu[key].link}/${additionalLink}`));
                } else {
                    dispatch(push(`${baseUrl}${menu[key].link}`));
                }
            } else {
                dispatch(go(0));
            }
        }
    };
};