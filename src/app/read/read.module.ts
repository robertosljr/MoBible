import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReadPage } from './read.page';

import { ReadPageRoutingModule } from './read-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReadPageRoutingModule
  ],
  declarations: [ReadPage]
})
export class ReadPageModule {}
