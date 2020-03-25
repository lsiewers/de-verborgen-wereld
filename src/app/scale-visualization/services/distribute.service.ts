import { Injectable } from '@angular/core';
import { Organism } from '../classes/organism';
import { Pig } from '../classes/organisms/pig';
import { People } from '../classes/organisms/people';
import { Chicken } from '../classes/organisms/chicken';
import { Cow } from '../classes/organisms/cow';
import { ScalePhases } from '../enums/scalePhases.enum';
import { Me } from '../classes/organisms/me';

@Injectable({
  providedIn: 'root'
})
export class DistributeService {
  distribute(
    p5: any,
    phase: ScalePhases,
    amount: number,
    type: Cow | Chicken | People | Pig | Me,
  ) {
    amount = Math.round(amount);

    const zoneBoundings = {
      xStart: type.getZone(phase).x - type.getZone(phase).width / 2,  // x starts in the middle
      xEnd: type.getZone(phase).x + type.getZone(phase).width / 2,
      zStart: type.getZone(phase).z - type.getZone(phase).length / 2, // z starts in front
      zEnd: type.getZone(phase).z + type.getZone(phase).length / 2
    };

    if (phase <= ScalePhases.THREE && amount > 0 &&
      type.takenPositions.length < amount &&
      type.takenPositions.length > 0) {

      const yPos = p5.displayHeight / 2 - type.img.size / 2;

      // inside draw function
      // if not all of them are spawned and the spawn rate is higher than 1

      // if not all of them are spawned and amount is more than 1
      for (let organism = 0; organism + 1 < amount;) {
        const xPosRandom = this.randomPos(p5, zoneBoundings.xStart, zoneBoundings.xEnd);
        const zPosRandom = this.randomPos(p5, zoneBoundings.zStart, zoneBoundings.zEnd);
        const lookDir = Math.round(Math.random()); // if 0, look left and otherwise
        // random pos
        // if already taken, return;
        // if not, processed++; and draw picture
        // als de eerste toegevoegd is, kijk of je er niet overheen spawnt
        for (const pos of type.takenPositions) {
          if (p5.dist(xPosRandom, yPos, zPosRandom, pos.x, yPos, pos.z) > type.treshold / 2) {
            type.takenPositions.push({ x: xPosRandom, z: zPosRandom, lookDirection: lookDir });
            organism++;
            break;
          }
        }

      }
    } else if (type.takenPositions.length < 1 && amount > 0) {
      type.takenPositions.push(
        {
          x: this.randomPos(p5, zoneBoundings.xStart, zoneBoundings.xEnd),
          z: this.randomPos(p5, zoneBoundings.zStart, zoneBoundings.zEnd),
          lookDirection: Math.round(Math.random())
        }
      );
    }

    type.takenPositions.forEach(pos => this.drawOrganism(p5, type, pos));
  }

  reset(type: Organism) { type.takenPositions = []; }
  randomPos(p5, start, end): number { return p5.map(Math.random(), 0, 1, start, end); }

  drawOrganism(p5: any, type: Cow | Chicken | People | Pig, pos: { x: number, z: number, lookDirection: number }) {
    p5.push();
    p5.translate(
      pos.x,
      p5.windowHeight / 2 - type.img.size / 2,
      pos.z
    );
    p5.noStroke();
    p5.fill(0, 0, 0, 0);
    p5.texture(type.loadedImg);
    p5.plane(
      pos.lookDirection ? -(type.img.size * type.img.ratio) : type.img.size * type.img.ratio,
      type.img.size
    );
    p5.pop();
  }
}

