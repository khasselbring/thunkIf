var fs = require('fs')

fs.readdirSync('./benchmarks/')

/*
const benchmarks = fs.readdirSync('./benchmarks/').map((file) => {
  console.log('benchmarks/' + file)
  return require('./benchmarks/' + file)
})

function benchmarkToString (b) {
  return b.name + b.data.join(',')
}

for (var i = 0; i < benchmarks.length; i++) {
  fs.writeFileSync('bench' + i, benchmarkToString(benchmarks[i]()))
}
*/
