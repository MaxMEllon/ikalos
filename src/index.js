import { glob, open } from './utils'
import ResultFactory from './factories/ResultFactory'
import analyzers from './analyzers'

const loadLogAsync = async () => {
  try {
    const promises = (await glob()).map(async f => await f |> open)
    const data = (await Promise.all(promises)).map(d => d |> JSON.parse)
    return ResultFactory.create(data).grouping()
  } catch (err) {
    console.error(err)
  }
}

loadLogAsync().then(res => res |> analyzers)
