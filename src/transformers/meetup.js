
class meetupTransformer {
  static fetch (meetup) {
    if (meetup) {
      const users = []
      for (let key in meetup.users) {
        users.push(
          {
            'idRegister': Object.keys(meetup.users)[0],
            'id': meetup.users[key].id
          }
        )
      }
      return {
        'creatorId': meetup.creatorId,
        'day': meetup.date.day,
        'time': meetup.date.time,
        'description': meetup.description,
        'imgUrl': meetup.imgUrl,
        'location': meetup.location,
        'title': meetup.title,
        'users': users
      }
    }
    return {}
  }

  static send (meetup) {
    return {
      'creatorId': meetup.creatorId,
      'date': {
        'day': meetup.day,
        'time': meetup.time
      },
      'description': meetup.description,
      'imgUrl': meetup.imgUrl,
      'location': meetup.location,
      'title': meetup.title
    }
  }

  static update (meetup) {
    return {
      'date': {
        'day': meetup.day,
        'time': meetup.time
      },
      'description': meetup.description,
      'imgUrl': meetup.imgUrl,
      'location': meetup.location,
      'title': meetup.title
    }
  }
}

export default meetupTransformer
