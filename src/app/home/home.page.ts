import { Component, OnInit } from '@angular/core';
import { FirebaseService, demirbaslar, personeller } from '../firebase.service';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
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
  handlerMessage = '';
  roleMessage = '';

  constructor(
    public modalController: ModalController,
    public fireService: FirebaseService,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.fireService.listPersonel().subscribe((result) => {
      this.personeller = result;
      console.log(this.personeller);
    });
  }

  async updatePersonel(personel: personeller) {
    const alert = await this.alertController.create({
      header: 'Personel Bilgileri',
      inputs: [
        {
          name: 'ad',
          placeholder: 'İsim giriniz...',
          type: 'text',
          value: personel.ad,
        },
        {
          name: 'soyad',
          placeholder: 'Soyisim giriniz...',
          type: 'text',
          value: personel.soyad,
        },
        {
          name: 'sicilNo',
          placeholder: '4 Haneli Sicil No giriniz...',
          type: 'number',
          value: personel.sicilNo,
          min: 1,
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
          text: 'Güncelle',
          handler: async (res) => {
            if (res.sicilNo > 9999) {
              const toast = await this.toastController.create({
                message: 'Sicil No 4 Haneli Olmalıdır!',
                duration: 2000,
                color: 'danger',
              });
              toast.present();
              this.updatePersonel(personel);
          }else{
            personel.ad = res.ad;
            personel.soyad = res.soyad;
            personel.sicilNo = res.sicilNo;
            this.fireService.updatePersonel(personel);
          }
        },
      }
      ],
    });
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
        },
      ],
      buttons: [
        {
          text: 'Vazgeç',
          role: 'Cancel',
        },
        {
          text: 'Ekle',
          handler: async (res) => {
            if (res.sicilNo > 9999) {
              const toast = await this.toastController.create({
                message: 'Sicil No 4 Haneli Olmalıdır!',
                duration: 2000,
                color: 'danger',
              });
              toast.present();
              this.addNewPersonel();
            } else {
              const newPersonel = {
                ad: res.ad,
                soyad: res.soyad,
                sicilNo: res.sicilNo,
              };
              this.fireService.addNewPersonel(newPersonel);
            }
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

  async deleteAllert(id: any) {
    const alert = await this.alertController.create({
      header: 'Silmek İstediğinizden Emin misiniz?',
      buttons: [
        {
          text: 'Vazgeç',
          role: 'Cancel',
          handler: async () => {
            const toast = await this.toastController.create({
              message: 'Silme İşlemi İptal Edildi!',
              duration: 2000,
              color: 'danger',
            });
            toast.present();
          },
        },
        {
          text: 'Evet',
          role: 'confirm',
          handler: async () => {
            this.fireService.deletePersonelById(id);
            const toast = await this.toastController.create({
              message: 'Silme İşlemi Başarılı!',
              duration: 2000,
              color: 'success',
            });
            toast.present();
          },
        },
      ],
    });
    await alert.present();
  }
}
