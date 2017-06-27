const resolvers = {
  Preferences: {
    id(preferences) {
      return preferences._id;
    },
  },
  Query: {
    preferencess(root, { lastCreatedAt, limit }, { Preferences }) {
      return Preferences.all({ lastCreatedAt, limit });
    },

    preferences(root, { id }, { Preferences }) {
      return Preferences.findOneById(id);
    },
    
    preferences(root, {}, { Preferences }){
      return Preferences.all();
    }
  },
  Mutation: {
    async createPreferences(root, { input }, { Preferences }) {
      const id = await Preferences.insert(input);
      return Preferences.findOneById(id);
    },

    async updatePreferences(root, { id, input }, { Preferences }) {
      await Preferences.updateById(id, input);
      return Preferences.findOneById(id);
    },

    removePreferences(root, { id }, { Preferences }) {
      return Preferences.removeById(id);
    },
  },
  Subscription: {
    preferencesCreated: preferences => preferences,
    preferencesUpdated: preferences => preferences,
    preferencesRemoved: id => id,
  },
};

export default resolvers;
