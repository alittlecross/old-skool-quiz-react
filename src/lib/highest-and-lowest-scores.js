const HighestAndLowestScores = players => {
  const obj = {
    highest: null,
    lowest: null
  }

  const scores = Object.values(players).map(value => value.score)

  const distinct = [...new Set(scores)].sort((a, b) => a - b)

  if (distinct.length > 1) {
    obj.highest = distinct.pop()

    const _0 = scores.filter(score => distinct[0] === score).length
    const _1 = scores.filter(score => distinct[1] === score).length
    const _2 = scores.filter(score => distinct[2] === score).length

    const _2nd = distinct.length > 1 && _0 < 3 && _0 + _1 < 5
    const _3rd = distinct.length > 2 && _0 < 3 && _0 + _1 < 4 && _0 + _1 + _2 < 5

    obj.lowest = _3rd ? distinct[2] : _2nd ? distinct[1] : distinct[0]
  }

  return obj
}

export default HighestAndLowestScores
