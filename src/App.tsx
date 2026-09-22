import React from 'react';
import { useRoutes } from 'react-router';
import { PORTAL_ROUTES } from './routes';

export function App() {
  const routes = useRoutes(PORTAL_ROUTES);
  return routes;
}
