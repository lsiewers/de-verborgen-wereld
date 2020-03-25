import { Zone } from '../../models/zone.model';
import { Img } from '../../models/img.model';
import { Organism } from '../organism';
import { ScalePhases } from '../../enums/scalePhases.enum';

export class Cow extends Organism {
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
        size: 13,
        ratio: 1.4,
        file: './assets/img/cow.png'
      },
      1000
    );
  }

  getZone(amount: ScalePhases): Zone {
    let zone: Zone;
    if (amount === ScalePhases.ONE) {
      zone = {
        x: 0.5,
        z: 0,
        width: 0.5,
        length: 0.5
      };
    } else if (amount === ScalePhases.TWO) {
      zone = {
        x: 1,
        z: -1,
        width: 1,
        length: 1
      };
    } else if (amount === ScalePhases.THREE) {
      zone = {
        x: 1.5,
        z: -1.75,
        width: 2,
        length: 3
      };
    }
    zone.x = zone.x * this.pHeight;
    zone.z = zone.z * this.pHeight;
    zone.width = zone.width * this.pHeight;
    zone.length = zone.length * this.pHeight;
    return zone;
  }
}
