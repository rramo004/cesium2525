import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CesiumDirective } from './directives/cesium.directive';
import { XmljsonserviceService } from './services/xmljsonservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatTableModule, MatIconModule, MatTooltipModule, MatSidenavModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { CopComponent } from './components/cop/cop.component';
import { TsComponent } from './components/ts/ts.component';
import { MilsymService } from './services/milsym.service';
import { WebsocketService } from './services/websocket.service';
import { ViewerService } from './services/viewer.service';
import { TrackmanagerService } from './services/trackmanager.service';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { OverlaydialogComponent } from './components/overlaydialog/overlaydialog.component';

// const appRoutes: Routes = [
//   { path: '', component: CopComponent },
//   { path: 'cop', component: CopComponent },
//   { path: 'ts', component: TsComponent }
// ];

@NgModule({
  declarations: [
    AppComponent,
    CesiumDirective,
    CopComponent,
    TsComponent,
    ToolbarComponent,
    OverlaydialogComponent,
    SidebarComponent
    
  ],
  imports: [
    // RouterModule.forRoot(
    //   appRoutes,
    //   { enableTracing: true } // <-- debugging purposes only
    // ),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatSidenavModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule
  ],
  entryComponents: [
    OverlaydialogComponent
  ],
  providers: [
    XmljsonserviceService,
    MilsymService,
    WebsocketService,
    ViewerService,
    TrackmanagerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
