import { glob, open } from './utils'
import ResultFactory from './factories/ResultFactory'


const loadLog = async () => {
  try {
    const promises = (await glob()).map(async f => await f |> open)
    const data = (await Promise.all(promises)).map(d => d |> JSON.parse)
    const results = ResultFactory.create(data)
    console.log(results.grouping())
  } catch (err) {
    console.error(err)
  }
}

loadLog()
