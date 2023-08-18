<script lang="ts">
  import { enhance } from '$app/forms'
  export let form
</script>

<svelte:head>
  <title>EWA Employee</title>
</svelte:head>

<div class="px-4 py-12 md:py-24">
  <div class="text-4xl text-bold text-gray-900 pb-8">
    Sign in to EWA
  </div>

  <form class="space-y-6" action="#" method="POST" use:enhance>
    <div>
      <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
      <div class="mt-2">
        <input id="email" name="email" type="email" autocomplete="email" value={form?.email ?? 'demo@nickyirawan.id'} required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between">
        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
      </div>
      <div class="mt-2">
        <input id="password" name="password" type="password" value={form?.email ?? '12345678'} autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
      </div>
    </div>

    <div>
      <button type="submit" class="flex w-full justify-center rounded-md bg-green-600 px-3 py-4 text-lg font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Sign in</button>
    </div>
  </form>
</div>