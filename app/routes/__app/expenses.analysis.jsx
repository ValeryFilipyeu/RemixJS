// /expenses/analysis
import { json } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';

import ExpenseStatistics from 'app/components/expenses/ExpenseStatistics';
import Chart from 'app/components/expenses/Chart';
import { getExpenses } from 'app/data/expenses.server';
import Error from 'app/components/util/Error';
import { requireUserSession } from 'app/data/auth.server';

export default function ExpensesAnalysisPage() {
  const expenses = useLoaderData();

  return (
    <main>
      <Chart expenses={expenses} />
      <ExpenseStatistics expenses={expenses} />
    </main>
  );
}

export async function loader({request}) {
  const userId = await requireUserSession(request);

  const expenses = await getExpenses(userId);

  if (!expenses || expenses.length === 0) {
    throw json(
      { message: 'Could not load expenses for the requested analysis.' },
      {
        status: 404,
        statusText: 'Expenses not found',
      }
    );
  }

  return expenses; // return json(expenses);
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  return (
    <main>
      <Error title={caughtResponse.statusText}>
        <p>
          {caughtResponse.data?.message ||
            'Something went wrong - could not load expenses.'}
        </p>
      </Error>
    </main>
  );
}
