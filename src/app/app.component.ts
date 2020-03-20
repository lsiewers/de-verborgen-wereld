import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor (private dataService: DataService) {}

  ngOnInit(): void {
    // this.writeBevolkingAantal();
    // this.writeVeeAantal();
  }

  writeVeeAantal() {
    this.dataService.getLocalData('aantal-vee.json').then(data => data.forEach(obj => {
      // de dieren die ik wil includen
      const includedAnimals = ["Rundvee", "Schapen", "Varkens", "Kippen"]
      // het type vee ophalen uit JSON object
      const animalType: string = obj.__1;

      includedAnimals.forEach(animal => {
        // als het object gaat over het type vee dat ik wil includen
        if(animalType.includes(animal) && animalType.includes("totaal")) {
          // sla alleen naam op en data vanaf 2016 op
          // write een doc met deze data naar FireBase
          // this.dataService.writeDoc('aantal-vee', {
          //   "type": animal,
          //   "2016": obj["2016"],
          //   "2017": obj["2017"],
          //   "2018": obj["2018"],
          //   "2019": obj["2019"]
          // });
        }
      })
    }));
  }

  writeBevolkingAantal() {

    this.dataService.getLocalData('bevolking.json').then(data => data.forEach(obj => {
      const type: string = obj["Bevolking; kerncijfers"];

      // get totale bevolking en aantal man/vrouw
      if(type.includes("Bevolking naar geslacht")) {
        this.dataService.writeDoc('aantal-bevolking', {
          "type": type.split('|')[1],
          "2015": obj.FIELD10,
          "2018": obj.FIELD11,
          "2019": obj.FIELD12
        });

      }
    }));
  }
}
