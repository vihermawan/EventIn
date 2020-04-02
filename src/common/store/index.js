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
import certificateEventReducer from '../../modules/admin-panitia/e-certificate/store/e-certificate-reducer'
import pesertaEventReducer from '../../modules/admin-superadmin/user/peserta/store/peserta-reducer'
import panitiaEventReducer from '../../modules/admin-superadmin/user/panitia/store/panitia-reducer'
import penandatanganReducer from '../../modules/admin-superadmin/user/penandatangan/store/penandatangan-reducer'
import usersReducer from '../../modules/admin-superadmin/user/store/users-reducer'
import kategoriReducer from '../../modules/alleventkategori/store/kategori-reducer'
import loginReducer from '../../modules/auth/store/login-reducer'

const history = createHistory();
const browserHistory = createBrowserHistory();

const persistConfig = {
    key: 'your-apps',
    storage,
    stateReconciler: autoMergeLevel1,
    whitelist: ['login','activeEvent','certificate','peserta','panitia','penandatangan','users','kategori'],
};

const reducers = combineReducers({
    router: connectRouter(browserHistory),
    activeEvent: activeEventReducer,
    certificate : certificateEventReducer,
    peserta : pesertaEventReducer,
    panitia : panitiaEventReducer,
    penandatangan : penandatanganReducer,
    users : usersReducer,
    login : loginReducer,
    kategori : kategoriReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware = routerMiddleware(browserHistory);
const store = createStore(persistedReducer, applyMiddleware(middleware, thunk));

const persistor = persistStore(store);

export { history, store, persistor, browserHistory};