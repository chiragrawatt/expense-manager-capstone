import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/material/material.module';

import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './components/loader/loader.component';
import { EventCardComponent } from './components/event-card/event-card.component';



@NgModule({
  declarations: [
    LoaderComponent,
    EventCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  exports: [
    LoaderComponent,
    EventCardComponent
  ]
})
export class SharedModule { }
