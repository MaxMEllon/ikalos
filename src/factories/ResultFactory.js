import _ from 'lodash'
import Result from '../models/Result'

const collection = []

collection.has = result => (collection.find(d => d.id === result.id) ? true : false)

collection.toObj = () =>
  // deep clone
  collection.map(r => r.record |> JSON.stringify |> JSON.parse)

const byRule = r => r.rule.name
const byStage = r => r.stage.name
const byWeapon = r => r.weapon

collection.grouping = () => {
  const group = {}
  const tmp = _.groupBy(collection.toObj(), byRule)
  Object.keys(tmp).forEach(rule => {
    group[rule] = _.groupBy(tmp[rule], byStage)
    Object.keys(group[rule]).forEach(stage => {
      group[rule][stage] = _.groupBy(group[rule][stage], byWeapon)
    })
  })
  Object.defineProperty(group, 'flatten', {
    value: () => collection.toObj(),
    writable: false,
    enumerable: false
  })
  return group
}

export default {
  create(data) {
    data.forEach(d =>
      d.results.forEach(r => {
        const result = new Result(r)
        if (collection.has(result)) return
        collection.push(result)
      })
    )
    return collection
  }
}
