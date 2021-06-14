import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FridgeComponent } from './components/fridge/fridge.component';
import { ItemComponent } from './components/item/item.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';

@NgModule({
  declarations: [
    AppComponent,
    FridgeComponent,
    ItemComponent,
    ModalFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
