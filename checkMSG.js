'use-strict'

module.exports = function (objectToCheck) {
  if (objectToCheck !== '' && objectToCheck !== null && objectToCheck !== undefined) {
    return true
  } else {
    return false
  }
}
