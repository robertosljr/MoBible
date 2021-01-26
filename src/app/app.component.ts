import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AlertController, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  book;
  books;
  version;
  token;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private AlertController:AlertController,
    private LoadingController:LoadingController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  async presentAlert(titulo,subtitulo,mensagem) {
    const alert = await this.AlertController.create({
      cssClass: 'my-custom-class',
      header: titulo,
      subHeader: subtitulo,
      message: mensagem,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentLoading(mensagem,duracao) {
    const loading = await this.LoadingController.create({
      cssClass: 'my-custom-class',
      spinner: 'dots',
      message: mensagem,
      duration: duracao
    }).then( b => {
        b.present().then( async () => {
          this.presentAlert('','','Entrou!');
        });
    });
  }


}
