const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Connection to MongoDB failed:', error.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    allAuthors: [Author!]!
    allBooks(author: String, genre: String): [Book!]!
    authorCount: Int!
    bookCount: Int!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        await author.save()
      }
      const book = new Book({ ...args, author })
      return book.save()
    },
    editAuthor: (root, args) => {
      const author = authors.find((a) => a.name === args.name)
      if (!author) {
        return null
      }
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((a) => (a.name !== args.name ? a : updatedAuthor))
      return updatedAuthor
    }
  },
  Query: {
    allAuthors: () => authors,
    allBooks: (root, args) => {
      result = books
      if (args.author) {
        result = result.filter((book) => book.author === args.author)
      }
      if (args.genre) {
        result = result.filter((book) => book.genres.includes(args.genre))
      }
      return result
    },
    authorCount: () => authors.length,
    bookCount: () => books.length
  },
  Author: {
    bookCount: (root) => {
      return books.filter((book) => root.name === book.author).length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
