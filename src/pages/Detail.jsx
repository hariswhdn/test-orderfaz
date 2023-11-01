import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCountry, countrySlice } from '../stores/countrySlice'
import { fetchCurrencies, currencySlice } from '../stores/currencySlice'
import { SkeletonDetail1, SkeletonDetail2 } from '../components/Skeleton'
import icon from '/public/vite.svg'

function Detail() {
  const navigate = useNavigate()
  const params = useParams()

  const dispatch = useDispatch()
  const { country } = useSelector((state) => state.country)
  const { currencies } = useSelector((state) => state.currency)

  const [init, setInit] = useState(false)
  const [objCountry, setObjCountry] = useState({})
  const [arrCurrencies, setArrCurrencies] = useState([])

  useEffect(() => {
    if (!init) {
      setInit(true)
    }
    return () => {
      dispatch(countrySlice.actions.setCountry({}))
      dispatch(currencySlice.actions.setCurrencies([]))
      setInit(false)
      setObjCountry({})
      setArrCurrencies([])
      console.log('country', country)
      document.title = 'Test-Orderfaz'
      document.querySelector('link[rel="icon"]').setAttribute('href', icon)
    }
  }, [])

  useEffect(() => {
    if (init && params.id) {
      setObjCountry({})
      dispatch(fetchCountry(params.id))
    }
  }, [init, params.id])

  useEffect(() => {
    if (Object.keys(country).length > 0) {
      console.log('country', country)
      document.title = country?.name?.common || 'Test-Orderfaz'
      document
        .querySelector('link[rel="icon"]')
        .setAttribute('href', country?.flags?.svg)
      setObjCountry(country)
      dispatch(
        fetchCurrencies(Object.keys(country?.currencies)?.[0]?.toLowerCase())
      )
    }
  }, [country])

  useEffect(() => {
    if (Object.keys(currencies).length > 0) {
      console.log('currencies', currencies)
      setArrCurrencies(currencies)
    }
  }, [currencies])

  return (
    <main className="detail">
      <button type="button" onClick={() => navigate('/')}>
        <span className="material-icons">arrow_back</span>
        <p>Back to Homepage</p>
      </button>
      <div>
        {Object.keys(objCountry).length > 0 ? (
          <div>
            <div>
              <p>{objCountry?.name?.common || ''}</p>
              <img src={objCountry?.flags?.svg || '#'} alt="img" />
            </div>
            <ul className="scrollbar_hide">
              <li>{objCountry?.cca2 || ''}</li>
              <li>{objCountry?.name?.official || ''}</li>
              <li>
                {objCountry?.name?.nativeName[
                  Object.keys(objCountry?.name?.nativeName)[0]
                ]?.official || ''}
              </li>
            </ul>
          </div>
        ) : (
          <SkeletonDetail1 />
        )}
        <div>
          {Object.keys(objCountry).length > 0 ? (
            <>
              <div>
                <span className="material-icons">public</span>
                <div>
                  <p>LatLong</p>
                  <p>
                    {objCountry?.latlng
                      ?.map((item) => item.toFixed(1))
                      ?.join(', ')}
                  </p>
                </div>
              </div>
              <div>
                <span className="material-icons">map</span>
                <ul>
                  <li>
                    <p>
                      Capital:&nbsp;
                      <span>{objCountry?.capital?.[0] || ''}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      Region:&nbsp;<span>{objCountry?.region || ''}</span>
                    </p>
                  </li>
                  <li>
                    <p>
                      Subregion:&nbsp;<span>{objCountry?.subregion || ''}</span>
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <span className="material-icons">call</span>
                <div>
                  <p>Calling Code</p>
                  <ul className="scrollbar_hide">
                    {objCountry?.idd?.suffixes?.map((item, index) => (
                      <li key={item}>
                        {(index > 0 ? ', ' : '') +
                          objCountry?.idd?.root?.replace('+', '') +
                          item}
                      </li>
                    ))}
                  </ul>
                  <div>
                    <div>
                      <p>{`${objCountry?.idd?.suffixes.length} calling code${
                        objCountry?.idd?.suffixes.length > 1 ? 's' : ''
                      }`}</p>
                      <ul className="scrollbar_hide">
                        {objCountry?.idd?.suffixes.map((item) => (
                          <li key={item} className="disabled">
                            {objCountry?.idd?.root?.replace('+', '') + item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <p>&nbsp;{`is in ${objCountry?.name?.common}`}</p>
                  </div>
                </div>
              </div>
              {arrCurrencies.length > 0 ? (
                <div>
                  <span className="material-icons">paid</span>
                  <div>
                    <p>Currency</p>
                    <p>{Object.keys(objCountry?.currencies)?.[0]}</p>
                    <div>
                      <div>
                        <p>{`${arrCurrencies.length} countr${
                          arrCurrencies.length > 1 ? 'ies' : 'y'
                        }`}</p>
                        <ul className="scrollbar_hide">
                          {arrCurrencies.map((item2) => (
                            <li
                              key={item2?.name?.common
                                ?.toLowerCase()
                                ?.replace(/[^a-z]/gi, '')}
                              className={
                                params.id === item2?.cca2?.toLowerCase()
                                  ? 'disabled'
                                  : ''
                              }
                              onClick={() =>
                                navigate(`/${item2?.cca2?.toLowerCase()}`)
                              }
                            >
                              {item2?.name?.common}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <p>&nbsp;with this currency</p>
                    </div>
                  </div>
                </div>
              ) : (
                <SkeletonDetail2 />
              )}
            </>
          ) : (
            Array.from(Array(4).keys()).map((item) => (
              <SkeletonDetail2 key={item + 1} />
            ))
          )}
        </div>
      </div>
    </main>
  )
}

export default Detail
