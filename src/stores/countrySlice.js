import { createSlice } from '@reduxjs/toolkit'

export const countrySlice = createSlice({
  name: 'country',
  initialState: {
    loading: false,
    countries: [],
    country: {},
    error: null,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload
    },
    setCountries: (state, { payload }) => {
      state.loading = false
      state.countries = payload
      state.error = null
    },
    setCountry: (state, { payload }) => {
      state.loading = false
      state.country = payload
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

export let fetchCountriesAbort = false
export const fetchCountries = (prop) => async (dispatch) => {
  await dispatch(setLoading(textLoading))
  try {
    fetchCountriesAbort = new AbortController()
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${prop}?fields=name,cca2`,
      { signal: fetchCountriesAbort.signal }
    )
    if (response?.ok) {
      const data = await response.json()
      if (data && data.length > 1) {
        if (data && data.length > 5) {
          data.length = 5
        }
        data.sort((a, b) => a?.name?.common?.localeCompare(b?.name?.common))
      }
      await dispatch(setCountries(data))
    } else {
      await dispatch(setError(textError))
    }
  } catch (error) {
    await dispatch(setError(textError))
  }
}

export const fetchCountry = (prop) => async (dispatch) => {
  await dispatch(setLoading(textLoading))
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${prop}?fields=name,cca2,flags,latlng,capital,region,subregion,idd,currencies`
    )
    if (response?.ok) {
      const data = await response.json()
      await dispatch(setCountry(data))
    } else {
      await dispatch(setError(textError))
    }
  } catch (error) {
    await dispatch(setError(textError))
  }
}

export const { setLoading, setCountries, setCountry, setError } =
  countrySlice.actions
export default countrySlice.reducer
