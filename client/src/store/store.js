import {configureStore} from '@reduxjs/toolkit';
import AuthReducer from './features/authSlice'
import ClickReducer from './features/clickSlice'
import PostReducer from './features/postSlice'
import EventReducer from './features/eventSlice'

export default configureStore({
    reducer:{
        auth:AuthReducer,
        click:ClickReducer,
        post:PostReducer, 
        event:EventReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
}) 