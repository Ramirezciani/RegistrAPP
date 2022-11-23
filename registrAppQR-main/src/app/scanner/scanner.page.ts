import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { NavigationExtras } from '@angular/router';
import { ApiService } from '../services/api.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit {

  texto: string = '';
  arreglo: any = '';

  correo = localStorage.getItem('correo');
  id_clase = localStorage.getItem("id_clase");
  asignatura = localStorage.getItem("asignatura");

  constructor(private router: Router, private api: ApiService, private loadingController: LoadingController, private toastController: ToastController) { }

  ngOnInit() {
  }

  async scanQR() {
    let that = this;
    this.texto = '';
    document.querySelector('body').classList.add('scanner-active');
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      setTimeout(function () {
        console.log(result.content);
        that.texto = result.content;
        that.arreglo = that.texto.split('|',2);
        localStorage.setItem('codigo', that.arreglo[1] );
        localStorage.setItem('asignatura', that.arreglo[0] );
        that.asistencia();
        that.router.navigate(['home'],{replaceUrl: true,});
        document.querySelector('body').classList.remove('scanner-active');
      }, 1000);
    }
  }

  // extrasNav() {
  //   let extras : NavigationExtras = {
  //     replaceUrl:true,
  //     state : {
  //       'cod': this.id_clase,
  //       'nom': this.asignatura
  //     }
  //   }
  //   this.router.navigate(['home'], extras);
  // }

  stopScan (){
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  asistencia(){
    let that = this;
    this.loadingController.create({
      message: 'Registrando',
      spinner: 'lines'
    }).then(async data => {
      data.present();
      try{
        let respuesta = await this.api.Asistencia(
          this.correo,
          this.id_clase)
          if(respuesta ["result"] === "OK")
          {
            that.presentToast('Registro Correcto');
            this.router.navigate(['home'],{replaceUrl: true,});  
          }else{
            that.presentToast('Registro Incorrecto');   
          }
        } catch (error) {
          //TODO INDICAR QUE OCURRIÓ UN ERROR CON LA API
        }
        data.dismiss();
        
    });

  }

  async presentToast(mensaje) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      position: 'bottom'
    });

  

}
}
