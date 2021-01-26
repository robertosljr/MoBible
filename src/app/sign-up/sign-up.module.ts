import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SignUp } from './sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignUpRoutingModule
  ],
  declarations: [SignUp]
})
export class SignUpModule {}