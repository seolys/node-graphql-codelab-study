const { ApolloServer } = require('apollo-server')
const fs = require('fs')

const typeDefs = fs.readFileSync('./src/schema.graphql', 'utf-8')

const resolvers = {
    Query: {
        articles(parent, args, context) {
            // 함수 내에서
            // parent, args를 잘 조합해서
            // DB에 날리든... Redis, Memcached에 날리든...
            // HTTP에 요청을 날리든, gRPC요청을 날리든...
            // 어찌저찌 처리하여 return
            console.log(parent, args, context)

            const result = [];
            result.push({
                id: 1,
                createdAt: "",
                updatedAt: "",
                category: 1,
                title: "안녕하세요",
                viewNum: 12,
                content: "하이하이",
                author: 1,
                thumbnail: 3
            })
            return result
        }
    },
    Article: {
        /*
        반복되는 아래와 같은 코드(그냥 리턴하는 코드)는 작성하지 않아도 됨. 
        id(parent) {
            return parent.id
        },
        createdAt(parent) {
            return parent.createdAt
        },
        updatedAt(parent) {
            return parent.updatedAt
        },
        */
        author(parent) {
            // parent.authorId로
            // DB에 요청한 후 응답받은값을 반환로직을 구현해야 한다.
            return {
                id: 2,
                createdAt: "",
                updatedAt: "",
                nickname: "Tony",
                imageId: 10
            }
        }
    },
    User: {
        image(parent) {
            // parent.imageId로
            // DB에 요청한 후 응답받은값을 반환로직을 구현해야 한다.
            return {
                id: 3,
                createdAt: "",
                updatedAt: "",
                url: "http://fdsafasdf.com"
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen(3000)