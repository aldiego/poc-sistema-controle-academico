import { Component } from '@angular/core';
import {AppService, Curso} from './app.service'

@Component({
  selector: 'app-cursos-details',
  providers: [AppService],
  template: `<div class="container">
    <h1 class="col-sm-12">Detalhe dos Cursos</h1>
    <div class="col-sm-12">
        <label class="col-sm-3">ID</label> <span>{{curso.id}}</span>
    </div>
    <div class="col-sm-12">
        <label class="col-sm-3">Name</label> <span>{{curso.name}}</span>
    </div>
    <div class="col-sm-12">
        <button class="btn btn-primary" (click)="getCurso()" type="submit">Novo Curso</button>
    </div>
</div>`
})

export class CursoComponent {
    public curso = new Curso(1, 'sample foo');
    private cursosUrl = 'http://localhost:8082/controle-academico/cursos/';

    constructor(private _service: AppService) {}

    getCurso() {
        this._service.getResource(this.cursosUrl + this.curso.id)
         .subscribe(
                     data => this.curso = data,
                     error =>  {
                        console.log(error);
                        alert('Ocorreu um erro');
                    });
    }
}
