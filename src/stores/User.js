export default class User {
  constructor(username, points = 0, email = '',table = null) {
    this.username = username
    this.points = points
    this.email = email
    this.table = table
  }
}
