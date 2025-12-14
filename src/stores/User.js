/**
 * File: User.js
 * Author: Samuel Kudla <xkudlas00@stud.fit.vutbr.cz>
 * Brief: Defines User class. Used during login and represents activeUser.
 */

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
