const resolvers = {
  Query: {
    id(query) {
      return query._id;
    },

    user(query, args, { Query }) {
      return Query.user(query);
    },

    book(query, args, { Query }) {
      return Query.book(query);
    },
  },
  Query: {
    querys(root, { lastCreatedAt, limit }, { Query }) {
      return Query.all({ lastCreatedAt, limit });
    },

    query(root, { id }, { Query }) {
      return Query.findOneById(id);
    },
  },
  Mutation: {
    async createQuery(root, { input }, { Query }) {
      const id = await Query.insert(input);
      return Query.findOneById(id);
    },

    async updateQuery(root, { id, input }, { Query }) {
      await Query.updateById(id, input);
      return Query.findOneById(id);
    },

    removeQuery(root, { id }, { Query }) {
      return Query.removeById(id);
    },
  },
  Subscription: {
    queryCreated: query => query,
    queryUpdated: query => query,
    queryRemoved: id => id,
  },
};

export default resolvers;
