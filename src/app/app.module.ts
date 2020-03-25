import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { ScaleVisualizationComponent } from './scale-visualization/scale-visualization.component';

@NgModule({
   imports: [
      BrowserModule,
      FormsModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFirestoreModule,
      HttpClientModule
   ],
   providers: [
      DataService
   ],
   declarations: [
      AppComponent,
      ScaleVisualizationComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule {}
