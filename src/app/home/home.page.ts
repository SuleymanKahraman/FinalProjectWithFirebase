import { Component, OnInit } from '@angular/core';
import { FirebaseService, demirbaslar, personeller } from '../firebase.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';
import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  personeller?: personeller[];

  constructor(
    public modalController: ModalController,
    public fireService: FirebaseService,
    public alertController: AlertController
  ) {}

  ngOnInit() {
    this.fireService.listPersonel().subscribe((result) => {
      this.personeller = result;
      console.log(this.personeller);
    });
  }

  async updatePersonel(personel:personeller) {

    console.log(personel);
    debugger;
    const alert = await this.alertController.create({
      header: 'Personel Bilgileri',
      inputs: [
        {
          name: 'ad',
          placeholder: 'İsim giriniz...',
          type: 'text',
          value: personel.ad
        },
        {
          name: 'soyad',
          placeholder: 'Soyisim giriniz...',
          type: 'text',
          value:personel.soyad
        },
        {
          name: 'sicilNo',
          placeholder: '4 Haneli Sicil No giriniz...',
          type: 'number',
          value:personel.sicilNo,
          min:1,
          max: 9999,
          attributes: {
            length: 4, 
          },
        
        },
      ],
      buttons: [
        {
          text: 'Vazgeç',
          role: 'Cancel',
        },
        // {
        //   text: 'Ekle',
        //   handler: (res) => {
        //    const newPersonel = {
        //     ad:res.ad,
        //     soyad:res.soyad,
        //     sicilNo:res.sicilNo
        //    }
        //     this.fireService.addNewPersonel(newPersonel); 
        //   },
        // },
      ],

    })
      await alert.present();
  }

  async addNewPersonel() {
    const alert = await this.alertController.create({
      header: 'Personel Bilgileri',
      inputs: [
        {
          name: 'ad',
          placeholder: 'İsim giriniz...',
          type: 'text',
        },
        {
          name: 'soyad',
          placeholder: 'Soyisim giriniz...',
          type: 'text',
        },
        {
          name: 'sicilNo',
          placeholder: '4 Haneli Sicil No giriniz...',
          type: 'number',
          min:1,
          max: 9999,
          attributes: {
            length: 4, 
          },
        
        },
      ],
      buttons: [
        {
          text: 'Vazgeç',
          role: 'Cancel',
        },
        {
          text: 'Ekle',
          handler: (res) => {
           const newPersonel = {
            ad:res.ad,
            soyad:res.soyad,
            sicilNo:res.sicilNo
           }
            this.fireService.addNewPersonel(newPersonel); 
          },
        },
      ],
    });
    await alert.present();
  }

  async DetayGoster(personelId) {
    const modal = await this.modalController.create({
      component: ModalPage,
      componentProps: { id: personelId },
    });

    modal.present();
  }
}
