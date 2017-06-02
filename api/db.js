const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
      hello:{
        type: GraphQLString,
        resolve(){
          return 'world';
        }
      }
    }
  })
});

