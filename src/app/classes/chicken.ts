export class Chicken {
  xPosMax: number;
  xPosMin: number;
  size: number;
  amount: number;

  imgPath: './assets/img/chicken.png';

  constructor(xPosMax, xPosMin, size, amount) {
    this.xPosMin = xPosMin;
    this.xPosMax = xPosMax;
    this.size = size;
    this.amount = amount;
  }

  distribute() {
    for (let i = 0; i < this.amount; i++) {

    }
  }
}
