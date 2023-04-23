import { Customer, InsertCustomer } from "~/db/schemas/customers";

const base: string = 'http://0.0.0.0:8787'

export async function getAllCostumers (){
    return await fetch(`${base}/customers`);
}

export async function saveCostumer(data: Omit<InsertCustomer, "id">) {
    return await fetch(`${base}/customers`, {
        method: 'POST',
        body: JSON.stringify(data),
    })
}

export async function deleteCostumer(id: string) {
    return await fetch(`${base}/customers/${id}`, {
        method: 'DELETE',
    })
}

export async function updateCostumer(data: Customer) {
    const id = data.id;
    return await fetch(`${base}/customers/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    })
}