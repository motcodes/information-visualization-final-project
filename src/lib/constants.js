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

export const edLevels = [
  'Bachelor’s degree (B.A., B.S., B.Eng., etc.)',
  'Secondary school (e.g. American high school, German Realschule or Gymnasium, etc.)',
  'Some college/university study without earning a degree',
  'Primary/elementary school',
  'Master’s degree (M.A., M.S., M.Eng., MBA, etc.)',
  'Other doctoral degree (Ph.D., Ed.D., etc.)',
  'Associate degree (A.A., A.S., etc.)',
  'NA'
]

export const margin = { top: 10, right: 20, bottom: 30, left: 250 }
export const width = 800 - margin.left - margin.right
export const height = 500 - margin.top - margin.bottom

export const countOccur = (dataset, key, searchValue) =>
  dataset.reduce((n, value) => {
    console.log(value[key])
    return n + (value[key] == searchValue)
  }, 0)
