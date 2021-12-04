class Rectangle extends GameObject {
  constructor(pos, width, height) {
    super(pos);
    this.width = width;
    this.height = height;
  }

  draw() {
    this.preDraw();
    if(!game.getAsset('car')){
      ctx.fillStyle = '#ff0000';
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
    }else{
      const img = game.getAsset('car');
      ctx.drawImage(img, -this.width / 2, -this.height / 2, this.width, this.height);
    }
    this.postDraw();
  }
}
