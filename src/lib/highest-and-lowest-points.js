const HighestAndLowestPoints = players => {
  const arr = []

  const obj = {
    highest: null,
    lowest: null
  }

  for (const value of Object.values(players)) {
    arr.push(value.points)
  }

  const distinct = [...new Set(arr)].sort((a, b) => a - b)

  if (distinct.length > 1) {
    const _0 = arr.filter(point => distinct[0] === point).length
    const _1 = arr.filter(point => distinct[1] === point).length
    const _2 = arr.filter(point => distinct[2] === point).length

    const _3rd = _0 + _1 + _2 <= 4
    const _2nd = _0 + _1 <= 4

    obj.highest = distinct.pop()
    obj.lowest = _3rd ? distinct[2] : _2nd ? distinct[1] : distinct[0]
  }

  return obj
}

export default HighestAndLowestPoints
