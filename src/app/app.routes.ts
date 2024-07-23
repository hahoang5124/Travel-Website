import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductdetailComponent } from './productdetail/productdetail.component';
import { ToursComponent } from './tours/tours.component';
import { TimkiemComponent } from './timkiem/timkiem.component';
import { GiohangComponent } from './giohang/giohang.component';
import { DangkyComponent } from './dangky/dangky.component';
import { DangnhapComponent } from './dangnhap/dangnhap.component';
import { ThongtinnguoidungComponent } from './thongtinnguoidung/thongtinnguoidung.component';
import { DoimatkhauComponent } from './doimatkhau/doimatkhau.component';
export const routes: Routes = [
    {path:"",component:HomeComponent},
    {path:"home",component:HomeComponent},
    {path:"productdetail/:id",component:ProductdetailComponent},
    {path:"tours",component:ToursComponent},
    {path:"timkiem",component:TimkiemComponent},
    {path:"giohang",component:GiohangComponent},
    {path:"dangky",component:DangkyComponent},
    {path:"dangnhap",component:DangnhapComponent},
    {path:"userInfo",component:ThongtinnguoidungComponent},
    {path:"changepassword",component:DoimatkhauComponent}
];
