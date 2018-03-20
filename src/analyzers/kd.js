import _ from 'lodash'

const m = 100

export default (data) => {
  const rules = Object.keys(data)
  const stages = rules.map(k => Object.keys(data[k])) |> _.flatten
  const d =  data.flatten().reduce((acc, cur, idx) => {
    return {
      battleNum: idx,
      count: {
        kill:  acc.count.kill + cur.count.kill,
        death: acc.count.death + cur.count.death,
        assist: acc.count.assist + cur.count.assist,
      }
    }
  })

  return {
    battleNum: d.battleNum,
    'k/d':     Math.floor(d.count.kill / d.count.death * m) / m,
    '(k+a)/d': Math.floor((d.count.kill + d.count.assist) / d.count.death * m) / m,
  }
}
