const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const getShareTickers = async () => {
  const result = await prisma.shareData.findMany({
    select: {
      Ticker: true
    },
    where: {},
    distinct: ['Ticker']
  })
  return result
}

const getShareMatchingQuery = async (indicator, operator, value, ticker) => {
  const results = await prisma.shareData.findFirst({
    select: {
      Ticker: true
    },
    where: {
      [indicator]: {
        [operator]: value
      },
      Ticker: `${ticker}`
    },
    orderBy: {
      Date: 'desc'
    },
    take: 5
  })
  return results
}

module.exports = {
  getShareTickers,
  getShareMatchingQuery
}
