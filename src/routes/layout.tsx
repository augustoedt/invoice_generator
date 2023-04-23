import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';

import Footer from '~/components/starter/footer/footer';
import Header from '~/components/starter/header/header';
import Sidebar from '~/components/sidebar/sidebar';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const location = useLocation();
  const isApp = location.url.pathname.startsWith('/app');
  return (
    <div class="page">
      {!isApp && <Header />}
      <main>
        <div class="flex w-full">
          {isApp && <div class="grid card bg-base-300 rounded-box place-items-center">
            <Sidebar />
          </div>}
          {isApp && <div class="divider divider-horizontal"></div>}
          <div class="grid flex-grow card rounded-box place-items-center">
            <Slot />
          </div>
        </div>
        <div class="flex flex-col items-center">
        </div>

      </main >
      <div class="">
        <div class="">
          <Footer />
        </div>
      </div>
    </div >
  );
});
