import { HttpClient } from "@angular/common/http";
import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, LoadingController } from "@ionic/angular";

@Component({
    templateUrl: 'sign-up.component.html',
    styleUrls: ['sign-up.component.scss']
})
export class SignUp {

    constructor(private loadingCtrl: LoadingController,
                private http: HttpClient,
                private route: Router,
                private presentAlrt: AlertController){}

    async msg(header,message){
        let alert = await this.presentAlrt.create({
            cssClass: 'my-custom-class',
            header,
            subHeader: '',
            message,
            buttons: ['OK']
          });
      
          await alert.present();
    }

    async cadastrar(nome,email,senha){
        let body = { name: nome.value, email: email.value, password: senha.value, notifications: false };
        await this.loadingCtrl.create({
            spinner: 'dots' ,
            message: 'carregando',
            duration: 16000 
          }).then(async a => {
              a.present().then(async () =>{
                await this.http.post('https://www.abibliadigital.com.br/api/users',body)
                    .toPromise()
                    .then(() => {
                        this.loadingCtrl.dismiss()
                            .then(() => {
                                this.msg('','Cadastrado com sucesso!')
                                    .then(() => this.route.navigate(['signin']))
                            })
                    .catch(() => this.msg('','Erro na requisição!'))
                    })
              });
          });
    }

}