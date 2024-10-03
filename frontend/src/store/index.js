// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'
// ** Reducers
import authSlice from './auth/index.js'
import userSlice from './user/userSlice'
import statisticsSlice from './statistics/statisticsSlice.js'
import languageSlice from './language/languageSlice' 
import pathsSlice from './paths/pathsSlice.js'
import adminSlice from './admin/adminSlice.js'
import pathSlice from "./path/pathSlice.js";
import labSlice from "./lab/labSlice.js";
import logSlice from "./log/logSlice.js";
<<<<<<< HEAD
=======
import codeSlice from "./code/codeSlice.js";
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user : userSlice, 
    statistics: statisticsSlice, 
    language : languageSlice,
    paths : pathsSlice,
    admin: adminSlice,
    path: pathSlice,
    lab: labSlice,
<<<<<<< HEAD
    log: logSlice
=======
    log: logSlice,
    code: codeSlice
>>>>>>> 3a9b9de425f75269bdd7cb465063b3ea01be1d75
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
