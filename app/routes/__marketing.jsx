import { Outlet } from '@remix-run/react';

import MainHeader from 'app/components/navigation/MainHeader';
import { getUserFromSession } from 'app/data/auth.server';
import marketingStyles from 'app/styles/marketing.css';

export default function MarketingLayout() {
  return (
    <>
      <MainHeader />
      <Outlet />;
    </>
  );
}

export function loader({ request }) {
  return getUserFromSession(request);
}

export function links() {
  return [{ rel: 'stylesheet', href: marketingStyles }];
}

export function headers() {
  return {
    'Cache-Control': 'max-age=3600' // 60 minutes
  }
}
