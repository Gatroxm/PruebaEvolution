import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formaLogin: FormGroup;
  constructor( private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.formaLogin  = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    });
  }
  login(): void {
    const data = {
      email: this.formaLogin.value.email,
      password: this.formaLogin.value.password
    };
    this.userService.login(data).subscribe( (resp: any) => {
      if (resp.ok) {
        console.log(resp)
        localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        localStorage.setItem('id', resp.id);
        this.router.navigate(['/dashboard']);
      } else {
        alert(resp.mensaje);
      }
    });
  }
}
