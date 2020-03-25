import { Component, OnInit, HostListener } from '@angular/core';
import p5 from 'p5';
import { DataService } from '../services/data.service';
import { People } from './classes/organisms/people';
import { DistributeService } from './services/distribute.service';
import { Chicken } from './classes/organisms/chicken';
import { Cow } from './classes/organisms/cow';
import { Pig } from './classes/organisms/pig';
import { Camera } from './classes/camera';
import { ScalePhases } from './enums/scalePhases.enum';
import { Me } from './classes/organisms/me';

@Component({
  selector: 'app-scale-visualization',
  templateUrl: './scale-visualization.component.html',
  styleUrls: ['./scale-visualization.component.scss']
})
export class ScaleVisualizationComponent implements OnInit {
  private p5: p5;
  showAmount: ScalePhases = ScalePhases.TWO;
  people: People;
  chicken: Chicken;
  cow: Cow;
  pig: Pig;
  me: Me;
  cameraProps: Camera;
  prevAmount: ScalePhases;
  relativeAmounts = {
    chicken: 0,
    pigs: 0,
    cows: 0,
    people: 0
  };
  dataYear = 2018;
  data = {
    chicken: 0,
    pigs: 0,
    cows: 0,
    population: 0
  };

  constructor(
    private dataService: DataService,
    private distrService: DistributeService
  ) {}

  ngOnInit() {
    this.setData().then(() => this.setupP5());
  }

  // p5 sketch
  private sketch: p5 = p => {

    p.preload = () => this.loadImages(p);

    // p5 setup function
    p.setup = () => p.createCanvas(p.windowWidth, p.windowHeight, p.WEBGL).parent('sketch-holder');

    p.draw = () => {
      p.background('#55F2B9');

      // this.sliderBasedCamera(p);
      this.cameraProps.setCamera(p, this.showAmount);

      // https://p5js.org/reference/#/p5/perspective

      p.translate(0, 0, -p.height / 2);
      // p.noFill();
      // p.stroke('#fff');
      // p.box(p.height, p.height, p.height);

      // this.drawZones(p);
      // this.onAmountChange().then(() => {
      //   this.resetDistribution();
      //   this.setRelativeAmounts();
      // });
      this.distributeOrganisms(p);
    };
  }

  setAmount(n: ScalePhases) {
    this.showAmount = n;

    this.resetDistribution();
    this.setRelativeAmounts();
  }

  // async onAmountChange(): Promise<any> {
  //   return await new Promise((resolve, reject) => {
  //     if (this.showAmount !== this.prevAmount) {
  //       resolve();
  //       this.prevAmount = this.showAmount;
  //     }
  //   });
  // }

  async setData(): Promise<any> {
    return await new Promise((resolve) => {
      this.dataService.getDataQuery('aantal-bevolking', ['type', '==', 'Totale bevolking']).then(docs => {
        docs.forEach(doc => this.data.population = Number.parseFloat(doc.data()['2018']));
      }).finally(() => {
        this.dataService.getDataCollection('aantal-vee').then(docs => {
          docs.forEach(doc => this.data[doc.data().type] = doc.data()['2018']);
        }).finally(() => resolve());
      });
    });
  }

  setRelativeAmounts() {
    this.relativeAmounts.cows = this.data.cows / this.data.population * this.showAmount;
    this.relativeAmounts.chicken = this.data.chicken / this.data.population * this.showAmount;
    this.relativeAmounts.pigs = this.data.pigs / this.data.population * this.showAmount;
    this.relativeAmounts.people = this.showAmount - 1;
  }

  setupP5() {
    // p5 object
    this.p5 = new p5(this.sketch);
    this.setAmount(this.showAmount);
    this.cameraProps = new Camera();
  }

  loadImages(p) {
    this.people = new People(this.showAmount,  p.windowHeight);
    this.chicken = new Chicken(this.showAmount,  p.windowHeight);
    this.cow = new Cow(this.showAmount,  p.windowHeight);
    this.pig = new Pig(this.showAmount,  p.windowHeight);
    this.me = new Me(this.showAmount,  p.windowHeight);
    this.people.loadImage(p);
    this.chicken.loadImage(p);
    this.cow.loadImage(p);
    this.pig.loadImage(p);
    this.me.loadImage(p);
  }

  drawZones(p) {
    // if (this.showAmount > 1) { // temporary
      this.people.drawZone(p, this.people.getZone(this.showAmount));
      this.cow.drawZone(p, this.cow.getZone(this.showAmount));
      this.pig.drawZone(p, this.pig.getZone(this.showAmount));
      this.chicken.drawZone(p, this.chicken.getZone(this.showAmount));
    // }
  }

  resetDistribution() {
    this.distrService.reset(this.people);
    this.distrService.reset(this.chicken);
    this.distrService.reset(this.cow);
    this.distrService.reset(this.pig);
    this.distrService.reset(this.me);
  }

  distributeOrganisms(p) {
    // if (this.showAmount > 1) { // temporary
      this.distrService.distribute(p, this.showAmount, 1, this.me);
      this.distrService.distribute(p, this.showAmount, this.relativeAmounts.people, this.people);
      this.distrService.distribute(p, this.showAmount, this.relativeAmounts.chicken, this.chicken);
      this.distrService.distribute(p, this.showAmount, this.relativeAmounts.cows, this.cow);
      this.distrService.distribute(p, this.showAmount, this.relativeAmounts.pigs, this.pig);
    // }
  }

  @HostListener('window:resize')
  resize() {
    this.p5.resizeCanvas(window.innerWidth, window.innerHeight);
  }
}
