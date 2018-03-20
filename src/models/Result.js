import Rule from './Rule'

export default class Result {
  constructor(obj) {
    this.record = {
      startAt: obj.start_time,
      id: obj.battle_number,
      rule: obj.rule,
      status: obj.my_team_result,
      stage: {
        id: obj.stage.id,
        name: obj.stage.name,
      },
      count: {
        kill: obj.player_result.kill_count,
        death: obj.player_result.death_count,
        special: obj.player_result.special_count,
        assist: obj.player_result.assist_count,
        paint: obj.player_result.game_paint_point,
        sort: obj.player_result.sort_score,
      }
    }
  }

  get id() {
    return this.record.id
  }

  get startAt() {
    return this.record.startAt
  }
}
