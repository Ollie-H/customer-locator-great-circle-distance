import Location from "./Location";

class Company {
  id: string;
  location: Location;
  distanceToParloa: number = 0;

  constructor(id: string, long: number, lat: number) {
    this.id = id;
    this.location = new Location(long, lat);
  }

  setDistanceToPaloa(parloaLocation: Location) {
    this.distanceToParloa = this.location.calculateDistanceToLocation(parloaLocation);
  }
}

export default Company;