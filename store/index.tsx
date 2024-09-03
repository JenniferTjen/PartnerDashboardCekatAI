import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeConfigSlice from './themeConfigSlice';

import emailTemplateSlice from './emailTemplateSlice';
import partnerSlice from './partnerSlice';
import broadcastSlice from './broadcastSlice';
import smtpSlice from './smtpSlice';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['partner'], // List of reducers you want to persist
};

const rootReducer = combineReducers({
    themeConfig: themeConfigSlice,
    emailTemplate: emailTemplateSlice,
    partner: partnerSlice,
    broadcast: broadcastSlice,
    smtp: smtpSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // You can ignore specific actions if needed
            },
        }),
});

const persistor = persistStore(store);

export { store, persistor };

export type IRootState = ReturnType<typeof rootReducer>;
