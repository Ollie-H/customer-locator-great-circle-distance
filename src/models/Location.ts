class Location {
  longitude: number;
  latitude: number;

  constructor(lat: number, long: number) {
    this.latitude = lat;
    this.longitude = long;
  }

  calculateDistanceToLocation(location: Location) {
    const EARTH_R = 6371e3;

    const φ1 = (this.latitude * Math.PI) / 180;
    const φ2 = (location.latitude * Math.PI) / 180;
    const Δφ = ((location.latitude - this.latitude) * Math.PI) / 180;
    const Δλ = ((location.longitude - this.longitude) * Math.PI) / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return (EARTH_R * c) / 1000;
  }
}

export default Location;