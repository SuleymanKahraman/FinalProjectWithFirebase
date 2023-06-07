import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  updateDoc,
  doc,
  docData,
  orderBy,
  query,} from '@angular/fire/firestore';


  export interface demirbaslar{
    id?: string;
    ad?: string;
    tur?:string;
    adet?: string;
    kayitTarih?: string; 
  }

  export interface personeller{
    id?: string;
    ad?: string;
    soyad?:string;
    sicilNo?: number;
  }

  export interface yoneticiler{
    email?: string;
    password?: string;
  }

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(public fireStore: Firestore) {}

  listDemirbasByID(personelId){
    const demirbaslar = collection(this.fireStore, `personel/${personelId}/demirbaslar`);
    //const siraliDemirbaslar = query(demirbaslar, orderBy('ad', 'asc'));
    return collectionData(demirbaslar, {idField: 'id'}); 
  }

  listPersonel(){

    const personel = collection(this.fireStore, 'personel');
    return collectionData(personel, {idField: 'id'});

  }

  // getPersonelById(personelId){

  //   const currentPersonel = collection(this.fireStore, `personel/${personelId}`);
  //   return collectionData()
  // }

  addNewDemirbasById(demirbas: demirbaslar, personelId ){

    const addDemirbas = collection(this.fireStore, `personel/${personelId}/demirbaslar`); 
    return addDoc(addDemirbas, demirbas); 
  }

  addNewPersonel(personel: personeller){

    const addPersonel = collection(this.fireStore, 'personel');
    console.log(addPersonel);
    debugger;
    return addDoc(addPersonel, personel);
  }


}

