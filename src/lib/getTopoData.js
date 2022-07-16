import { json, csv } from 'd3'

export const getTopoCountries = async () => {
  let dataMap = new Map()
  let features

  const res = await Promise.all([
    json('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'),
    csv(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world_population.csv',
      (d) => {
        dataMap.set(d.code, +d.pop)
      }
    )
  ])

  features = await res[0].features
  return { dataMap, features }
}
