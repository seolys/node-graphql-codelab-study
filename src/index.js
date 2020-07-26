const { ApolloServer } = require('apollo-server')

// SDL
const typeDefs = `
    type Query {
        hello: String!
        ping: String!
        user: User! 
    }

    type User {
        name: String!
        age: Int!
    }
`

const resolvers = {
    Query: {
        hello() {
            return 'world'
        },
        ping() {
            return 'pong'
        },
        user() {
            return { name: 'Seol YeonSu', age: 32 }
        }
    },
    User: {
        name(parent) {
            console.log(parent)
            return parent.name
        },
        age(parent) {
            return parent.age
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(3000)