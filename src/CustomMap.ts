//Instructions to every other class
// on how they can be an argument to addMarker
export interface Mappable {
    location: {
        lat: number;
        lng: number;
    }
    markerContent(): string;
    color: string;
}

export class CustomMap {
    googleMap: google.maps.Map;

    constructor(divId: string) {
        this.googleMap = new google.maps.Map(document.getElementById(divId), {
            zoom: 3,
            center: {
                lat: 0,
                lng: 0
            }
        });
    }
    addMarker(mappable: Mappable): void {
        let url = "https://maps.google.com/mapfiles/ms/icons/";
        url += mappable.color + "-dot.png";
        const marker = new google.maps.Marker({
            map: this.googleMap,
            position: {
                lat: mappable.location.lat,
                lng: mappable.location.lng
            },
            icon:
                {
                    url: url,
                    labelOrigin: new google.maps.Point(60, 30)
                }
        });

        marker.addListener('click', () => {
            const infoWindow = new google.maps.InfoWindow({
                content: mappable.markerContent()
            });

            infoWindow.open(this.googleMap, marker);
        });
    }
}