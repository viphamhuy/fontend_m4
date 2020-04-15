import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ComponentsService} from '../../components.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-homepage',
  templateUrl: './login-homepage.component.html',
  styleUrls: ['./login-homepage.component.scss']
})
export class LoginHomepageComponent implements OnInit {
  formGroup = new FormGroup({
    userName: new FormControl(),
    password: new FormControl()
  });
  listCustomer: any[];
  customerId: any;
  check = false;
  message = '';
  isShow = false;
  isSuccess = true;
  constructor(private componentsService: ComponentsService, private route: Router) { }

  ngOnInit(): void {
    this.componentsService.getListCustomer().subscribe( result => {
      this.listCustomer = result;
    });
  }
  checkUser() {
    const userName = this.formGroup.get('userName').value;
    const password = this.formGroup.get('password').value;
    for (let i = 0; i < this.listCustomer.length ; i++) {
      if (this.listCustomer[i].userName === userName && this.listCustomer[i].password === password) {
        this.check = true;
        this.customerId = this.listCustomer[i].idCustomer;
        localStorage.setItem('idCustomer', this.listCustomer[i]);
        console.log(this.customerId);
        this.route.navigate(['//', this.customerId ]).then( (e) => {
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
