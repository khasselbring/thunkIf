import * as Graph from '@buggyorg/graphtools'
import * as Runtime from '../src/main'
import chai from 'chai'

const expect = chai.expect

describe('» Playground', () => {
  it('can add Nodes', () => {
    const graph = Graph.flow(
      Graph.addNode({ name: 'a', ports: [{ port: 'out', kind: 'output', type: 'Number' }] }),
      Graph.addNode({ name: 'b', ports: [{ port: 'in', kind: 'input', type: 'Number' }] })
    )()

    expect(Graph.hasNode('a', graph)).to.be.true
    expect(Graph.hasNode('b', graph)).to.be.true
  })

  it('can add Edges', function () {
    const graph = Graph.flow(
      Graph.addNode({ name: 'a', ports: [{ port: 'out', kind: 'output', type: 'Number' }] }),
      Graph.addNode({ name: 'b', ports: [{ port: 'in', kind: 'input', type: 'Number' }] })
    )()

    expect(Graph.hasNode('a', graph)).to.be.true
    expect(Graph.hasNode('b', graph)).to.be.true
    expect(Graph.edges(graph)).to.have.length(0)
    expect(Graph.areConnected('a', 'b', graph)).to.be.false

    const graph2 = Graph.addEdge({ name: 'a-to-b', from: 'a@out', to: 'b@in' }, graph)

    expect(Graph.edges(graph2)).to.have.length(1)
    expect(Graph.areConnected('a', 'b', graph2)).to.be.true

    const edge = Graph.Edge.normalize({ from: 'a@out', to: 'b@in' })
    const graph3 = Graph.addEdge(edge, graph)

    expect(Graph.edges(graph3)).to.have.length(1)
    expect(Graph.areConnected('a', 'b', graph3)).to.be.true
  })
})

describe('» Runtime', () => {
  it('has a runtime for adding nodes', () => {
    const size = 10

    var before = new Date()
    var graph = Runtime.addNodeAmount(size)
    var after = new Date()
    var diff = after - before

    expect(Graph.nodes(graph)).to.have.length(size)
    expect(diff).to.be.above(0)
  })

  it('increases runtime when adding more nodes', () => {
    var timings = []

    for (var i = 10; i <= 200; i += 10) {
      timings.push(Runtime.executionTime(function () {
        Runtime.addNodeAmount(i)
      }))
    }

    expect(true).to.be.true
  })
})

describe('» Behavior', () => {
  it('Correctly detects linear Behavior', () => {
    const values = [0, 1, 2, 3, 4, 5, 6]

    expect(Runtime.hasGrowthBehavior(values, 'linear', 10)).to.be.true
  })

  it('Correctly detects missing linear Behavior', () => {
    const values = [0, 1, 2, 7, 4, 5, 6]

    expect(Runtime.hasGrowthBehavior(values, 'linear', 10)).to.be.false
  })

  it('Correctly detects exponential Behavior', () => {
    const values = [1, 2, 4, 8, 16, 32]

    expect(Runtime.hasGrowthBehavior(values, 'exponential', 10)).to.be.true
  })

  it('Correctly detects missing exponential Behavior', () => {
    const values = [1, 2, 4, 5, 16, 32]

    expect(Runtime.hasGrowthBehavior(values, 'exponential', 10)).to.be.false
  })
})
