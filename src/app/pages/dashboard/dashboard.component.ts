import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';
import * as moment from 'moment';
moment.locale('es-CO');
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  $identificador: string = '';
  tasks: any = [];
  tasksComplited: any = [];
  task: any = [];
  formaTareas: FormGroup;
  formaTareasEdit: FormGroup;
  prioridades = ['Alta', 'Media', 'Baja'];
  constructor(private router: Router, private taskService: TaskService) {
    if ( !localStorage.getItem('usuario') && !localStorage.getItem('id')) {
      this.router.navigate(['/login']);
    } else {
      this.$identificador = localStorage.getItem('id');
    }
  }

  ngOnInit(): void {
    this.formaTareas = new FormGroup({
      nombre: new FormControl('', Validators.required),
      fechaVncimiento: new FormControl('', Validators.required),
      prioridad: new FormControl('', Validators.required)
    });
    this.formaTareasEdit = new FormGroup({
      nombre: new FormControl('', Validators.required),
      fechaVncimiento: new FormControl('', Validators.required),
      prioridad: new FormControl('', Validators.required),
    });
    this.cargarTareas(this.$identificador);
  }
  cargarTareas(id): void {
    const hoy = moment();
    this.taskService.get(id).subscribe( (resp: any) => {
      if (resp.ok) {
        this.tasks = resp.tareasPendientes;
        this.tasksComplited = resp.tareasCompletadas;
        this.tasks.forEach( element => {
          if (moment(element.fechaVncimiento).format() === hoy.format()) {
            alert(`La tarea ${element.nombre}, se vencio`);
          }
        });
      } else {
        if ( resp.cantidad === 0) {
          alert(resp.msn);
          document.getElementById('create').click();
        } else {
          alert(resp.msn);
        }
      }
    });
  }
  guardarTarea(): void {
    if ( this.formaTareas.valid) {
      const fechaVencimiento = moment(this.formaTareas.value.fechaVncimiento).format();
      const tarea = {
        nombre: this.formaTareas.value.nombre,
        fechaVncimiento: fechaVencimiento,
        prioridad: this.formaTareas.value.prioridad,
        usuario: this.$identificador
      }
      this.taskService.create(tarea).subscribe( (resp: any) => {
        if (resp.ok) {
          alert(resp.msn);
          document.getElementById('close-create').click();
          this.cargarTareas(this.$identificador);
        } else {
          alert(resp.msn);
        }
      });
    } else {
      alert('todos los campos son requeridos');
    }
  }
  edit(id): void {
    this.taskService.getId(id).subscribe( (resp: any) => {
      if (resp.ok) {
        this.task = resp.task;
        this.formaTareasEdit.setValue({
          nombre: resp.task.nombre,
          fechaVncimiento: resp.task.fechaVncimiento,
          prioridad: resp.task.prioridad
        });
      }
    });
  }

  editarTarea(): void {
      const fechaVencimiento = moment(this.task.fechaVncimiento).format();
      const tarea = {
        _id: this.task._id,
        nombre: this.task.nombre,
        fechaVncimiento: fechaVencimiento,
        completada: this.task.completada,
        prioridad: this.task.prioridad,
      };
      this.taskService.edit(tarea).subscribe( (resp: any) => {
        if (resp.ok) {
          console.log(resp.task)
          alert(resp.msn);
          document.getElementById('close-edit').click();
          this.cargarTareas(this.$identificador);
        } else {
          alert(resp.msn);
        }
      });
  }
  delete(id): void {
    this.taskService.delete(id).subscribe( (resp: any) => {
      if (resp.ok) {
        alert(resp.msn);
        this.cargarTareas(this.$identificador);
      } else {
        alert(resp.msn);
      }
    });
  }
}
