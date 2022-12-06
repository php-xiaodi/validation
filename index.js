const log4js = require('@pg/log4js')
const { decorator } = require('m-utility')
const { isEmpty, pipe, invoker, identity } = require('ramda')
const Joi =  require('@hapi/joi')

const { universalMethodDecorator } = decorator

function checkParam(result) {
  if (result.error) {
    const error = new Error()
    error.errorCode = 3001
    error.message = process.env.NODE_ENV === 'prod' ? 'Param error' : result.error.details[0].message

    log4js.json({
      app_name: 'exception',
      api_name: 'params',
      params: '{}',
      errorCode: 3001,
      message: result.error.details[0].message,
      stack: ''
    })

    throw error
  }
}

function validate(swaggerConfig, params) {
  const invokType = key => invoker(0, key)
  const invokValid = array => array ? invoker(array.length, 'valid')(...array) : identity
  const invokEmpty = key => key === true ? invoker(1, 'allow')('') : identity
  const invokRequired = key => key === true ? invoker(0, 'required') : identity
  const invokePattern = regex => typeof regex === 'string' ? invoker(1, 'pattern')(new RegExp(regex)) : identity

  // TODO  email

  const joiObject = {}
  Object.keys(swaggerConfig).forEach(key => {
    joiObject[key] = pipe(invokType(swaggerConfig[key].type),invokEmpty(swaggerConfig[key].nullable), invokePattern(swaggerConfig[key].pattern), invokRequired(swaggerConfig[key].required), invokValid(swaggerConfig[key].enum))(Joi)
  })

  const schema = Joi.object().keys(
      joiObject
  )

  const result = schema.validate(params)
  checkParam(result)
}

function verifyFunc(value) {
  const wrap = async function (...args) {
    const { parameters: { query, body, formData } } = value
    const [ctx] = args

    if (!isEmpty(query) && query) {
      validate(query, ctx.request.query)
    }

    if (body) {
      validate(body, ctx.request.body)
    }

    if (formData) {
      validate(formData, ctx.request.body)
    }

    await value.apply(this, args)
  }

  return Object.assign(wrap, value)
}

function validation() {
  return universalMethodDecorator(verifyFunc)
}

exports.validation = validation

exports.vali4Test = validate
