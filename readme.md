# gatsby-source-bullhorn-joborders

This is a Gatsby source plugin for your Bullhorn JobOrders to build your own career portal.

## Installation

```
npm i -S gatsby-source-bullhorn-joborders
```

## Configuration

In your existing Gatsby's `gatsby-config.js`, add the configuration based on your Bullhorn configuration as received from Bullhorn support.

The required options are `swimlane` and `corpToken`.

```js
module.exports = {
  siteMetadata: {
    // ...
  },
  plugins: [
    // ...
    {
      resolve: `gatsby-source-bullhorn-joborders`,
      options: {
        swimlane: 99,
        corpToken: `ABCDEF`
      }
    },
    // ...
  ],
}
```

Now you can perform queries in your GraphQL, such as

```
query {
  allJobOrder {
    nodes {
      title
      publicDescription
      publishedCategory {
        name
      }
      address {
        city
      }
      dateLastPublished
    }
  }
}
```

## Tests

Right now there aren't tests with assertions, only a basic test to verify it's pulling jobs.

```
SWIMLANE=99 CORP_TOKEN=ABCDE node test/fetch-jobs.spec.js
```

This will run the "test" with your swimlane and corporate token configuration.

## License

View the [license](./LICENSE.md).
