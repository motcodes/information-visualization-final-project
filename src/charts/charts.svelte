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
    // reset maps
    ageData.clear()
    edLevelData.clear()
    salaryAgeData.clear()

    // get active country from url
    country = countryDevelopers.get(countryName)

    country.forEach((item) => {
      // counting age values
      let ageValue = ageData.get(item.Age) || 0
      ageValue += 1
      ageData.set(item.Age, ageValue)

      // counting ed level values
      let edLevelValue = edLevelData.get(item.EdLevel) || 0
      edLevelValue += 1
      edLevelData.set(item.EdLevel, edLevelValue)

      // parsing the salary corretly
      let salary = Number.isNaN(parseInt(item.ConvertedCompYearly))
        ? 0
        : parseInt(item.ConvertedCompYearly)
      if (salary > 1) {
        // mapping the salary over the age data
        let salaryAgeValue = salaryAgeData.get(item.Age) || []
        salaryAgeData.set(item.Age, [...salaryAgeValue, salary])

        // mapping the salary over the ed level data
        let salaryEdLevelValue = salaryEdLevelData.get(item.EdLevel) || []
        salaryEdLevelData.set(item.EdLevel, [...salaryEdLevelValue, salary])
      }
    })
    // calculating the max mean salary of this country
    maxSalary = Math.max(...[...salaryAgeData.values()].map((item) => mean(item)))
  })
</script>

<!-- HTML Markup -->
<div class="container">
  <div class="wrapper">
    <h2>Developer Ages in {countryName}</h2>
    <AgeRowchart {ageData} {country} />
  </div>
  <div class="wrapper">
    <h2>Developer Education Levels in {countryName}</h2>
    <EdLevelRowchart {edLevelData} {country} />
  </div>

  <div class="wrapper">
    <h2>Developers Mean Salaries over their Age in {countryName}</h2>
    <SalaryAgeRowchart {salaryAgeData} {country} {maxSalary} />
  </div>
  <div class="wrapper">
    <h2>Developers Mean Salaries over their Education Level in {countryName}</h2>
    <SalaryEdLevelRowchart {salaryEdLevelData} {country} {maxSalary} />
  </div>
</div>

<!-- Scoped Styles -->
<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 5rem;
  }

  .wrapper {
    padding: 1rem;
    background-color: #f6f6f6;
    border: 1.5px solid #dbdbdb;
    border-radius: 6px;
  }
  h2 {
    margin-top: 1rem;
    text-align: center;
  }
</style>
