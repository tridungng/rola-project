import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FridgeComponent } from './components/fridge/fridge.component';
import { ItemComponent } from './components/item/item.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';

import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: '', component: MainComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FridgeComponent,
    ItemComponent,
    ModalFormComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { scrollPositionRestoration: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
