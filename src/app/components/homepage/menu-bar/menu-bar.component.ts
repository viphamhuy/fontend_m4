import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  listHouse: any[];
  checkLogin = true;
  listCustomer: any[];
  customerId: any;
  customerName: any;
  check = false;
  message = '';
  isShow = false;
  isSuccess = true;
  formGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl(),
    search: new FormControl(),
    input: new FormControl(),
    output: new FormControl()
  });
  constructor(private componentsService: ComponentsService,  private route: Router) { }

  ngOnInit(): void {
    this.componentsService.getListCustomer().subscribe(result => {
      this.listCustomer = result;
    });
  }
  public searchByDiaChi() {
    const diaChi = this.formGroup.get('search').value;
    this.componentsService.searchByDiaChi(diaChi).subscribe( result => {
      this.listHouse = result;
    });
  }

  public searchBySlPhongNgu() {
    const soLuong = this.formGroup.get('search').value;
    this.componentsService.searchBySoLuongPhongNgu(soLuong).subscribe( result => {
      this.listHouse = result;
    });
  }

  public searchBySlPhongTam() {
    const soLuong = this.formGroup.get('search').value;
    this.componentsService.searchBySoLuongPhongTam(soLuong).subscribe( result => {
      this.listHouse = result;
    });
  }
  public searchBetween() {
    const input = this.formGroup.get('input').value;
    const output = this.formGroup.get('output').value;
    this.componentsService.searchBetween(input, output).subscribe( result => {
      this.listHouse = result;
    });
  }
  login() {
    this.checkLogin = false;
  }
  exit() {
    this.checkLogin = true;
  }
  checkUser() {
    const userName = this.formGroup.get('userName').value;
    const password = this.formGroup.get('password').value;
    for (let i = 0; i < this.listCustomer.length ; i++) {
      if (this.listCustomer[i].userName === userName && this.listCustomer[i].password === password) {
        this.check = true;
        this.customerId = this.listCustomer[i].idCustomer;
        this.customerName = this.listCustomer[i].ten;
        console.log(this.listCustomer[i].userName);
        console.log(this.listCustomer[i].password);
        this.route.navigate(['//']).then( (e) => {
          if (e) {
            console.log('Navigation is successful!');
          } else {
            console.log('Navigation has failed!');
          }
        });
      }
      // else {
      //   this.isShow = true;
      //   this.isSuccess = false;
      //   this.message = 'Sai tài khoản hoặc mật khẩu.';
      //   this.isLoading = false;
      //   this.formGroup.reset();
      // }
    }
  }
}
