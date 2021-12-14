const Joi = require('joi')

const itemSchema = Joi.object().keys({
  indicator: Joi.string().trim().valid('MACD', 'OBV', 'Stoch_Fastk').required(),
  operator: Joi.string().trim().valid('gt', 'gte', 'eq', 'lte', 'lt').required(),
  value: Joi.number().required()
})

const shareCustomSchema = Joi.array().items(itemSchema)

module.exports = shareCustomSchema
