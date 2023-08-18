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
		<div class="text-lg">
			Hi, {((data?.employee?.name ?? '') + '').split(' ')[0]}!
		</div>

		<form method="post" action="?/signout" use:enhance={handleSignOut}>
			<div>
				<button class="button block text-lg" disabled={loading}>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
					  <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clip-rule="evenodd" />
					</svg>
				</button>
			</div>
		</form>
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

<div class="bg-white p-4">
	<div class="font-bold text-sm mb-2">
		Detail Gajian
	</div>
	<div class="grid grid-cols-2 gap-1 text-xs">
		<div>
			Periode
		</div>
		<div class="text-right">
			{data?.salary?.start_date} s/d {data?.salary?.end_date}
		</div>
		<div>
			Total Gaji
		</div>
		<div class="text-right">
			{
				new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
					.format(data?.salary?.salary_total ?? 0)
			}
		</div>
		<div>
			Saldo Akan Tersedia
		</div>
		<div class="text-right">
			{
				new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
					.format(data?.salary?.salary_hold ?? 0)
			}
		</div>
		<div>
			Menunggu Persetujuan
		</div>
		<div class="text-right">
			{
				new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
					.format(data?.salary?.salary_pending ?? 0)
			}
		</div>
		<div>
			Sudah Ditarik
		</div>
		<div class="text-right">
			{
				new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
					.format(data?.salary?.salary_withdrawn ?? 0)
			}
		</div>
		<div>
			Saldo Gaji Tersedia
		</div>
		<div class="text-right">
			{
				new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
					.format(data?.salary?.salary_active ?? 0)
			}
		</div>
	</div>
</div>

<div class="p-4">
	<div class="font-bold text-sm mb-2">
		Riwayat Penarikan
	</div>
	
	{#if data?.withdrawal?.length <= 0}
		<div class="text-xs">
			Belum ada Penarikan
		</div>
	{/if}

	<div class="flex flex-col gap-2">
		{#each data?.withdrawal as withdrawal}
			<div class="bg-white rounded-md w-full p-3 grid grid-cols-2 gap-1 shadow-md">
				<div class="text-sm">
					{withdrawal.created_at.substr(0, 10)}
				</div>
				<div class="text-sm text-right">
					{
						new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })
							.format(withdrawal.amount)
					}
				</div>
				<div class="text-xs">
					{withdrawal.reason ?? ''}
				</div>
				<div class="text-right text-xs">
					{#if withdrawal.status === 'PENDING'}
						<div class="text-orange-500">
							{withdrawal.status}
						</div>
					{:else if withdrawal.status === 'APPROVED'}
						<div class="text-green-500">
							{withdrawal.status}
						</div>
					{:else if withdrawal.status === 'REJECTED'}
						<div class="text-red-500">
							{withdrawal.status}
						</div>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</div>

<div class="fixed bottom-0 left-0 right-0 z-10 max-w-lg mx-auto">
	<a href="/withdraw" class="absolute rounded-full bg-green-500 text-white w-14 h-14 right-6 bottom-6 shadow-lg flex items-center justify-center">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
		  <path fill-rule="evenodd" d="M5.478 5.559A1.5 1.5 0 016.912 4.5H9A.75.75 0 009 3H6.912a3 3 0 00-2.868 2.118l-2.411 7.838a3 3 0 00-.133.882V18a3 3 0 003 3h15a3 3 0 003-3v-4.162c0-.299-.045-.596-.133-.882l-2.412-7.838A3 3 0 0017.088 3H15a.75.75 0 000 1.5h2.088a1.5 1.5 0 011.434 1.059l2.213 7.191H17.89a3 3 0 00-2.684 1.658l-.256.513a1.5 1.5 0 01-1.342.829h-3.218a1.5 1.5 0 01-1.342-.83l-.256-.512a3 3 0 00-2.684-1.658H3.265l2.213-7.191z" clip-rule="evenodd" />
		  <path fill-rule="evenodd" d="M12 2.25a.75.75 0 01.75.75v6.44l1.72-1.72a.75.75 0 111.06 1.06l-3 3a.75.75 0 01-1.06 0l-3-3a.75.75 0 011.06-1.06l1.72 1.72V3a.75.75 0 01.75-.75z" clip-rule="evenodd" />
		</svg>
	</a>
</div>
