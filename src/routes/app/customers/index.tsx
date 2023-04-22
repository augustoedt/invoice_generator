import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { db } from "~/db/db";
import type { Customer } from "~/db/schemas/customers";
import { customers } from "~/db/schemas/customers";

export const useCostumers = routeLoader$(async () => {
    // This code runs only on the server, after every navigation
    const allCustomers = db.select().from(customers).all();
    return allCustomers;
});

export default component$(() => {
    const signal = useCostumers();
    return <section class="text-gray-600 body-font">
        <div class="container px-5 py-12 mx-auto">
            <div class="">
                <label for="create-modal" class="btn btn-primary">Create</label>
                <form>
                    <input type="checkbox" id="create-modal" class="modal-toggle" />
                    <div class="modal">
                        <div class="modal-box">
                            <h3 class="font-bold text-2xl text-center mb-6">Create Customer</h3>
                            <div class="flex flex-col mb-4">
                                <label class="text-gray-500 font-semibold mb-1" for="name">Name</label>
                                <input id="name" name="name" type="text" placeholder="Delegate name" class="input input-bordered input-primary w-full" />
                            </div>
                            <div class="flex flex-col">
                                <label class="text-gray-500 font-semibold mb-1" for="company">Company</label>
                                <input id="company" name="company" type="text" placeholder="Company name" class="input input-bordered input-primary w-full" />
                            </div>
                            <div class="modal-action">
                                <label for="create-modal" class="btn btn-outline">Close</label>
                                <button>
                                    <label for="create-modal" class="btn btn-primary">Create</label>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
                <table class="table table-striped mt-6">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {signal.value.map((customer: Customer, i) => <tr key={i}>
                            <td>{customer.name}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
});