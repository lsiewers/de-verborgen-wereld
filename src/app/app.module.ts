import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AantallenVisualizatieComponent } from './aantallen-visualizatie/aantallen-visualizatie.component';

@NgModule({
   imports: [
      BrowserModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      HttpClientModule
   ],
   providers: [
      DataService
   ],
   declarations: [
      AppComponent,
      AantallenVisualizatieComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
