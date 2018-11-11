import React, { Component } from 'react';
import '../styles/Home.css';
import Astar from './Astar';

class Home extends Component {
      constructor(props) {
            super(props);
            this.state = {

            }
      }

      render() {
            return (
                  <div className="home">
                        <div className="header">
                              <h1>{'A* Implementation'}</h1>
                        </div>
                        <Astar/>
                  </div>
            );
      }
}

export default Home;