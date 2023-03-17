import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarkerColor {
  color: string;
  marker?: mapboxgl.Marker;
  center?: [ number, number ];
}

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styles: [
    `
      .map-container {
        width: 100%;
        height: 100%;
      }

      .list-group {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 99;
      }

      li {
        cursor: pointer;
      }
    `
  ]
})
export class BookmarksComponent implements AfterViewInit {

  @ViewChild('bookmarksMap') divZoomRangeMap!: ElementRef;
  map!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [ -103.48433801967951, 20.4865249105049 ];

  markers: MarkerColor[] = [];

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.divZoomRangeMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel
    });

    this.readLocalStorage();

    // const markerHtml: HTMLElement = document.createElement('div');
    // markerHtml.innerHTML = 'Holovorgo';

    // const marker = new mapboxgl.Marker()
    //   .setLngLat( this.center )
    //   .addTo( this.map );
  }

  goToMarker( marker: mapboxgl.Marker ) {
    this.map.flyTo({
      center: marker.getLngLat()
    });
  }

  addMarker() {

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    const newMarker = new mapboxgl.Marker(
      {
        draggable: true,
        color
      }
    )
      .setLngLat( this.center )
      .addTo( this.map );

    this.markers.push({
      color,
      marker: newMarker
    });

    this.saveMarkersLocalStorage();

    newMarker.on('dragend', () => {
      this.saveMarkersLocalStorage();
    });
  }

  saveMarkersLocalStorage() {

    const lngLatArr: MarkerColor[] = [];

    this.markers.forEach( marker => {
      const color = marker.color;
      const {lng, lat} = marker.marker!.getLngLat();

      lngLatArr.push({
        color,
        center: [ lng, lat ]
      });
    });

    localStorage.setItem('markers', JSON.stringify(lngLatArr));
  }

  readLocalStorage() {
    if( !localStorage.getItem('markers') ) {
      return;
    }

    const lngLatArr: MarkerColor[] = JSON.parse(localStorage.getItem('markers')!);

    lngLatArr.forEach( marker => {

      const newMarker = new mapboxgl.Marker(
        {
          draggable: true,
          color: marker.color,
        }
      ).setLngLat( marker.center! )
      .addTo( this.map );

      this.markers.push({
        color: marker.color,
        marker: newMarker
      });

      newMarker.on('dragend', () => {
        this.saveMarkersLocalStorage();
      });

    });
  }

  deleteMarker( i: number ) {
    console.log('delete');
    this.markers[i].marker?.remove();
    this.markers.splice(i, 1);
    this.saveMarkersLocalStorage();
  }
}
