import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapsRoutingModule } from './maps-routing.module';
import { MiniMapComponent } from './components/mini-map/mini-map.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { FullScreenComponent } from './pages/full-screen/full-screen.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { ZoomRangeComponent } from './pages/zoom-range/zoom-range.component';


@NgModule({
  declarations: [
    MiniMapComponent,
    BookmarksComponent,
    FullScreenComponent,
    PropertiesComponent,
    ZoomRangeComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule
  ]
})
export class MapsModule { }
