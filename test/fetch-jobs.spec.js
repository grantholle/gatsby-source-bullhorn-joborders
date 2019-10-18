const fetch = require('../src/fetch')
const options = {
  swimlane: process.env.SWIMLANE,
  corpToken: process.env.CORP_TOKEN
}

fetch.fetchJobs(options).then(jobs => {
  console.log(jobs.length)
}).catch(console.error)
