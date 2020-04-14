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
  listUser: any[];
  userId: number;
  check = false;
  message = '';
  isShow = false;
  isSuccess = true;
  constructor(private componentsService: ComponentsService, private route: Router) { }

  ngOnInit(): void {
    this.componentsService.listUser().subscribe( result => {
      this.listUser = result;
    });
  }
  checkUser() {
    const userName = this.formGroup.get('userName').value;
    const password = this.formGroup.get('password').value;
    for (let i = 0; i < this.listUser.length ; i++) {
      if (this.listUser[i].userName === userName && this.listUser[i].password === password) {
        this.check = true;
        this.userId = this.listUser[i].idChuNha;
        this.route.navigate(['/user/', this.userId]).then( (e) => {
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
