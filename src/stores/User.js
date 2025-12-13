export default class User {
  constructor(username, points = 0, email = '', table = 'N/A', tableExpiration = null, imgurl = '') {
    this.username = username
    this.points = points
    this.email = email
    this.table = table
    this.reservationExpiryTime = tableExpiration
    this.imgurl = imgurl
  }

  toJSON() {
      return {
        username: this.username,
        points: this.points,
        email: this.email,
        table: this.table,
        tableExpiration: this.reservationExpiryTime,
        imgurl: this.imgurl
      };
    }
}
