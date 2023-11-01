import { useEffect, useRef, useState } from 'react'
import Field from '../components/Field'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCountries,
  fetchCountriesAbort,
  countrySlice,
} from '../stores/countrySlice'

function Home() {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { loading, countries, error } = useSelector((state) => state.country)

  const [fieldSearch, setFieldSearch] = useState('')
  const [typing, setTyping] = useState(loading)

  const timerRef = useRef(null)

  useEffect(() => {
    return () => {
      dispatch(countrySlice.actions.setCountries([]))
      dispatch(countrySlice.actions.setLoading(false))
      dispatch(countrySlice.actions.setError(null))
    }
  }, [])

  function getCountries() {
    setTyping(true)
    if (timerRef) {
      clearTimeout(timerRef.current)
    }
    if (loading) {
      fetchCountriesAbort.abort()
    }
    timerRef.current = setTimeout(() => {
      setTyping(false)
      if (fieldSearch) {
        dispatch(fetchCountries(fieldSearch))
      }
      clearTimeout(timerRef.current)
    }, 500)
  }

  useEffect(() => {
    getCountries()
  }, [fieldSearch])

  useEffect(() => {
    if (countries.length > 0) {
      console.log('countries', countries)
    }
  }, [countries])

  return (
    <main className="search">
      <div>
        <p>Country</p>
        <div>
          <Field
            name="search"
            placeholder="Type any country name"
            value={fieldSearch}
            onChange={(e) => setFieldSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && error && getCountries()}
            children={
              <div>
                <span className="material-icons">search</span>
              </div>
            }
          />
          {fieldSearch && (
            <ul>
              {!typing && !loading && !error ? (
                countries.map((item) => (
                  <li
                    key={item.cca2}
                    onClick={() => navigate(`/${item?.cca2?.toLowerCase()}`)}
                  >
                    {item.name.common}
                  </li>
                ))
              ) : (
                <li
                  className={
                    typing || loading ? 'warning' : error ? 'error' : ''
                  }
                >
                  {typing
                    ? 'Please wait'
                    : loading
                    ? loading
                    : error
                    ? error
                    : 'Data not found'}
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}

export default Home
