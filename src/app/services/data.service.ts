import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentData } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {
  cattle: Observable<any[]>;

  constructor(
    private db: AngularFirestore,
    private http: HttpClient
    ) {}

  getLocalData(fileName: string): Promise<Array<any>> {
    return this.http.get(`../../assets/data/${fileName}`).toPromise() as Promise<Array<any>>;
  }

  getDataCollection(collection: string): Promise<DocumentData> {
    return this.db.firestore.collection(collection).get() as Promise<DocumentData>;
  }

  getDataQuery(collection: string, query: [string, any, any]): Promise<DocumentData> {
    return this.db.firestore.collection(collection).where(query[0], query[1], query[2]).get() as Promise<DocumentData>;
  }

  // voeg document toe aan database
  writeDoc(path: string, data: any): Promise<DocumentData> {
    return this.db.collection(path).add(data);
  }

  // // Update document
  // updateDoc(path: string, data: any): Promise<void> {
  //   return this.db.doc(path).set(data);
  // }
}
