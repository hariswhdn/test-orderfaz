import { createSlice } from '@reduxjs/toolkit'

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    loading: false,
    currencies: [],
    error: null,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setCurrencies: (state, { payload }) => {
      state.loading = false
      state.currencies = payload
      state.error = null
    },
    setError: (state, { payload }) => {
      state.loading = false
      state.error = payload
    },
  },
})

const textLoading = 'Fetching data from server'
const textError = 'Failed fetch data from server'

export const fetchCurrencies = (prop) => async (dispatch) => {
  await dispatch(setLoading(textLoading))
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/currency/${prop}?fields=name,cca2`
    )
    if (response?.ok) {
      const data = await response.json()
      if (data && data.length > 1) {
        data.sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common))
      }
      await dispatch(setCurrencies(data))
    } else {
      await dispatch(setError(textError))
    }
  } catch (error) {
    await dispatch(setError(textError))
  }
}

export const { setLoading, setCurrencies, setError } = currencySlice.actions
export default currencySlice.reducer
