import { Zone } from '../../models/zone.model';
import { Img } from '../../models/img.model';
import { Organism } from '../organism';
import { ScalePhases } from '../../enums/scalePhases.enum';

export class Chicken extends Organism {
  amount: ScalePhases;
  img: Img;
  loadedImg: any;
  zone: Zone;
  treshold: number;

  constructor(amount: ScalePhases, pHeight: number) {
    super(
      amount,
      pHeight,
      {
        size: 5,
        ratio: 0.75,
        file: './assets/img/chicken.png'
      },
      100
    );

    // this.amount = amount;
    // this.zone = {
    //   y: this.zone.y * pHeight,
    //   z: this.zone.z * pHeight,
    //   width: this.zone.width * pHeight,
    //   length: this.zone.length * pHeight,
    // };
    // this.img.size = pHeight * this.img.size / this.amount;
    // this.treshold = this.treshold / this.amount;
  }

  getZone(amount: ScalePhases): Zone {
    let zone: Zone;
    if (amount === ScalePhases.ONE) {
      zone = {
        x: -0.5,
        z: 0,
        width: 0.5,
        length: 0.5
      };
    } else if (amount === ScalePhases.TWO) {
      zone = {
        x: -0.75,
        z: 0,
        width: 0.75,
        length: 0.75
      };
    } else if (amount === ScalePhases.THREE) {
      zone = {
        x: -1,
        z: -0.5,
        width: 1.5,
        length: 2
      };
    }
    zone.x = zone.x * this.pHeight;
    zone.z = zone.z * this.pHeight;
    zone.width = zone.width * this.pHeight;
    zone.length = zone.length * this.pHeight;
    return zone;
  }
}
