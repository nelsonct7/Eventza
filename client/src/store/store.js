import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice'
import ClickReducer from './features/clickSlice'
import PostReducer from './features/postSlice'


export default configureStore({
    reducer:{
        auth:AuthReducer,
        click:ClickReducer,
        post:PostReducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
}) 