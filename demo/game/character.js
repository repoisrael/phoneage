import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import Matter from 'matter-js';

import { AudioPlayer, Body, Sprite } from '../../src';

@observer
export default class Character extends Component {
  static propTypes = {
    keys: PropTypes.object,
    onEnterBuilding: PropTypes.func,
    store: PropTypes.object,
  };

  static contextTypes = {
    engine: PropTypes.object,
    scale: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.loopID = null;
    this.isJumping = false;
    this.isPunching = false;
    this.isLeaving = false;
    this.lastX = 0;
    this.lastY = 0; 

    this.state = {
      characterState: 2,
      loop: false,
      spritePlaying: true,
    };

    this.handlePlayStateChanged = this.handlePlayStateChanged.bind(this);
    this.jump = this.jump.bind(this);
    this.punch = this.punch.bind(this);
    this.getDoorIndex = this.getDoorIndex.bind(this);
    this.enterBuilding = this.enterBuilding.bind(this);
    this.checkKeys = this.checkKeys.bind(this);
    this.update = this.update.bind(this);
  }

  componentDidMount() {
    this.jumpNoise = new AudioPlayer('/assets/jump.wav');
    Matter.Events.on(this.context.engine, 'afterUpdate', this.update);
  }

  componentWillUnmount() {
    Matter.Events.off(this.context.engine, 'afterUpdate', this.update);
  }

  getWrapperStyles() {
    const { characterPosition, stageX } = this.props.store;
    const { scale } = this.context;
    const { x, y } = characterPosition;
    const targetX = x + stageX;

    return {
      position: 'absolute',
      transform: `translate(${targetX * scale}px, ${y * scale}px)`,
      transformOrigin: 'left top',
    };
  }

  render() {
    const x = this.props.store.characterPosition.x;

    return (
      <div style={this.getWrapperStyles()}>
        <Body
          args={[x, 84,84,84]}
          inertia={0}
          ref={b => {
            this.body = b;
          }}
        >
          <Sprite
            repeat={this.state.repeat}
            onPlayStateChanged={this.handlePlayStateChanged}
            src="assets/character-sprite.png"
            scale={this.context.scale * 1}
            state={this.state.characterState}
            steps={[9, 9, 0, 4, 5]}
          />
        </Body>
      </div>
    );
  }

  handlePlayStateChanged(state) {
    this.setState({
      spritePlaying: state ? true : false,
    });
  };

  move(body, x, y) {
    if (x) {
    Matter.Body.setVelocity(body, { x, y:0 });
    }
    if (y){
      Matter.Body.setVelocity(body, { x:0, y });
    }
    console.log("x:" + body.position.x);
    console.log("y:" +body.position.y)
  };
  
  jump(body) {
    this.jumpNoise.play();
    this.isJumping = true;
    Matter.Body.applyForce(body, { x: 0, y: 0 }, { x: 0, y: 0 });
    Matter.Body.set(body, 'friction', 0.999);
  };

  punch() {
    this.isPunching = true;
    this.setState({
      characterState: 4,
      repeat: false,
    });
  };

  getDoorIndex(body) {
    let doorIndex = null;

    const doorPositions = [...Array(6).keys()].map(a => {
      return [512 * a + 208, 512 * a + 272];
    });

    doorPositions.forEach((dp, di) => {
      if (body.position.x + 64 > dp[0] && body.position.x + 64 < dp[1]) {
        doorIndex = di;
      }
    });

    return doorIndex;
  };

  enterBuilding(body) {
    const doorIndex = this.getDoorIndex(body);

    if (doorIndex !== null) {
      this.setState({
        characterState: 3,
      });
      this.isLeaving = true;
      this.props.onEnterBuilding(doorIndex);
    }
  };

  checkKeys(shouldMoveStageLeft, shouldMoveStageRight, shouldMoveStageUp, shouldMoveStageDown) {
    const { keys, store } = this.props;
    const { body } = this.body;

    let characterState = 2;


    if (keys.isDown(keys.UP )) {
      if (shouldMoveStageUp) {
        store.setStageY(store.stageY + 1);
        characterState = 3;
      }

      this.move(body, 0 , -1);
      characterState = 1;
    } else if (keys.isDown(keys.DOWN)) {
      if (shouldMoveStageDOWN) {
        store.setStageY(store.stageY - 1);
      }

      this.move(body, 0, 1);
      characterState = 0;
    }

    if (keys.isDown(65)) {
      return this.punch();
    }

    if (keys.isDown(keys.SPACE)) {
      this.jump(body);
    }


    if (keys.isDown(keys.LEFT)) {
      if (shouldMoveStageLeft) {
        store.setStageX(store.stageX + 1);
        characterState = 1;
      }

      this.move(body, -1);
      characterState = 1;
    } else if (keys.isDown(keys.RIGHT)) {
      if (shouldMoveStageRight) {
        store.setStageX(store.stageX - 1);
      }

      this.move(body, 1);
      characterState = 0;
    }

    this.setState({
      characterState,
      repeat: characterState < 2,
    });
  };

  update() {
    const { store } = this.props;
    const { body } = this.body;

    const midPoint = Math.abs(store.stageX) + 0;
    const midVert = Math.abs(store.stageY) + 0; 

    const shouldMoveStageLeft = body.position.x < midPoint && store.stageX < 344;
    const shouldMoveStageRight =
      body.position.x > midPoint && store.stageX > -344;

      const shouldMoveStageUp = body.position.y < midVert && store.stageY < 700;
      const shouldMoveStageDown =
        body.position.y > midVert && store.stageY > 700;


    const velY = parseFloat(body.velocity.y.toFixed(1));

    if (velY === 0) {
      this.isJumping = false;
      Matter.Body.set(body, 'friction', 0);
    }

    if (!this.isJumping && !this.isPunching && !this.isLeaving) {
      this.checkKeys(shouldMoveStageRight,shouldMoveStageLeft,shouldMoveStageUp , shouldMoveStageDown );

      store.setCharacterPosition(body.position);
    } else {
      if (this.isPunching && this.state.spritePlaying === false) {
        this.isPunching = false;
      }
      if (this.isJumping) {
        store.setCharacterPosition(body.position);
      }
      const targetX = store.stageX + (this.lastX - body.position.x);
      if (shouldMoveStageLeft || shouldMoveStageRight) {
        store.setStageX(targetX);
      
      
      const targetY = store.stageY + (this.lastY - body.position.y);
        if (shouldMoveStageUp || shouldMoveStageDown) {
          store.setStageY(targetY);
        }}

    }

    this.lastX = body.position.x;
    this.lastY  = body.position.y;

  };
}
  