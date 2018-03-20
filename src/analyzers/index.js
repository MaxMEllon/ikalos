import _ from 'lodash'
import Table from '@maxmellon/cli-table'
const m = 100

const reducer = r =>
  r.reduce((acc, cur) => ({
    battleNum: r |> _.size,
    win: (acc.win || 0) + (cur.status.key === 'victory' ? 1 : 0),
    lose: (acc.lose || 0) + (cur.status.key === 'victory' ? 0 : 1),
    count: {
      kill: acc.count.kill + cur.count.kill,
      death: acc.count.death + cur.count.death,
      assist: acc.count.assist + cur.count.assist
    }
  }))

const values = d => {
  let rate = d.win / (d.win + d.lose) * 100
  if (_.isNaN(rate)) {
    rate = d.status.key === 'victory' ? 100 : 0
  }
  return [
    d.battleNum || 1,
    Math.floor(d.count.kill / d.count.death * m) / m,
    Math.floor((d.count.kill + d.count.assist) / d.count.death * m) / m,
    Math.floor(d.count.kill / (d.battleNum || 1) * m) / m,
    Math.floor(rate * 100 / 100) + '%'
  ]
}

export default data => {
  _.forEach(data, (i, rule) => {
    console.log(rule)
    const table = new Table({
      head: ['Stage', 'Waepon', 'BattleNum', 'k/d', 'k+a/d', 'k/battle', 'WinRate']
    })
    _.forEach(i, (j, stage) =>
      _.forEach(
        j,
        (k, weapon) =>
          reducer(k)
          |> values
          |> (r =>
            (r.unshift(weapon) && r) || r |> (r => (r.unshift(stage) && r) || r |> table.push))
      )
    )
    console.log(table.toString())
  })

  const table = new Table({
    head: ['BattleNum', 'k/d', 'k+a/d', 'k/battle', 'WinRate']
  })

  console.log('合計')
  data.flatten() |> reducer |> values |> table.push
  console.log(table.toString())
}
