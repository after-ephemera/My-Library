const models = {};

export default function addModelsToContext(context) {
  const newContext = Object.assign({}, context);
  Object.keys(models).forEach((key) => {
    newContext[key] = new models[key](newContext);
  });
  return newContext;
}

import Book from './Book';
models.Book = Book;

import Preferences from './Preferences';
models.Preferences = Preferences;

import User from './User';
models.User = User;
