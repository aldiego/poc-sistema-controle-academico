import { OnInit, Component } from '@angular/core';
import {AppService} from '../app.service'

import { Curso } from '../curso';
import { CursoService } from '../curso.service';

@Component({
  selector: 'app-cursos-details',
  providers: [AppService],
  templateUrl: 'cursos.component.html'
})

export class CursoComponent implements OnInit {
  cursos: Curso[];
  headElements = ['ID', 'Name', 'Acoes'];

  constructor(private cursoService: CursoService) { }

  ngOnInit() {
    this.getCursos();
  }

  getCursos(): void {
    this.cursoService.getCursos()
    .subscribe(heroes => this.cursos = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.cursoService.addCurso({ name } as Curso)
      .subscribe(hero => {
        this.cursos.push(hero);
      });
  }

  delete(hero: Curso): void {
    this.cursos = this.cursos.filter(h => h !== hero);
    this.cursoService.deleteCurso(hero).subscribe();
  }
}
/*
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

    getCursos() {
      this._service.getResource(this.cursosUrl)
       .subscribe(
                   data => this.curso = data,
                   error =>  {
                      console.log(error);
                      alert('Ocorreu um erro');
                  });
  }
}
*/
