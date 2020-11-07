import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formaRegister: FormGroup;
  constructor( private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
    this.formaRegister = new FormGroup({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });
  }
  guardarUser(): void {
    if (this.formaRegister.valid) {
      if ( this.formaRegister.value.password === this.formaRegister.value.password2 ) {
        const user = {
          nombre: this.formaRegister.value.nombre,
          email: this.formaRegister.value.correo,
          password: this.formaRegister.value.password
        };
        this.userService.registro(user).subscribe( (resp: any) => {
          if (resp.ok) {
            localStorage.setItem('usuario', JSON.stringify(resp.usuario));
            localStorage.setItem('id', resp.id);
            this.router.navigate(['/dashboard']);
          } else {
            alert(resp.mensaje);
          }
        });
      } else {
        alert('Las contraseñas no coinciden');
        return;
      }
    } else {
      alert('Todos los campos son requeridos');
      return;
    }
  }
}
