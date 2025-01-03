const Book = require("../../models/Book");
const Author = require("../../models/Author");
const DateScalar = require("../scalars/dateScalar");

const bookResolvers = {
  Date: DateScalar,

  Query: {
    books: async (
      _,
      { page = 1, limit = 10, genre, yearFrom, yearTo, searchTitle }
    ) => {
      const skip = (page - 1) * limit;
      let query = {};

      if (genre) query.genre = genre;
      if (yearFrom || yearTo) {
        query.publishedYear = {};
        if (yearFrom) query.publishedYear.$gte = yearFrom;
        if (yearTo) query.publishedYear.$lte = yearTo;
      }
      if (searchTitle) {
        query.title = { $regex: searchTitle, $options: "i" };
      }

      const books = await Book.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ publishedYear: -1 });

      const total = await Book.countDocuments(query);

      return {
        books,
        pageInfo: {
          total,
          pages: Math.ceil(total / limit),
          currentPage: page,
          hasNext: skip + books.length < total,
        },
      };
    },
    book: async (_, { id }) => await Book.findById(id),
  },
  Book: {
    author: async (book) => await Author.findById(book.authorId),
    publishedDate: (book) =>
      book.publishedYear ? new Date(book.publishedYear, 0) : null,
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
