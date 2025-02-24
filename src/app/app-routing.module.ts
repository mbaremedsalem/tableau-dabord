import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TabarouComponent } from './tabarou/tabarou.component';
import { VirMultComponent } from './vir-mult/vir-mult.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpassowrdComponent } from './resetpassowrd/resetpassowrd.component';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  { path: 'forget-password', component: ForgetpasswordComponent },
  { path: 'reset-password/:token', component: ResetpassowrdComponent },

  {
    path: '', // Incluez "home" dans le chemin
    component: TabarouComponent,
    children: [
      { path: 'virement-multiple', component: VirMultComponent },
    ],
  }
  // 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
