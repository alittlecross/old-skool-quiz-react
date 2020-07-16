import ApiError from '../lib/api-error'

const HandleErrors = res => {
  if (res.ok) {
    return res
  } else {
    throw new ApiError(res.status)
  }
}

export default HandleErrors
