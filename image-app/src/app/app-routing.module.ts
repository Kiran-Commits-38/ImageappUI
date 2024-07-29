import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageListComponent } from './image-list/image-list.component';
import { ImageFormComponent } from './image-form/image-form.component';

const routes: Routes = [
  { path: '', component: ImageListComponent },
  { path: 'create', component: ImageFormComponent },
  { path: 'edit/:id', component: ImageFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
