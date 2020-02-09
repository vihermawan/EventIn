/**
 * @author spindyzel
 * @since 28 Desember 2019
*/

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createHistory from 'history/createHashHistory';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

// store component
import activeEventReducer from '../../modules/admin-panitia/active-event/store/active-event-reducer'

const history = createHistory();
const browserHistory = createBrowserHistory();

const persistConfig = {
    key: 'your-apps',
    storage,
    stateReconciler: autoMergeLevel1,
    whitelist: ['login',],
};

const reducers = combineReducers({
    router: connectRouter(browserHistory),
    activeEvent: activeEventReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = routerMiddleware(browserHistory);
const store = createStore(persistedReducer, applyMiddleware(middleware, thunk));

const persistor = persistStore(store);

export { history, store, persistor, browserHistory};