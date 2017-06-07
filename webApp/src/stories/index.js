import React from 'react';
import { module, storiesOf } from '@kadira/storybook';
import Library from "../Library/Library";
import AvatarMenu from "../AvatarMenu/AvatarMenu";
import BookDetail from "../BookDetail/BookDetail";
import {MemoryRouter} from "react-router-dom";
import BookNotes from "../BookDetail/BookNotes/BookNotes";
import ActionBar from "../BookDetail/ActionBar/ActionBar";


storiesOf('Library', module)
  .add('logged in', () =>(
    <Library isLoggedIn={true}/>
  ))
  .add('not logged in', () =>(
    <Library isLoggedIn={false}/>
  ));

storiesOf('Avatar Menu', module)
   .addDecorator(story =>(
      <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
   ))
  .add('closed',()=>(
   <AvatarMenu/>
  ));

storiesOf('Book Details', module)
  .add('Guide', ()=>(
    <BookDetail title='title' author="author" cover="https://images-na.ssl-images-amazon.com/images/I/A1HGWCA36hL.jpg"/>
  ));

storiesOf('Book Notes', module)
  .add('Editable', () =>(
     <BookNotes editing="true" label="notes"/>
  ))
  .add('Not Editable', () =>(
     <BookNotes editing="false" label="notes"/>
  ))
  .add('Preloaded Content', () =>(
     <BookNotes editing="true" label="notes" content="This is some content. LEROY JENKINS!"/>
  ))
  .add('No label', () =>(
     <BookNotes editing="false" />
  ));

storiesOf('ActionBar', module)
  .add('Owned', ()=>(
     <ActionBar owned={true} />
  ))
  .add('Not Owned, Number of Copies', ()=>(
     <ActionBar owned={false} numberOfCopies={16000000}/>
  ))
  .add('Not Owned, no Number of Copies', ()=>(
     <ActionBar owned={false} />
  ))