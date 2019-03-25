import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Curso } from './curso';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cursos = [
      { id: 11, name: 'Administracao' },
      { id: 12, name: 'Contabilidade' },
      { id: 13, name: 'Logistica' },
      { id: 14, name: 'Direito' },
      { id: 15, name: 'Educacao Fisica' },
      { id: 16, name: 'Gestao Financeira' },
      { id: 17, name: 'Comercio Exterior' },
      { id: 18, name: 'Jogos Digitais' },
      { id: 19, name: 'Analise e Desenvolvimento de Sistemas' },
      { id: 20, name: 'Gestao de Pessoas' }
    ];
    return {cursos};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the cursos array is empty,
  // the method below returns the initial number (11).
  // if the cursos array is not empty, the method below returns the highest
  // hero id + 1.
  genId(cursos: Curso[]): number {
    return cursos.length > 0 ? Math.max(...cursos.map(hero => hero.id)) + 1 : 11;
  }
}
