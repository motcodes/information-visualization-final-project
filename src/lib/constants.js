// a collection of constants

export const ages = [
  'Under 18 years old',
  '18-24 years old',
  '25-34 years old',
  '35-44 years old',
  '45-54 years old',
  '55-64 years old',
  '65 years or older',
  'Prefer not to say'
]
export const margin = { top: 10, right: 0, bottom: 20, left: 50 }
export const width = 600 - margin.left - margin.right
export const height = 500 - margin.top - margin.bottom

export const countOccur = (dataset, key, searchValue) =>
  dataset.reduce((n, value) => {
    console.log(value[key])
    return n + (value[key] == searchValue)
  }, 0)
