import { json } from 'd3'
import { feature, mesh } from 'topojson'

const countriesUrl = 'https://unpkg.com/world-atlas@2.0.2/countries-50m.json'

export const getTopoData = async () => {
  // json(countriesUrl).then((topology) => {
  //   const { countries, land } = topology.objects
  //   data = {
  //     land: feature(topology, land),
  //     interiors: mesh(topology, countries, (a, b) => a !== b)
  //   }
  // })

  const topology = await json(countriesUrl)
  const { countries, land } = topology.objects
  const data = {
    land: feature(topology, land),
    interiors: mesh(topology, countries, (a, b) => a !== b)
  }
  return data
}
