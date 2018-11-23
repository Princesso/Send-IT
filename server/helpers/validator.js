import Joi from 'joi'
import helper from './helper'

const strPresent = (str) => !!str && !!str.toString().trim()

const validate = (schema) => {
  // find any field that returns a false
  const errorField = Object.keys(schema).find(field => !schema[field])
  if (errorField) return `${errorField} is invalid`
}

const signUpSchema = (params) => {
  const schema = {
    firstname: strPresent(params.firstname),
    lastname: strPresent(params.lastname),
    email: helper.isValidEmail(params.email),
    username: strPresent(params.username),
    password: strPresent(params.password)
  }
  return validate(schema)
}

const loginSchema = (params) => {
  const schema = {
    email: helper.isValidEmail(params.email),
    password: strPresent(params.password)
  }
  return validate(schema)
}

const createParcelsSchema = (params) => {
  const schema = {
    placedBy: strPresent(params.placedBy),
    weight: strPresent(params.weight),
    fromAddress: strPresent(params.fromAddress),
    toAddress: strPresent(params.toAddress),
    currentLocation: strPresent(params.currentLocation)
  };
  return validate(schema)
}

const destinationSchema = (params) => {
  const schema = {
    toAddress: strPresent(params.toAddress) &&
                    params.toAddress.length > 2,
  };
  return validate(schema)
}

const currentLocationSchema = (params) => {
  const schema = {
    currentLocation: strPresent(params.currentLocation) &&
                          params.currentLocation.length > 2,
  };
  return validate(schema)
}

const changeStatusSchema = (params) => {
  const schema = {
    status: params.status &&
            (params.status.length<3 || params.status!=="delivered")
  };
  return validate(schema)
}

const makeAdminSchema = {

}

export {
  signUpSchema, loginSchema, createParcelsSchema, destinationSchema, currentLocationSchema,
  changeStatusSchema, makeAdminSchema
}
