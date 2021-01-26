import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SignIn } from './sign-in.component';
import { SignInRoutingModule } from './sign-in-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignInRoutingModule
  ],
  declarations: [SignIn]
})
export class SignInModule {}