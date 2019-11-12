var iterations = 0

var print_board = function (columns) {
  var n = columns.length, row = 0, col = 0
  while (row < n) {
    while (col < n) {
      process.stdout.write(columns[row] === col ? 'Q ' : '# ')
      col++
    }

    process.stdout.write('\n')
    col = 0
    row++
  }
}

var isAttacked = function (columns) {
  var len = columns.length, last = columns[len - 1], previous = len - 2

  while (previous >= 0) {
    if (columns[previous] === last) return true
    if (last - (len - 1) === columns[previous] - previous) return true
    if (last + (len - 1) === columns[previous] + previous) return true
    previous--
  }

  return false
}

var PlaceNextQueen = function (total, queens, columns) {
  if (queens === 0) return columns
  columns = columns || []

  for (var column = 0; column < total; column++) {
    columns.push(column)
    iterations++
    if (!isAttacked(columns) &&
        PlaceNextQueen(total, queens - 1, columns)) {
      return columns
    }
    columns.pop(column)
  }

  return null
}

print_board(PlaceNextQueen(5, 5))
console.log('\niterations: ', iterations)
