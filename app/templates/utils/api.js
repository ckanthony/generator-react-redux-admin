import qs from 'qs'

class Api {
  constructor({ url }) {
    this.apiUrl = url
  }

  async login(credential) {
    return this.call(`authentication`, credential, 'POST')
  }

  async get(endpoint, query = {}) {
    return this.call(endpoint, query, 'GET')
  }

  async create(endpoint, data) {
    return this.call(endpoint, data, 'POST')
  }

  async patch(endpoint, data) {
    return this.call(endpoint, data, 'PATCH')
  }

  async delete(endpoint, data) {
    return this.call(endpoint, data, 'DELETE')
  }

  async upload(data) {
    return this.call('assets', data, 'POST')
  }

  async call(endpoint, data, method) {
    const param = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken) {
      param.headers.Authorization = `Bearer ${accessToken}`
    }
    if (method !== 'GET') {
      if (endpoint === 'assets') {
        const formData = new FormData()
        formData.append('files', data, data.name)
        delete param.headers['Content-Type']
        param.body = formData
      } else {
        param.body = JSON.stringify(data)
      }
    }
    const url = method === 'GET' ? `${endpoint}?${qs.stringify(data)}` : endpoint
    console.log('API', method, url)
    console.log('param', param)
    try {
      const res = await fetch(`${this.apiUrl}/${url}`, param)
      const json = await res.json()
      if (res.status === 200 || res.status === 201) {
        return Promise.resolve(json)
      }
      if (res.status === 401) {
        return Promise.reject(Error('This is unauthorised.'))
      }
      return Promise.reject(Error(json.message))
    } catch (error) {
      return Promise.reject(Error('Please try again later.'))
    }
  }
}

export default new Api({ url: window.API_URL })
