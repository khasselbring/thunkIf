import * as Graph from '@buggyorg/graphtools'
import * as Runtime from '../src/runtime'

export function addNodes (n, graph = Graph.empty()) {
  graph = Runtime.timesIntermediate(n, function (graph) {
    return Graph.addNode({}, graph)
  })(Graph.empty())

  return graph
}

export function addEdges (n, graph = Graph.empty()) {
  var nodes = Graph.nodes(graph)
  var nodesOut = nodes.filter(function (node) {
    return Graph.outputPorts(node).length > 0
  })
  var nodesIn = nodes.filter(function (node) {
    return Graph.inputPorts(node).length > 0
  })
  if (nodesOut.length < 1) {
    graph = Graph.addNode({ports: [{port: 'out', kind: 'output', type: 'Number'}]}, graph)
  }
  if (nodesIn.length < 1) {
    graph = Graph.addNode({ports: [{port: 'in', kind: 'output', type: 'Number'}]}, graph)
  }
  for (var i = 0; i < n; i++) {
    var nodeOut = nodesOut[Math.floor(Math.random() * nodesOut.length)]
    var nodeIn = nodesIn[Math.floor(Math.random() * nodesIn.length)]
    graph = Graph.addEdge({ from: '#' + nodeOut.id(), to: '#' + nodeIn.id() }, graph)
  }
}
