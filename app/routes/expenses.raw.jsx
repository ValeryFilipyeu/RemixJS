// /expenses/raw

import { requireUserSession } from 'app/data/auth.server';
import { getExpenses } from 'app/data/expenses.server';

export async function loader({request}) {
  const userId = await requireUserSession(request);
  return getExpenses(userId);
}
