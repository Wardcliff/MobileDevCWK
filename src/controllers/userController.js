const url = 'http://10.0.2.2:3333/api/1.0.0/user/'

export default class userController {
  async getUser (id, userToken) {
    try {
      const resp = await fetch(url + id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': userToken
        }
      })

      if (resp.ok) {
        const user = await resp.json()
        return user
      } else {
        console.log('response code: ', resp.status)
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async logIn (user) {
    try {
      const resp = await fetch(url + 'login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
      })

      console.log(resp.status)
      if (resp.ok) {
        const user = await resp.json()
        console.log('UserLogIn: ' + JSON.stringify(user))
        return user
      } else {
        return null
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  async register (user) {
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: user
      })

      if (resp.ok) {
        const json = await resp.json()
        console.log('UserRegister: ' + JSON.stringify(json))
        return true
      } else {
        throw new Error(resp.status)
      }
    } catch (error) {
      throw new Error(error)
    }
  }
}
