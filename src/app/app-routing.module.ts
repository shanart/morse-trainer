import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { DictionaryComponent } from './dictionary/dictionary.component';


const routes: Routes = [
    { path: '', pathMatch: 'full', component: CounterComponent},
    { path: 'dictionary', component: DictionaryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
