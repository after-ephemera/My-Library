const resolvers = {
  Book: {
    id(book) {
      return book._id;
    },
  },
  Query: {
    books(root, { lastCreatedAt, limit }, { Book }) {
      return Book.all({ lastCreatedAt, limit });
    },

    book(root, { id }, { Book }) {
      return Book.findOneById(id);
    },
  },
  Mutation: {
    async createBook(root, { input }, { Book }) {
      const id = await Book.insert(input);
      return Book.findOneById(id);
    },

    async updateBook(root, { id, input }, { Book }) {
      await Book.updateById(id, input);
      return Book.findOneById(id);
    },

    removeBook(root, { id }, { Book }) {
      return Book.removeById(id);
    },
  },
  Subscription: {
    bookCreated: book => book,
    bookUpdated: book => book,
    bookRemoved: id => id,
  },
};

export default resolvers;
