const fetchJobOrders = require(`./fetch`)

exports.sourceNodes = (
  { actions, createNodeId, createContentDigest },
  pluginOptions
) => {
  const { createNode } = actions

  return Promise.map(pluginOptions.queries, ({ query, limit }) =>
    fetchJobOrders({ query, limit }).then(results =>
      results.forEach(result => {
        result.jobOrderId = result.id
        result.id = createNodeId(result.id)

        const node = {
          ...result,
          query,
          parent: null,
          children: [],
          internal: {
            type: `JobOrder`,
          },
        }
        node.internal.contentDigest = createContentDigest(node)
        createNode(node)
      })
    )
  )
}