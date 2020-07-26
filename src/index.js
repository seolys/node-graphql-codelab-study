const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const articles = require('./db/Article.js')
const typeDefs = fs.readFileSync('./src/schema.graphql', 'utf-8')

const resolvers = {
    Query: {
        articles(parent, args, context, info) {
            // 함수 내에서
            // parent, args를 잘 조합해서
            // DB에 날리든... Redis, Memcached에 날리든...
            // HTTP에 요청을 날리든, gRPC요청을 날리든...
            // 어찌저찌 처리하여 return
            console.log("parent : ", parent, "\nargs : ", args, "\ncontext : ", context, "\ninfo : ", info)
            console.log("DB요청 - Query.articles")
            if (args.where.categoryId) {
                return articles.filter(article => article.category == args.where.categoryId)
            }
            return articles
        }
    },
    Mutation: {
        addArticle(parent, args, context) {
            // DB저장처리 구현 후 returnType에 맞게 리턴.
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
            console.log("DB요청 - Article.author")
            return {
                id: 2,
                createdAt: "",
                updatedAt: "",
                nickname: "Tony",
                imageId: 10
            }
        },
        comments(parent) {
            // parent.id => Article.id
            // 댓글 테이블을 조회하여 댓글리스트를 가져온다.
            console.log("DB요청 - Ariticle.comments")
            return [
                {
                    id: 1,
                    createdAt: "",
                    updatedAt: "",
                    authorId: 1,
                    content: "댓글!!!!!!"
                }
            ]
        },
        category(parent) {
            console.log("DB요청 - Article.category")
            return {
                id: parent.id,
                createdAt: "",
                updatedAt: "",
                name: "카테고리1",
                articles: []
            }
        }
    },
    User: {
        image(parent) {
            // parent.imageId로
            // DB에 요청한 후 응답받은값을 반환로직을 구현해야 한다.
            console.log("DB요청 - User.image")
            return {
                id: 3,
                createdAt: "",
                updatedAt: "",
                url: "http://fdsafasdf.com"
            }
        }
    },
    Comment: {
        author(parent) {
            // parent.id => Author.id
            // User테이블을 조회 한다.
            console.log("DB요청 - Comment.author")
            return {
                id: 3,
                createdAt: "",
                updatedAt: "",
                nickname: "Seolys",
                imageId: 10
            }
        }
    },
    Category: {}
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context() {
        // authorization header를 확인해서 내 정보를 넣어준다
        return {
            user: {
                name: "Tony",
                role: "Admin"
            }
        }
    }
})

server.listen(3000)