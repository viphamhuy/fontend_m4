import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsComponent } from './components.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ComponentsService} from './components.service';
import { HomepageComponent } from './homepage/homepage.component';
import { FooterComponent } from './homepage/footer/footer.component';
import { HotNewsComponent } from './homepage/hot-news/hot-news.component';
import { MenuBarComponent } from './homepage/menu-bar/menu-bar.component';
import { SideBarComponent } from './homepage/side-bar/side-bar.component';
import {BodyNewsComponent} from './homepage/body-news/body-news.component';
import { UserComponent } from './user/user.component';
import { HouseListComponent } from './user/house-list/house-list.component';
import { AddHouseComponent } from './user/add-house/add-house.component';
import { EditHouseComponent } from './user/edit-house/edit-house.component';
import { ShowDetailsComponent } from './homepage/show-details/show-details.component';
import { SideBarUserComponent } from './user/side-bar-user/side-bar-user.component';
import { HomeListComponent } from './user/home-list/home-list.component';
import { ShowDetailHouseComponent } from './user/show-detail-house/show-detail-house.component';
import { LoginComponent } from './user/login/login.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { ShowDetailUserComponent } from './user/show-detail-user/show-detail-user.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { LoginHomepageComponent } from './homepage/login-homepage/login-homepage.component';
import { SignupHomepageComponent } from './homepage/signup-homepage/signup-homepage.component';



@NgModule({
  declarations: [
    // tslint:disable-next-line:max-line-length
    ComponentsComponent, BodyNewsComponent, HomepageComponent, FooterComponent, HotNewsComponent, MenuBarComponent, SideBarComponent, UserComponent, HouseListComponent, AddHouseComponent, EditHouseComponent, ShowDetailsComponent, SideBarUserComponent, HomeListComponent, ShowDetailHouseComponent, LoginComponent, SignUpComponent, ShowDetailUserComponent, EditUserComponent, LoginHomepageComponent, SignupHomepageComponent],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    HomepageComponent,
    MenuBarComponent,
    HotNewsComponent,
    BodyNewsComponent,
    SideBarComponent,
    FooterComponent
  ],
  providers: [ComponentsService]
})
export class ComponentsModule { }
