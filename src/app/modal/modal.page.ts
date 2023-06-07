import { Component, OnInit,Input} from '@angular/core';
import { FirebaseService, demirbaslar } from '../firebase.service';
import { AlertController} from '@ionic/angular';
import { Router } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {

  @Input() id?:string;

  demirbaslar?: demirbaslar[];
  onlyDate: string;
  constructor(
    public fireService: FirebaseService,
    public alertController: AlertController,
  ) { 
    // this.fireService.listDemirbasByID().subscribe((result) => {
    //   this.demirbaslar = result;
    //   console.log(this.demirbaslar);
    // });

    
  }

  ngOnInit() {
    const timeData = Timestamp.fromDate(new Date()).toDate();
    const year = timeData.getFullYear();
    const month = timeData.getMonth() + 1;
    const day = timeData.getDate();
    this.onlyDate = `${day}/${month}/${year}`;

  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Demirbaş Giriniz!',
      inputs: [
        {
          name: 'ad',
          placeholder: 'ad giriniz...',
          type: 'text',
        },
        {
          name: 'tur',
          placeholder: 'türü giriniz...',
          type: 'text',
        },

        {
          name: 'adet',
          placeholder: 'adeti giriniz...',
          type: 'number',
          min: 1,
          max: 100,
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
            let demirbas = {
              ad: res.ad,
              tur: res.tur,
              adet: res.adet,
              kayitTarih: this.onlyDate,
            };
            //this.fireService.addNewDemirbas(demirbas);
          },
        },
      ],
    });
    await alert.present();
  }


}
