import React from 'react';
import {gql, graphql} from "react-apollo";


let GqlIntegration = (props)=>{
  console.log('Test props: ', props);
  return (
     <div>{props.data.users && props.data.users.map(user=>{
       return <div key={user.id}><h3>Name:{user.firstName}, ID: {user.id}</h3><h4>Superuser:{user.su?'true':'false'}</h4></div>
     })}
       Number of books: {props.data.books && JSON.stringify(props.data.books)}
     </div>
  )
};

export default graphql(gql`
    query {
        users {
            id
            firstName
            su
        }
        books {
            id
            title
            author
            description
            rating
        }
    }
`)(GqlIntegration)
