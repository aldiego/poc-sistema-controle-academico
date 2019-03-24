import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    template: `<nav class="navbar navbar-default">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">Sistema de Controle Academico</a>
    </div>
  </div>
</nav>
<router-outlet></router-outlet>`
})

export class AppComponent {}
