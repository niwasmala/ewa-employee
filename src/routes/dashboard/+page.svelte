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

<div class="form-widget">
	<div class="text-gray-200">
		Hi {data?.profile?.name},
	</div>

	<form method="post" action="?/signout" use:enhance={handleSignOut}>
		<div>
			<button class="button block text-gray-200" disabled={loading}>Sign Out</button>
		</div>
	</form>
</div>