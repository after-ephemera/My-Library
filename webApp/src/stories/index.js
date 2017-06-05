import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import Button from './Button';
import Welcome from './Welcome';
import Library from "../Library/Library";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import BookDetail from "../BookDetail/BookDetail";

// storiesOf('Welcome', module)
//   .add('to Storybook', () => (
//     <Welcome showApp={linkTo('Button')}/>
//   ));
//
// storiesOf('Button', module)
//   .add('with text', () => (
//     <Button onClick={action('clicked')}>Hello Button</Button>
//   ))
//   .add('with some emoji', () => (
//     <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
//   ));

storiesOf('Library', module)
  .add('logged in', () =>(
    <Library isLoggedIn={true}/>
  ))
  .add('not logged in', () =>(
    <Library isLoggedIn={false}/>
  ));

storiesOf('Avatar Menu', module)
  .add('closed',()=>(
    <AvatarMenu />
  ));

storiesOf('BookDetail')
  .add('Guide', ()=>(
    <BookDetail title='title' author="author" cover="https://images-na.ssl-images-amazon.com/images/I/A1HGWCA36hL.jpg"/>
  ))