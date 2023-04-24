import { Slot, component$ } from '@builder.io/qwik';
import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import Sidebar from '~/components/sidebar/sidebar';

import Footer from '~/components/starter/footer/footer';
import Header from '~/components/starter/header/header';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  const location = useLocation();
  const isApp = location.url.pathname.startsWith('/app');
  return (
    <>
      {!isApp && <Header />}
      {!isApp && <div class="flex flex-col items-center">
        <Slot />
      </div>}
      <main>
        {isApp && <div class="drawer drawer-mobile">
          <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
            <div class="px-6 xl:pr-2 pb-16">
              <div class="flex flex-col-reverse justify-between gap-6 xl:flex-row">
                <div class="prose w-full max-w-6xl flex-grow">
                  <Slot />
                </div>
              </div>
            </div>
          </div>
          <div class="drawer-side">
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <Sidebar />
          </div>
        </div>}
        {/* <div class="flex w-full">
          {isApp && <div class="grid card bg-base-300 rounded-box place-items-center">
            <Sidebar />
          </div>}
          {isApp && <div class="divider divider-horizontal"></div>}
          <div class="grid flex-grow card rounded-box place-items-center">
            <Slot />
          </div>
        </div>
        <div class="flex flex-col items-center">
        </div> */}

      </main >
      <Footer />

    </>
  );
});
