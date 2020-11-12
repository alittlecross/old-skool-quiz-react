const HighestAndLowestScores = players => {
  const scores = Object.values(players).map(value => value.score)

  const distinct = [...new Set(scores)].sort((a, b) => a - b)

  let highest, lowest

  if (distinct.length > 1) {
    highest = distinct.pop()

    const _0 = scores.filter(score => distinct[0] === score).length
    const _1 = scores.filter(score => distinct[1] === score).length
    const _2 = scores.filter(score => distinct[2] === score).length

    const _2nd = distinct.length > 1 && _0 < 3 && _0 + _1 < 5
    const _3rd = distinct.length > 2 && _0 < 3 && _0 + _1 < 4 && _0 + _1 + _2 < 5

    lowest = _3rd ? distinct[2] : _2nd ? distinct[1] : distinct[0]
  }

  return {
    highest,
    lowest
  }
}

export default HighestAndLowestScores
