const Book = require("../../models/Book");
const Author = require("../../models/Author");

const bookResolvers = {
  Query: {
    books: async () => await Book.find(),
    book: async (_, { id }) => await Book.findById(id),
  },
  Book: {
    author: async (book) => await Author.findById(book.authorId),
  },
  Mutation: {
    createBook: async (_, { input }) => {
      const book = new Book(input);
      return await book.save();
    },
    updateBook: async (_, { id, input }) => {
      return await Book.findByIdAndUpdate(id, input, { new: true });
    },
    deleteBook: async (_, { id }) => {
      await Book.findByIdAndDelete(id);
      return true;
    },
  },
};

module.exports = bookResolvers;
