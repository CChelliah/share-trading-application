const { shareDataRepository } = require('../repositories')
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getCustomShares = async (data) => {
  const shareTickers = await shareDataRepository.getShareTickers()
  const results = await Promise.all(shareTickers.map(async (e) => {
    return await getCustomShare(data, e.Ticker)
  }))
  return results
}

const getCustomShare = async (data, ticker) => {
  const results = await Promise.all(data.map(async (e) => {
    const result = await checkQueryMatch(e.indicator, e.operator, e.value, ticker)
    return result
  }))
  const counter = {}
  results.forEach(value => addToCounter(counter, value))
  return counter[ticker] === data.length ? results : null
}

const addToCounter = (counter, value) => {
  if (value === null) {
    return 0
  } else {
    return (counter[value.Ticker] = (counter[value.Ticker] || 0) + 1)
  }
}

const checkQueryMatch = async (indicator, operator, value, ticker) => {
  const result = await shareDataRepository.getShareMatchingQuery(indicator, operator, value, ticker)
  return result
}

module.exports = {
  getCustomShares,
  getCustomShare
}
