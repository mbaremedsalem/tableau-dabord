import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';

import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

import { MatSidenavModule } from '@angular/material/sidenav';

import { MatListModule } from '@angular/material/list';
import { TabarouComponent } from './tabarou/tabarou.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { VirMultComponent } from './vir-mult/vir-mult.component';
import { BaseChartDirective } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
// import { NgChartsModule } from 'ng2-charts'; // Correct import



import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpassowrdComponent } from './resetpassowrd/resetpassowrd.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CanvasJSAngularStockChartsModule } from '@canvasjs/angular-stockcharts';


@NgModule({ declarations: [
        AppComponent,
        LoginComponent,
        TabarouComponent,
        VirMultComponent,
        ForgetpasswordComponent,
        ResetpassowrdComponent
    ],
    bootstrap: [AppComponent], 
    imports: [
        BrowserModule,
        BaseChartDirective ,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        CommonModule,
        FormsModule,
        MatSidenavModule,
        MatListModule,
        MatToolbarModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatIconModule,
        MatSelectModule,
        MatOptionModule,
        ReactiveFormsModule,
        CanvasJSAngularStockChartsModule

    ], 
        providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule { }
