import { configureStore } from '@reduxjs/toolkit'

import countrySlice from './countrySlice'
import currencySlice from './currencySlice'

const store = configureStore({
  reducer: {
    country: countrySlice,
    currency: currencySlice,
  },
})

export default store
