class ApiError extends Error {
  constructor (status, message) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    Error.captureStackTrace(this, ApiError)
  }
}

export default ApiError
