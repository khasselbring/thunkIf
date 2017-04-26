import * as Graph from '@buggyorg/graphtools'
import * as Benchmark from 'main.js'

export function addNodes (n, graph = Graph.empty()) {
  graph = Benchmark.timesIntermediate(n, function (graph) {
    return Graph.flow(
      Graph.addNode({})
    )(graph)
  })(Graph.empty())

  return graph
}

export function addEdges (n, graph = Graph.empty()) {
  var nodes = graph.nodes()
  if (nodes.length < 2) { // TODO check for enough in and out ports
    Graph.flow(
      Graph.addNode({ports: [{port: 'out', kind: 'output', type: 'Number'}]}),
      Graph.addNode({ports: [{port: 'in', kind: 'output', type: 'Number'}]})
    )(graph)
  }
}
