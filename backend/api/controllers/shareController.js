const Joi = require('joi')
const { shareService } = require('../services')
const { utils } = require('../utils')
const { shareCustomSchema } = require('../middlewares/validators')

exports.custom = async (req, res) => {
  console.log(req.body)
  const { error } = await shareCustomSchema.validate(JSON.parse(JSON.stringify(req.body)))
  if (error) {
    res.send(error)
  } else {
    const result = await shareService.getCustomShares(req.body).then((res) => res.flat().filter(e => { return e !== null }))
    res.send(JSON.stringify(result, utils.bigIntReplacer))
  }
}
