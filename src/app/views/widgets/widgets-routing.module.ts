import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidgetsComponent } from './widgets.component';
import { TeacherComponent } from './teacher.component';
import { TutorialComponent } from './tutorial/tutorial.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Buttons'
    },
    children: [
      {
        path: '',
        redirectTo: 'list-student'
      },
      {
        path: 'list-student',
        component: WidgetsComponent
      },
      {
        path: 'list-teacher',
        component: TeacherComponent
      },
      {
        path: 'tutorial',
        component: TutorialComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule {}
