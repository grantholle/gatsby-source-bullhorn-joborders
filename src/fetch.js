const axios = require(`axios`)

const getBaseUrl = pluginOptions => {
  return `https://public-rest${pluginOptions.swimlane}.bullhornstaffing.com/rest-services/${pluginOptions.corpToken}`
}

const formatFilter = (filter = {}, isSearch = false, ignoreFields = []) => {
  let additionalFilter = ''

  for (const key in filter) {
    if (!ignoreFields.includes(key)) {
      const filterValue = filter[key];

      if (typeof filterValue === 'string') {
        additionalFilter += ` AND (${filterValue})`;
      } else if (filterValue.length) {
        additionalFilter += ` AND (${filterValue.join(' OR ')})`;
      }
    }
  }

  return additionalFilter.replace(/{\?\^\^equals}/g, isSearch ? ':' : '=').replace(/{\?\^\^delimiter}/g, isSearch ? '"' : '\'')
}

const fetchJobs = async pluginOptions => {
  const params = {
    where: `(isOpen=true) AND (isDeleted=false)${formatFilter()}`,
    fields: '*',
    count: 300,
  }

  const queryString = Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')

  const { data } = await axios.get(`${getBaseUrl(pluginOptions)}/query/JobBoardPost?${queryString}`)

  return data.data
}

module.exports = { fetchJobs }
