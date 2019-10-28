import _sortBy from 'lodash/sortBy'
import _uniqBy from 'lodash/uniqBy'

export const prepareSeries = (list, serieName, serieValues, dimensionName, dimensionValues, valueAttributeName, filter = null) => {
  let baseValues = []
  let cache = {}

  if (filter) {
    serieValues = serieValues.filter(filter)
  }

  for (let i = 0; i < serieValues.length; i++) {
    let serie = {name: serieValues[i], data: {}}
    cache[serieValues[i]] = serie

    for (let j = 0; j < dimensionValues.length; j++) {
      let dimension = dimensionValues[j]
      serie.data[dimension] = 0
    }

    baseValues.push(serie)
  }

  for (let i = 0; i < list.length; i++) {
    let rec = list[i]
    let curSerieName = rec[serieName]
    let curDimName = rec[dimensionName]
    let serie = cache[curSerieName]
    console.log(curDimName, valueAttributeName, rec)
    if (serie && serie.data) serie.data[curDimName] = rec[valueAttributeName]
  }

  return baseValues
}

export const extractDimension = (list, dimension) => _sortBy(_uniqBy(list, dimension), dimension).reduce((r, o) => {
  r.push(o[dimension])
  return r
}, [])

export const dimYears = [2016, 2017, 2018, 2019]
export const curYear = dimYears[dimYears.length - 1]

export const dimYearFactory = (yearField, years = dimYears) => {
  return (s, g) => {
    if (!s.filter[yearField] || s.filter[yearField].length === 0) return years
    return s.filter[yearField].sort()
  }
}

export const dimYearOptionsFactory = (yearField) => {
  return (s, g) => extractDimension(s.list, yearField)
}
export const dimMonth = (s, g) => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

export const monthNames = (lang = 'it') => ['GEN', 'FEB', 'MAR', 'APR', 'MAG', 'GIU', 'LUG', 'AGO', 'SET', 'OTT', 'NOV', 'DIC']

export const libraryMonth = {
  xAxis: {categories: monthNames()}
}
export const biPax = [
  'Families',
  'Couples',
  'Single'
]
export const biChannels = [
  'C',
  'D',
  'G',
  'I',
  'L',
  'M',
  'R',
  'T',
  'V'
]

export const biGeneralLibrary = {
  plotOptions: {
    line: { allowPointSelect: true, cursor: 'pointer', depth: 35, dataLabels: { enabled: false } },
    column: { allowPointSelect: true, cursor: 'pointer', depth: 35, dataLabels: { enabled: true } }
  }
}

export const mapPie = (list, label, value) => {
  const res = list.reduce(
    (r, v) => {
      r[v[label]] = v[value]
      return r
    }, {})
  return res
}
