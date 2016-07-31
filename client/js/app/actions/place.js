import { PLACE_GET, PLACE_UPDATE_PRICES } from '../constants/place'

import 'whatwg-fetch'

const getDistance = (from, to) => {
    const toRad = (value) => parseFloat(value) * Math.PI / 180

    const R = 6371e3 // metres
    const φ1 = toRad(from.lat)
    const φ2 = toRad(to.lat)
    const Δφ = toRad(to.lat - from.lat)
    const Δλ = toRad(to.lon - from.lon)

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2)

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return parseInt(R * c / 1000, 10)
}

export function getPlace() {
    return (dispatch, getState) => {
        const { place: { from } } = getState()

        fetch('https://www.travelpayouts.com/whereami')
            .then(res => res.json())
            .then(place => {
                const { 0: lon, 1: lat } = place.coordinates.split(':')
                const nearest = from.map(el => ({ ...el, distance: getDistance({ lon, lat }, el.coords) })).sort((a, b) => a.distance - b.distance)[0]
                dispatch({
                    type: PLACE_GET,
                    place: {
                        iata: place.iata,
                        name: place.name,
                        nearest,
                        coords: {
                            lat,
                            lon
                        }
                    }
                })
                loadPrices(dispatch, getState)
            })
    }
}

export function getPrices() {
    return (dispatch, getState) => {
        loadPrices(dispatch, getState)
    }
}


const getMonths = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = now.getMonth() + 1

    return [
        `&depart_months[]=${year}-${month < 10 ? `0${month}` : month}-01`,
        `&depart_months[]=${month + 1 === 11 ? year + 1 : year}-${month + 1 < 10 && month + 1 !== 11 ? `0${month + 1}` : month + 1 === 11 ? '01' : month + 1}-01`,
    ]
}

const getTiketUrl = (code, params) => [
    'https://www.aviasales.ru/calendar',
    ...params,
    '&one_way=false',
    '&with_request=true',
    '&utm_source=internal&utm_medium=special',
    `&utm_campaign=${code}`,
    '&utm_nooverride=1'
].join('')

const fetchPrice = (from, to, code) => {

    const params = [
        `?destination_iata=${to.iata}`,
        `&origin_iata=${from}`,
        ...getMonths()
    ]

    const url = [
        'https://calendar-api.aviasales.ru/full/month',
        ...params,
        '&one_way=false',
        '&only_direct=false',
        '&max_trip_duration=14',
        '&min_trip_duration=7'

    ].join('')

    return fetch(url)
        .then(res => res.json())
        .then(json => {
            const price = json.months.map(month => Object.values(month.prices).sort((a, b) => a - b)[0]).sort((a, b) => a - b)[0]
            return {
                ...to,
                price,
                url: getTiketUrl(code, params)
            }

        })
}

export function loadPrices(dispatch, getState) {
    const { place: { current: { nearest: { iata: from } }, to }, texts: { counters_code: code } } = getState()

    const requests = to.map(el => fetchPrice(from, el, code))

    Promise.all(requests).then(to => {
        dispatch({
            type: PLACE_UPDATE_PRICES,
            to
        })
    })
}
