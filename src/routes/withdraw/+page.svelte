<!-- src/routes/account/+page.svelte -->
<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms'

	export let data

	let loading = false

	const handleSignOut: SubmitFunction = () => {
		loading = true
		return async ({ update }) => {
			loading = false
			update()
		}
	}
</script>

<div class="bg-green-500 text-white p-4">
	<div class="flex flex-row justify-between">
		<a href="/" class="button block text-lg" disabled={loading}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
			  <path fill-rule="evenodd" d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z" clip-rule="evenodd" />
			</svg>
		</a>
	</div>

	<div class="w-full my-4 flex flex-col justify-center items-center">
		<div class="text-sm">
			Saldo #GajianKapanAja
		</div>
		<div class="text-4xl font-bold">
			{
				new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
					.format(data?.salary?.salary_active ?? 0)
			}
		</div>
	</div>
</div>

<div class="p-4 bg-white">
	<form class="space-y-6" action="#" method="POST" use:enhance>
	  <div>
	    <label for="amount" class="block text-sm font-medium leading-6 text-gray-900">
	    	Nominal
	    </label>
	    <div class="mt-2">
	      <input id="amount" name="amount" type="text" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
	    </div>
	  </div>

	  <div>
	    <div class="flex items-center justify-between">
	      <label for="reason" class="block text-sm font-medium leading-6 text-gray-900">
	      	Alasan Penarikan
	    	</label>
	    </div>
	    <div class="mt-2">
	      <input id="reason" name="reason" type="text" required class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-600 sm:text-sm sm:leading-6">
	    </div>
	  </div>

	  <div>
	    <button type="submit" class="flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-md font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
	    	Ajukan Penarikan
	    </button>
	  </div>
	</form>
</div>