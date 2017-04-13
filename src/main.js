import * as Graph from '@buggyorg/graphtools'

function times(n, f) {
  return function() {
    for (var i = 0; i < n; i++) {
      f(arguments)
    }
  }
}

function timesIntermediate(n, f) {
  return function(x) {
    for (var i = 0; i < n; i++) {
      x = f(x)
    }
    return x
  }
}

/**
 * Runs a function and measures the time needed to do so
 * 
 * @param {function} f The function to run
 * @returns {milliseconds} The time used by the function
 */
exports.executionTime = function (f) {
  var before = new Date()
  f()
  var after = new Date()
  return after - before
}

export default function addNodeAmount(amount) {
  var graph = timesIntermediate(amount, function(graph) {
    return Graph.flow(
      Graph.addNode({})
    )(graph)
  })(Graph.empty())

  return graph
}
