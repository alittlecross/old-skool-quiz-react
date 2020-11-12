import Fetch from 'node-fetch'

import ApiError from '../lib/api-error'

const API = process.env.REACT_APP_API || 'http://localhost:3001'

export const Get = () => {
  return Fetch(API)
}

export const Post = (url, body) => {
  return Fetch(API + url, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) throw new ApiError(res.status)

      return res.json()
    })
}
