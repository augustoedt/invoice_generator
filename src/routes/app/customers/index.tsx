import { component$, useStore } from "@builder.io/qwik";
import { Form, routeAction$, routeLoader$ } from "@builder.io/qwik-city";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { db } from "~/db/db";
import type { Customer, InsertCustomer } from "~/db/schemas/customers";
import { customers } from "~/db/schemas/customers";

export const useAddCustomer = routeAction$(async (data) => {
    // This will only run on the server when the user submits the form (or when the action is called programatically)
    console.log({
        name: data.name,
        company: data.company,
    });
    db.insert(customers).values({
        id: randomUUID(),
        name: data.name,
        company: data.company,
        phone: data.phone,
    } as InsertCustomer).returning().get();

    return {
        success: true,
    };
});

export const useDeleteCustomer = routeAction$(async (data) => {
    db.delete(customers).where(eq(customers.id, data.id as string)).run()
    return {
        success: true,
    };
});

export const useUpdateCustomer = routeAction$(async (data) => {
    const id = data.id as string;
    db.update(customers).set({ company: data.company as string, name: data.name as string, phone: data.phone as string }).where(eq(customers.id, id)).returning().all()
    return {
        success: true,
    };
});

export const useCostumers = routeLoader$(async () => {
    // This code runs only on the server, after every navigation
    const allCustomers = db.select().from(customers).all();
    return allCustomers;
});

const initialCostumer: Customer = {
    id: '',
    name: '',
    company: '',
    email: '',
    phone: '',
}

export default component$(() => {
    const allCostumers = useCostumers();
    const currentCostumer = useStore({
        value: initialCostumer,
    });
    const addUserAction = useAddCustomer();
    const deleteCustomerAction = useDeleteCustomer();
    const updateUserAction = useUpdateCustomer();

    return <section class="text-gray-600 body-font">
        <div class="container px-5 py-12 mx-auto">
            <label for="create-modal" class="btn btn-primary">Create</label>
            <Form action={addUserAction}>
                <input type="checkbox" id="create-modal" class="modal-toggle" />
                <div class="modal">
                    <div class="modal-box">
                        <h3 class="font-bold text-2xl text-center mb-6">Create Customer</h3>
                        <div class="flex flex-col mb-4">
                            <label class="text-gray-500 font-semibold mb-1" for="name">Name</label>
                            <input id="name" name="name" type="text" placeholder="Delegate name" class="input input-bordered input-primary w-full" />
                        </div>
                        <div class="flex flex-col mb-4">
                            <label class="text-gray-500 font-semibold mb-1" for="company">Company</label>
                            <input id="company" name="company" type="text" placeholder="Company name" class="input input-bordered input-primary w-full" />
                        </div>
                        <div class="flex flex-col mb-4">
                            <label class="text-gray-500 font-semibold mb-1" for="phone">Phone</label>
                            <input id="phone" name="phone" type="text" placeholder="Contact " class="input input-bordered input-primary w-full" />
                        </div>
                        <div class="modal-action">
                            <label for="create-modal" class="btn btn-outline">Close</label>
                            <button type="submit">
                                <label for="create-modal" class="btn btn-primary">Create</label>
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
            <table class="table table-striped mt-6 w-full">
                <thead>
                    <tr>
                        <td scope="col">Actions</td>
                        <td scope="col">Name</td>
                        <td scope="col">Company</td>
                        <td scope="col">Phone</td>
                    </tr>
                </thead>
                <tbody>
                    {allCostumers.value.map((customer: Customer, i) => <tr key={i}>
                        <td><div class="flex gap-2 justify-start">
                            <Form action={deleteCustomerAction}>
                                <input hidden type="text" name="id" value={customer.id} />
                                <button class="btn btn-square btn-sm btn-outline btn-error"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-2"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg></button>
                            </Form>
                            <label onClick$={() => currentCostumer.value = customer} class="btn btn-square btn-sm btn-outline btn-primary" for="update-modal"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-edit"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg></label>
                        </div></td>
                        <td>{customer.name}</td>
                        <td>{customer.company}</td>
                        <td>{customer.phone}</td>
                    </tr>)}
                </tbody>
            </table>
            <Form action={updateUserAction}>
                <input type="checkbox" id="update-modal" class="modal-toggle" />
                <div class="modal">
                    <div class="modal-box">
                        <input hidden name="id" value={currentCostumer.value.id} />
                        <h3 class="font-bold text-2xl text-center mb-6">Update Customer</h3>
                        <div class="flex flex-col mb-4">
                            <label class="text-gray-500 font-semibold mb-1" for="name">Name</label>
                            <input id="name" name="name" type="text" placeholder="Delegate name" class="input input-bordered input-primary w-full"
                                value={currentCostumer.value.name}
                                onChange$={e => currentCostumer.value.name = e.target.value}
                            />
                        </div>
                        <div class="flex flex-col mb-4">
                            <label class="text-gray-500 font-semibold mb-1" for="company">Company</label>
                            <input id="company" name="company" type="text" placeholder="Company name" class="input input-bordered input-primary w-full"
                                value={currentCostumer.value.company}
                                onChange$={e => currentCostumer.value.company = e.target.value}
                            />
                        </div>
                        <div class="flex flex-col mb-4">
                            <label class="text-gray-500 font-semibold mb-1" for="phone">Phone</label>
                            <input id="phone" name="phone" type="text" placeholder="Contact " class="input input-bordered input-primary w-full"
                                value={currentCostumer.value.phone}
                                onChange$={e => currentCostumer.value.phone = e.target.value}
                            />
                        </div>
                        <div class="modal-action">
                            <label for="update-modal" class="btn btn-outline">Close</label>
                            <button type="submit">
                                <label for="update-modal" class="btn btn-primary">Create</label>
                            </button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    </section>
});