export default class User {
  constructor(username, points = 0, email = '') {
    this.username = username
    this.points = points
    this.email = email
  }
}
