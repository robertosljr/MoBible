import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
    templateUrl: 'sign-in.component.html',
    styleUrls: ['sign-in.component.scss']
})
export class SignIn implements OnInit{

    constructor(private http: HttpClient,
                private loadingCtrl: LoadingController,
                private route: Router,
                private presentAlrt: AlertController){}

    ngOnInit(){
        let token = JSON.parse(localStorage.getItem('usuario'));
        if (token != undefined){
            this.route.navigate(['read']);
        }
    }
    
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

    async entrar(email,password){
        let body = { email: email.value, password: password.value };
        await this.loadingCtrl.create({
            spinner: 'dots' ,
            message: 'carregando',
            duration: 16000 
          }).then(a => {
              a.present().then(async () =>{
                await this.http.put('https://www.abibliadigital.com.br/api/users/token',body)
                    .toPromise()
                    .then((res) => {
                        localStorage.setItem('usuario',JSON.stringify(res));
                        this.loadingCtrl.dismiss().then(() => this.route.navigate(['read']));
                    })
                    .catch(() => {
                        this.loadingCtrl.dismiss()
                            .then(() => this.msg('','Usuário/senha inválidos'))
                    })
              });
            });
    }

}