export default class User {
  constructor(username, points = 0, email = '', table = 'N/A', tableExpiration = null) {
    this.username = username
    this.points = points
    this.email = email
    this.table = table
    this.reservationExpiryTime = tableExpiration
  }

  toJSON() {
      return {
        username: this.username,
        points: this.points,
        email: this.email,
        table: this.table,
        tableExpiration: this.reservationExpiryTime,
      };
    }
}
