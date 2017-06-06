import React from 'react';
import {StyleSheet, css} from "aphrodite";

const styles = StyleSheet.create({
  notes:{
    marginTop: 24,
  },
  editor:{
    minHeight: 48,
    width: '100%',
    boxShadow: '0 1px 2px rgba(0,0,0,.25), 0 0 1px rgba(0,0,0,.35)',
    border: 'none',
  },
  label:{
    marginTop: 18,
  }
});

let BookNotes = (props)=>{

  return (
     <section className={css(styles.notes)}>
       <label className={css(styles.label)}>{props.label}</label>
       <div contentEditable={props.editing} className={css(styles.editor)}>
         {props.content}
       </div>
     </section>
   )
};

export default BookNotes;