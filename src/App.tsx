import React from 'react';
import { useRoutes } from 'react-router';
import { ROUTES } from './routes';

export function App() {
  const element = useRoutes(ROUTES);
  return element;
}
