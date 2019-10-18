const { fetchJobs } = require(`./fetch`)

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  pluginOptions
) => {
  const { createNode } = actions

  const jobs = await fetchJobs(pluginOptions)

  jobs.forEach(job => {
    job.jobOrderId = job.id
    job.id = createNodeId(job.id)

    const node = {
      ...job,
      parent: null,
      children: [],
      internal: {
        type: `JobOrder`,
      },
    }

    node.internal.contentDigest = createContentDigest(node)

    createNode(node)
  })
}