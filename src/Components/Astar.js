import React, { Component } from 'react';
import '../styles/Astar.css';

import astar from '../astar';

class Astar extends Component {
      constructor(props) {
            super(props);
            this.state = {
                  gridRows: 5,
                  gridColumns: 5,
                  modalOpen: false,
                  maze: [
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0]
                  ],
                  nodeType: null,
                  startNode: {
                        node: [0, 0],
                        f: 0,
                        g: 0,
                        h: 0,
                        parent: null
                  },
                  lastNode: {
                        node: [4, 4],
                        f: 0,
                        g: 0,
                        h: 0,
                        parent: null
                  },
                  cost: 0
            }
      }

      astarSearch() {
            let closedList = astar(this.state.maze, this.state.startNode, this.state.lastNode);
            let k;
            for (let i = 0; i < closedList.length; i++) {
                  k = i;
                  setTimeout(function () {
                        document.getElementById(`node_${closedList[i].node[0]}_${closedList[i].node[1]}`).style.backgroundColor = '#ebebe0';
                  }, 1000 * (k + 1));
            }
            setTimeout(() => {
                  this.setState({ cost: closedList.length - 1 });
            }, 1000 * (k + 1));
      }

      handleModal() {
            this.setState({ modalOpen: !this.state.modalOpen });
      }

      // astar() {
      //       let openList = [];
      //       let closedList = [];
      //       openList.push(this.state.startNode);
      // }

      selectNode(type) {
            this.setState({ modalOpen: true, nodeType: type });
      }

      handleNodeClick(i, j) {
            switch (this.state.nodeType) {
                  case 'start': {
                        if (this.state.startNode.node === null) {
                              document.getElementById(`node_${i}_${j}`).style.backgroundColor = '#ba124c';
                        } else {
                              document.getElementById(`node_${this.state.startNode.node[0]}_${this.state.startNode.node[1]}`).style.backgroundColor = '#ffffff';
                              document.getElementById(`node_${i}_${j}`).style.backgroundColor = '#ba124c';
                        }
                        this.state.nodeType = null;
                        this.state.startNode.node = [i, j];
                        break;
                  }
                  case 'last': {
                        if (this.state.lastNode.node === null) {
                              document.getElementById(`node_${i}_${j}`).style.backgroundColor = '#1339b7';
                        } else {
                              document.getElementById(`node_${this.state.lastNode.node[0]}_${this.state.lastNode.node[1]}`).style.backgroundColor = '#ffffff';
                              document.getElementById(`node_${i}_${j}`).style.backgroundColor = '#1339b7';
                        }
                        this.state.nodeType = null;
                        this.state.lastNode.node = [i, j];
                        break;
                  }
                  default: {
                        this.state.nodeType = null;
                        break;
                  }
            }
      }

      createGrid() {
            let maze = []
            for (let i = 0; i < this.state.gridRows; i++) {
                  maze[i] = []
                  for (let j = 0; j < this.state.gridColumns; j++) {
                        maze[i][j] = 0;
                  }
            }
            this.setState({ maze });
      }

      render() {
            return (
                  <div className="astar">
                        <div className="left-menu">
                              <h2>{'Enter grid dimensions:'}</h2>
                              <div className="grid-input">
                                    <input className="grid-number" onChange={(e) => this.setState({ gridRows: e.target.value })} type="number" value={this.state.gridRows} name="quantity" min="2" max="10" />
                                    <span>&nbsp; <b>X</b> &nbsp;</span>
                                    <input className="grid-number" onChange={(e) => this.setState({ gridColumns: e.target.value })} type="number" value={this.state.gridColumns} name="quantity" min="2" max="10" />
                              </div>
                              <button className="node-select-button" onClick={() => this.createGrid()}>{'Create Grid'}</button>
                              <button className="node-select-button" onClick={() => this.selectNode('start')}>Select start node</button>
                              <button className="node-select-button" onClick={() => this.selectNode('last')}>Select last node</button>
                              <button className="node-select-button" onClick={() => this.astarSearch()}>{'Start A* Search'}</button>
                        </div>
                        <div className="display">
                              {
                                    this.state.maze.map((row, i) =>
                                          <div
                                                key={`node_${i}`}
                                                className="row">
                                                {
                                                      row.map((item, j) =>
                                                            <div
                                                                  id={`node_${i}_${j}`}
                                                                  key={`node_${i}_${j}`}
                                                                  className="node"
                                                                  onClick={() => this.handleNodeClick(i, j)}
                                                                  style={{
                                                                        backgroundColor: (item === '8') ? 'rgb(218, 218, 218)' : (JSON.stringify([i, j]) === JSON.stringify(this.state.startNode.node)) ? '#ba124c' : (JSON.stringify([i, j]) === JSON.stringify(this.state.lastNode.node)) ? '#1339b7' : '#ffffff'
                                                                  }}>
                                                                  {
                                                                        `(${i}, ${j})`
                                                                  }
                                                            </div>
                                                      )
                                                }
                                                <br />
                                          </div>
                                    )
                              }
                              <div>
                                    <h2>Cost: {this.state.cost}</h2>
                              </div>
                        </div>
                        {
                              (this.state.modalOpen) &&
                              <div onClick={() => this.handleModal()} className="modal">
                                    <div className="dialog">
                                          <h2>{'Please select node by clicking on grid node!'}</h2>
                                          <button className="button" >{'OK'}</button>
                                    </div>
                              </div>
                        }
                  </div>
            );
      }
}

export default Astar;