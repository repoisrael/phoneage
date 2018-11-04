import { observable } from 'mobx';

class GameStore {
  @observable characterPosition = { x: 0, y: 0 };

  @observable stageX = 0;
  @observable stageY = 300;

  setCharacterPosition(position) {
    this.characterPosition = position;
  }

  setStageX(x) {
    if (x > 0) {
      this.stageX = 0;
    } else if (x < -100) {
      this.stageX = -100;
    } else {
      this.stageX = x;
    }
  }

  setStageY(y) {
    if (y > 0) {
      this.stageY = 0;
    } else if (y < -360) {
      this.stageY = -360;
    } else {
      this.stageY = y;
    }
  }
}

export default new GameStore();
