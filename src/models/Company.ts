import Location from "./Location";

class Company {
  id: string;
  location: Location;
  distanceToParloa: number = 0;

  constructor(id: string, lat: number, long: number) {
    this.id = id;
    this.location = new Location(lat, long);
  }

  setDistanceToPaloa(parloaLocation: Location) {
    this.distanceToParloa = this.location.calculateDistanceToLocation(parloaLocation);
  }
}

export default Company;