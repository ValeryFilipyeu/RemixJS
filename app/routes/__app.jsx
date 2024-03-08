// /expenses/add

import { Outlet } from '@remix-run/react';

import expensesStyles from 'app/styles/expenses.css';
import ExpensesHeader from 'app/components/navigation/ExpensesHeader';

export default function ExpensesAppLayout() {
  return (
    <>
      <ExpensesHeader />
      <Outlet />
    </>
  );
}

export function links() {
  return [{ rel: 'stylesheet', href: expensesStyles }];
}
