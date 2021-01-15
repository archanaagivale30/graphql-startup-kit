const express = require('express')
const graphqlHTTP = require('express-graphql');
import Schema from './schema/Schema';
import expressPlayground from 'graphql-playground-middleware-express';
const getErrorCode = require('./config/errors')

const app = express()

app.set('port', process.env.PORT || 7000)

app.use('/graphql', (req, res) => {
  graphqlHTTP({
    schema: new Schema().schema,
    graphiql: true,
    rootValue: new Schema().root,
    customFormatErrorFn: (err) => {
      const error = getErrorCode(err.message)
      return ({ message: error.message, statusCode: error.statusCode })
    }
   
  })(req, res)
})
app.use('/api', expressPlayground({ endpoint: '/graphql' }))

const server = app.listen(app.get('port'), () => {
  console.log(`Server running -> PORT ${server.address().port}`)
})
module.exports = app