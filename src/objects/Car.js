class Car extends Rectangle {
  constructor(pos) {
    super(pos, 100, 50);
  }

  onMove(pos) {
    super.onMove(pos);

    gameObjects[1].carPos = pos;
  }
}
