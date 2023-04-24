import { component$ } from "@builder.io/qwik";
import CustomerIcon from "../Icons/customerIcon";
import HomeIcon from "../Icons/homeIcon";
import InvoiceIcon from "../Icons/invoiceIcon";

export default component$(() => {
    return <div class="drawer-side">
        <div class="bg-base-100 px-8 py-8 flex title-font font-medium items-center text-gray-900">
            <span class="text-xl">WebInvoice</span>
        </div>
        <ul class="menu p-4 w-65  bg-base-100 text-base-content">
            <li><a href="/app/dashboard"><div class="flex gap-2"><HomeIcon /><span>Dashboard</span></div></a></li>
            <li><a href="/app/customers"><div class="flex gap-2"><CustomerIcon /><span>Customers</span></div></a></li>
            <li><a href="/app/invoice"><div class="flex gap-2">< InvoiceIcon /><span>Invoice</span></div></a></li>
        </ul>
    </div>
})