import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Matter from 'matter-js';


import { AudioPlayer, Loop, Stage, KeyListener, World } from '../../src';

import Character from './character';
import Level from './level';
import Fade from './fade';

import GameStore from './stores/game-store';

export default class Game extends Component {
  static propTypes = {
    onLeave: PropTypes.func,
  };

  componentDidMount() {
    this.player = new AudioPlayer('/assets/background.mp3', () => {
      this.stopMusic = this.player.play({
        loop: true,
        offset: 1,
        volume: 0.35,
      });
    });

    this.setState({
      fade: false,
    });

    this.keyListener.subscribe([
      this.keyListener.LEFT,
      this.keyListener.RIGHT,
      this.keyListener.UP,
      this.keyListener.SPACE,
      65,
    ]);
  }

  componentWillUnmount() {
    this.stopMusic();
    this.keyListener.unsubscribe();
  }

  render() {
    return (
      <Loop>
        <Stage style={{
	  background: `url("../assets/water.png") top left`,
	  backgroundSize : "cover"
	
	}}>
          <World onInit={this.physicsInit}>
            <Level store={GameStore} />
            <Character
              onEnterBuilding={this.handleEnterBuilding}
              store={GameStore}
              keys={this.keyListener}
            />
          </World>
        </Stage>
        <Fade visible={this.state.fade} />
      </Loop>
    );
  }

  physicsInit(engine) {
    const ground = Matter.Bodies.rectangle(0, 448, 1024, 560, {
      isStatic: true,
    });

    const leftWall = Matter.Bodies.rectangle(-64, 188, 128, 576, {
      isStatic: true,
    });

    const rightWall = Matter.Bodies.rectangle(160, 188, 64, 576, {
      isStatic: true,
    });


    const topWall = Matter.Bodies.rectangle(-64, 188, 128, 576, {
      isStatic: true,
    });

    const bottomWall = Matter.Bodies.rectangle(284, 188, 64, 576, {
      isStatic: true,
    });
    

    Matter.World.addBody(engine.world, ground);
    Matter.World.addBody(engine.world, leftWall);
    Matter.World.addBody(engine.world, rightWall);
    Matter.World.addBody(engine.world, topWall);
    Matter.World.addBody(engine.world, bottomWall);
  };

  handleEnterBuilding(index) {
    this.setState({
      fade: true,
    });
    setTimeout(() => {
      this.props.onLeave(index);
    }, 500);
  };

  constructor(props) {
    super(props);

    this.state = {
      fade: true,
    };
    this.keyListener = new KeyListener();
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.context = window.context || new AudioContext();

    this.handleEnterBuilding = this.handleEnterBuilding.bind(this);
  }
}
