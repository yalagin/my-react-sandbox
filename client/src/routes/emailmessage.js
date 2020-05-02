import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../components/emailmessage/';

export default [
  <Route path="/email_messages/create" component={Create} exact key="create" />,
  <Route path="/email_messages/edit/:id" component={Update} exact key="update" />,
  <Route path="/email_messages/show/:id" component={Show} exact key="show" />,
  <Route path="/email_messages/" component={List} exact strict key="list" />,
  <Route path="/email_messages/:page" component={List} exact strict key="page" />
];
