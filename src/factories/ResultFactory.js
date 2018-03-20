import _ from 'lodash'
import Result from '../models/Result'

const collection = []

collection.has = result => collection.find(d => d.id === result.id) ? true : false

collection.toObj = () => (
  collection.map(r => Object.assign({}, r.record))
)

const byRule = r => r.rule.key
const byStage = r => r.stage.name

collection.grouping = () => {
  const group = {}
  const tmp = _.groupBy(collection.toObj(), byRule)
  Object.keys(tmp).forEach(key => {
    group[key] = _.groupBy(tmp[key], byStage)
  })
  return group
}

export default {
  create(data) {
    data.forEach(d => (
      d.results.forEach(r => {
        const result = new Result(r)
        if (collection.has(result)) return
        collection.push(result)
      })
    ))
    return collection
  }
}
