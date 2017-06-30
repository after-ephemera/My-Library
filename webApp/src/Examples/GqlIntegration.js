import React from 'react';
import {gql, graphql} from "react-apollo";


let GqlIntegration = (props)=>{
  console.log('Test props: ', props);
  return (
     <div>{props.data.users && props.data.users.map(user=>{
       return <div key={user.id}><h3>Name:{user.firstName}</h3><h4>Superuser:{user.su?'true':'false'}</h4></div>
     })}</div>
  )
};

export default graphql(gql`
    query {
        users {
            id
            firstName
            su
        }
    }
`)(GqlIntegration)
