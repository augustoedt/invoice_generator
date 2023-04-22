import { component$ } from "@builder.io/qwik";

export default component$(() => {
    return <div class="flex justify-center mt-10">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm shadow-md px-6 py-6 rounded-md">
            <h2 class="text-center text-2xl font-bold mb-6">Login</h2>
            <form action="#" method="POST">
                <div class="gap-2">
                    <label class="block text-gray-700 font-semibold mb-2" for="username">Username</label>
                    <input class="border border-gray-400 p-2 w-full rounded-md" type="text" id="username" name="username" required />
                </div>
                <div class="mt-4 gap-2">
                    <label class="block text-gray-700 font-semibold mb-2" for="password">Password</label>
                    <input class="border border-gray-400 p-2 w-full rounded-md" type="password" id="password" name="password" required />
                </div>
                <div class="mt-4 text-right">
                    <a href="#" class="text-gray-700 hover:text-gray-800 font-semibold text-sm">Forgot password?</a>
                </div>

                <div class="mt-8 flex flex-col items-center">
                    <a href="/app" class="btn btn-primary btn-wide rounded-md">
                            Sign in
                    </a>
                </div>
            </form>
        </div>
    </div>
});