import { json, csv } from 'd3'

// the stackoverflow and world.geojson data don't always have the same country names
// this function corrects the stackoverflow country name to the geojson names.
const changeCountryNames = (item) => {
  switch (item.Country) {
    case 'United Kingdom of Great Britain and Northern Ireland':
      item.Country = 'England'
      break
    case 'United States of America':
      item.Country = 'USA'
      break
    case 'Iran, Islamic Republic of...':
      item.Country = 'Iran'
      break
    case 'Russian Federation':
      item.Country = 'Russia'
      break
    default:
      break
  }
  return item
}

export const getTopoCountries = async () => {
  // fetches world geoJson data and world population
  const res = await Promise.all([
    json(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson',
      (item) => ({ ...item, isActive: false })
    ),
    csv('/Stackoverflow2021.csv')
  ])

  let developerPerCountry = new Map()
  let countryDevelopers = new Map()

  // **************
  // add global data
  // **************
  let features = await res[0].features
  let stackoverflow = await res[1].map((item) => {
    const newItem = changeCountryNames(item)

    // looks if country is already in map if not there are no developers yet (0)
    // adds one and updates the map value.
    let developerCount = developerPerCountry.get(newItem.Country) || 0
    developerCount += 1
    developerPerCountry.set(newItem.Country, developerCount)
    const countryData = countryDevelopers.get(newItem.Country) || []
    countryDevelopers.set(newItem.Country, [...countryData, newItem])

    return {
      ...newItem,
      Country: newItem.Country
    }
  })

  return { countryDevelopers, developerPerCountry, features, stackoverflow }
}
