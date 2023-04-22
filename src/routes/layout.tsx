import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';

import Footer from '~/components/starter/footer/footer';
import Header from '~/components/starter/header/header';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const location = useLocation();
  return (
    <div class="page">
      <main>
        <Header path={location.url.pathname} />
        <Slot />
      </main>
      <div class="section">
        <div class="container">
          <Footer />
        </div>
      </div>
    </div>
  );
});
