import { component$ } from "@builder.io/qwik";
import { sideLinks } from "~/lib/utils/sidebar";

export default component$(() => {
    return <div class="drawer-side">
        <ul class="menu p-4 w-60 bg-base-100 text-base-content">
            {sideLinks.map((link, i) => <li key={i}><a href={link.href}>{link.label}</a></li>)}
        </ul>
    </div>
})