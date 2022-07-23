<script>
  import { onMount } from 'svelte'
  import { mean } from 'd3'

  import AgeRowchart from './ageRowchart.svelte'
  import EdLevelRowchart from './edLevelRowchart.svelte'
  import SalaryAgeRowchart from './salaryAgeRowchart.svelte'
  import SalaryEdLevelRowchart from './salaryEdLevelRowchart.svelte'

  export let data
  export let countryName

  const { countryDevelopers } = data

  let country = []
  const ageData = new Map()
  const edLevelData = new Map()
  const salaryAgeData = new Map()
  const salaryEdLevelData = new Map()
  let maxSalary = 0

  // onMount runs on the first render
  // inside the loop the ageData, edLevelData, salaryAgeData and salaryEdLevelData for the barcharts is set,
  // which updates each time another country is clicked on
  onMount(() => {
    country = countryDevelopers.get(countryName)
    console.log(country)
    ageData.clear()
    edLevelData.clear()
    salaryAgeData.clear()

    country.forEach((item) => {
      let ageValue = ageData.get(item.Age) || 0
      ageValue += 1
      ageData.set(item.Age, ageValue)

      let edLevelValue = edLevelData.get(item.EdLevel) || 0
      edLevelValue += 1
      edLevelData.set(item.EdLevel, edLevelValue)

      let salary = Number.isNaN(parseInt(item.CompTotal)) ? 0 : parseInt(item.CompTotal)
      if (salary > 1) {
        let salaryAgeValue = salaryAgeData.get(item.Age) || []
        salaryAgeData.set(item.Age, [...salaryAgeValue, salary])

        let salaryEdLevelValue = salaryEdLevelData.get(item.EdLevel) || []
        salaryEdLevelData.set(item.EdLevel, [...salaryEdLevelValue, salary])
      }
    })
    maxSalary = Math.max(...[...salaryAgeData.values()].map((item) => mean(item)))
  })
</script>

<div>
  <AgeRowchart {ageData} {country} />
  <EdLevelRowchart {edLevelData} {country} />
  <SalaryAgeRowchart {salaryAgeData} {country} {maxSalary} />
  <SalaryEdLevelRowchart {salaryEdLevelData} {country} {maxSalary} />
</div>
