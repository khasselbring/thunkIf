import * as Graph from '@buggyorg/graphtools'
import addNodeAmount from '../src/main'
import chai from 'chai'
import fs from 'fs'

const expect = chai.expect

describe('» Playground', () => {
  it('can add Nodes', () => {
    const graph = Graph.flow(
      Graph.addNode({name: 'a', ports: [{port: 'out', kind: 'output', type: 'Number'}]}),
      Graph.addNode({name: 'b', ports: [{port: 'in', kind: 'input', type: 'Number'}]})
    )()

    expect(Graph.hasNode('a', graph)).to.be.true
    expect(Graph.hasNode('b', graph)).to.be.true
  })

  it('can add Edges', function () {
    const graph = Graph.flow(
      Graph.addNode({name: 'a', ports: [{port: 'out', kind: 'output', type: 'Number'}]}),
      Graph.addNode({name: 'b', ports: [{port: 'in', kind: 'input', type: 'Number'}]}),
      Graph.addEdge({name: 'a-to-b', from: 'a@out', to: 'b@in'})
    )()

    expect(Graph.hasNode('a', graph)).to.be.true
    expect(Graph.hasNode('b', graph)).to.be.true
    expect(Graph.edges(graph)).to.have.length(1)
    expect(Graph.areConnected('a', 'b', graph)).to.be.true
  })
})

describe('» Runtime', () => {
  it('has a runtime for adding nodes', () => {
    const size = 10

    var before = new Date()
    var graph = addNodeAmount(size)
    var after = new Date()
    var diff = after - before;

    expect(Graph.nodes(graph)).to.have.length(size)
    expect(diff).to.be.above(0)
  })

  it('increases runtime when adding more nodes', () => {
    var main = require('../src/main.js')
    var oldTime = 0;
    for(var i = 10; i <= 100; i += 10) {
      var newTime = main.executionTime(function() {
        addNodeAmount(i)
      })
      expect(newTime - oldTime).to.be.above(0)
      oldTime = newTime
    }
  })
})
