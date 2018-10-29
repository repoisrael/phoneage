import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { autorun } from 'mobx';

import { TileMap } from '../../src';

import GameStore from './stores/game-store';

export default class Level extends Component {
  static contextTypes = {
    scale: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      stageX: 0,
    };
  }

  componentDidMount() {
    this.cameraWatcher = autorun(() => {
      const targetX = Math.round(GameStore.stageX * this.context.scale);
      this.setState({
        stageX: targetX,
      });
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const targetX = Math.round(GameStore.stageX * nextContext.scale);
    this.setState({
      stageX: targetX,
    });
  }

  componentWillUnmount() {
    this.cameraWatcher();
  }

  getWrapperStyles() {
    return {
      position: 'absolute',
      transform: `translate(${this.state.stageX}px, 0px) translateZ(0)`,
      transformOrigin: 'top left',
    };
  }

  render() {
    return (
      <div style={this.getWrapperStyles()}>
      
<TileMap
          style={{ top: Math.floor(0 * this.context
.scale) }} 
          src="assets/stone.png"
          tileSize={32}
          columns={11}
          rows={22}
          layers={[
            [
         	    0,0,0,0,0,0, 0,0,0,0,0, 
		    
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		    1,1,1,1,1,1, 0,0,0,0,0,
		    1,0,0,0,0,1, 0,0,0,0,0,
		    1,1,0,0,0,1, 1,0,0,0,0,

		    0,1,0,0,0,0, 1,1,0,0,0,
		    0,1,0,0,0,0, 0,1,1,0,0,
		    0,1,0,0,0,0, 0,0,1,1,0,
		    0,1,0,0,0,0, 0,0,0,1,0,
		    0,1,0,0,0,0, 0,0,0,1,0,

		    0,1,1,0,0,0, 0,0,1,1,0,
		    0,0,1,0,0,0, 0,0,1,0,0,
		    0,0,1,1,0,0, 0,0,1,0,0,
		    0,0,0,1,1,1, 1,1,1,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,

		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,

		    0,0,0,0,0,0, 0,0,0,0,0,
            ],
          ]}
        />

	<TileMap                                             style={{ top: Math.floor(0 * this.context.scale) }}
	    src="assets/floor.png"
	    tileSize={32}
	    columns={11}
	    rows={22}
	    layers={[
	[
		0,0,0,0,0,0, 0,0,0,0,0,
		
		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,1,1,0,0, 0,0,0,0,0,
		  
		    0,0,1,1,1,0, 0,0,0,0,0,
		    0,0,0,1,1,1, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,1,1, 1,0,0,0,0,

		    0,0,0,0,0,1, 1,1,0,0,0,
		    0,0,0,0,0,0, 1,1,0,0,0,
		    0,0,0,0,0,0, 1,1,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		  
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,
		    0,0,0,0,0,0, 0,0,0,0,0,

		0,0,0,0,0,0, 0,0,0,0,0,
	  ],
	]}
        />

<TileMap                                             style={{ top: Math.floor(0 * this.context.scale) }}                                                     	src="assets/entry.jpg"                             tileSize={32}
	columns={11}                                       rows={22}                                          layers={[                                              [
		0,0,0,0,0,0, 0,0,0,0,0,

		0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,1,0,0, 0,0,0,0,0,                                                                               0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,                                                                               0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                                                                               0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,

		0,0,0,0,0,0, 0,0,0,0,0,                    ],                                               ]}                                                       />
	    <TileMap                                             style={{ top: Math.floor(0 * this.context.scale) }}                                                     src="assets/exit.jpg"                              tileSize={32}
            columns={11}
            rows={22}
            layers={[
                [                                                  0,0,0,0,0,0, 0,0,0,0,0,

                0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                                                                               0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,
                                                                   0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,1,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                                                                               0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,                                                                               0,0,0,0,0,0, 0,0,0,0,0,                    ],                                               ]}                                                       />
	
	<TileMap
          style={{ top: Math.floor(0 * this.context.scale) }}
	    src="assets/down.jpg"
	    tileSize={32}
	    columns={11}
	    rows={22}
	    layers={[
		[
		0,0,0,0,0,0, 0,0,0,0,0,
		
		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,  

		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,0,0,1,1, 0,0,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,
		0,0,0,0,0,0, 0,0,0,0,0,

		0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,

		0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,
                0,0,0,0,0,0, 0,0,0,0,0,                            0,0,0,0,0,0, 0,0,0,0,0,

		0,0,0,0,0,0, 0,0,0,0,0,
	],                                               ]} 
	    />

	    <TileMap
	    style={{
		    top:Math.floor(0 * this.context.scale),
		    left: Math.floor(32 * this.context.scale),
		
	    }}

          src="assets/stone.png"
       	  tileSize={96}
           columns={4}
 	  rows={7}
	    layers={[
                [
		0,0,0,0,
		0,0,0,0,
		0,0,0,0,
		0,0,0,0,
                0,0,0,0,

                0,0,0,0,
                1,0,0,0
		],
	    ]}
	    />

	    <TileMap
            style={{
                    top:Math.floor(32 * this.context.scale),                               left: Math.floor(64 * this.context.scale),
                                                                                    }}

          src="assets/stone.png"
          tileSize={96}
           columns={4}                                                            rows={7}
            layers={[
                [
                0,0,0,0,
                0,0,0,0,
                0,0,0,0,                                                                0,0,0,0,                                                                0,0,0,0,
                0,0,1,0,
                0,0,0,0
                ],                                                                  ]}
            />
      </div>
    );
  }
}
