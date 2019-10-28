import {actionsFn, state as s, getters as g} from '../../factories/store'
import {prepareSeries, dimMonth, dimYearFactory, dimYearOptionsFactory} from '../../assets/bi'
import alasql from 'alasql'
export {mutations} from '../../factories/store'

const moduleName = 'bi/dashsource'

export const actions = {
  ...actionsFn(moduleName),
  init ({commit}) {
  }
}
export const state = () => ({
  ...s()
})

export const getters = {
  ...g,
  filteredList: s => s.list,
  // imChannel: (s, g) => extractDimension(g.filteredList, 'origin'),
  dimYear: dimYearFactory('opened_year'),
  currentYear: (s, g) => g.dimYear[g.dimYear.length - 1],
  previousYear: (s, g) => g.dimYear[g.dimYear.length - 2],
  previous2Year: (s, g) => g.dimYear[g.dimYear.length - 3],
  previous3Year: (s, g) => g.dimYear[g.dimYear.length - 4],
  previous4Year: (s, g) => g.dimYear[g.dimYear.length - 5],
  previous5Year: (s, g) => g.dimYear[g.dimYear.length - 6],

  dimMonth,
  dimYearOptions: dimYearOptionsFactory('opened_year'),
  dimChannel: s => ['BOOKINGONE', 'EMAIL'],
  costByYear_Channel: (s, g) => {
    return alasql('SELECT max(rescount) as rescount, COUNT(*) as items, opened_year, opened_month, origin FROM ? GROUP BY opened_year, opened_month, origin ORDER BY opened_year, origin', [g.filteredList])
  },
  countByYear_Month: (s, g) => {
    return alasql('SELECT max(rescount) as rescount, COUNT(*) as items, opened_year, opened_month FROM ? GROUP BY opened_year, opened_month ORDER BY opened_year, opened_month', [g.filteredList])
  },
  costByMonth_ChannelSerie: (s, g) => prepareSeries(
    g.costByYear_Channel,
    'origin',
    g.dimChannel,
    'opened_month',
    g.dimMonth,
    'rescount'
  ),
  countByYear: (s, g) => {
    if (g.filteredList && g.filteredList.length) { return alasql('SELECT sum(rescount) as total, COUNT(*) as items, opened_year FROM ? GROUP BY opened_year ORDER BY opened_year, opened_month', [g.filteredList]) } else { return [] }
  },
  yearPieData: (s, g) => {
    const res = g.countByYear.reduce(
      (r, v) => {
        r[v.opened_year] = v.total
        return r
      }, {})
    console.dir(res)
    return res
  },
  costByMonth_ChannelSerieYearFactory: (s, g) => (year, filedName) => prepareSeries(
    g.costByYear_Channel.filter(o => o[filedName] === year),
    'origin',
    g.dimChannel,
    'opened_month',
    g.dimMonth,
    'rescount'

  ),
  countByYear_MonthSerie: (s, g) => prepareSeries(
    g.countByYear_Month,
    'opened_year',
    g.dimYear,
    'opened_month',
    g.dimMonth,
    'rescount'
  )
}
