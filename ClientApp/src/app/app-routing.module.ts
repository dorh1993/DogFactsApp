import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FactsComponent } from './facts/facts.component';

const routes: Routes = [ 
  { path: 'all-facts', component: FactsComponent, data: { kind: 'all-facts', title:'All Facts' } },
  { path: 'my-facts', component: FactsComponent, data: { kind: 'my-facts', title:'My Facts'  } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


