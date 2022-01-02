<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>Radio4000 channel migration</title>
	<link rel="stylesheet" type="text/css" href="./styles.css" />

	<script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js"></script>
	<script src="https://www.gstatic.com/firebasejs/9.1.3/firebase-auth-compat.js"></script>

	<!-- <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script> -->
	<!-- <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-auth.js"></script> -->
	<!-- <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-database.js"></script> -->

	<!-- firebase ui -->
	<script src="https://www.gstatic.com/firebasejs/ui/6.0.0/firebase-ui-auth.js"></script>

	<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js"></script>

	<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
</head>

<body>

	<div id="app">
		<h1>Firebase &rarr; Supabase</h1>
		<p>This website will help you import your channel, from the old Radi4000, to the new Radio4000 system!</p>

		<section v-show="!tokenFirebase">
			<h2>1. Old r4 (Firebase)</h2>
			<p>Sign in your old Radio4000 account.</p>
			<div id="firebaseui-auth-container"></div>
			<div id="loader">Loading...</div>
		</section>

		<section v-show="!tokenSupabase">
			<h2>2. New r4 (Supabase)</h2>
			<p>Sign in your new Radio4000 account.</p>
			<form v-on:submit.prevent="loginSupabase">
				<label>Email
					<input v-model="email" type="email" name="email" required>
				</label><br>
				<label>Password
					<input v-model="password" type="password" name="password" required>
				</label><br>
				<button type="submit">log in supabase</button>
			</form>
		</section>

		<section>
			<h2>3. Migration</h2>
			<p v-if="tokenFirebase">firebase yes <button v-on:click="logoutFirebase">log out from Firebase</button></p>
			<p v-else>waiting for Firebase user</p>
			<p v-if="tokenSupabase">supabase yes <button v-on:click="logoutSupabase">log out from Supabase</button></p>
			<p v-else>waiting for Supabase user</p>
			<button v-on:click="startMigration" :disabled="!canMigrate">Start migration</button>
		</section>
	</div>

	<script type="module" src="website.js"></script>
</body>

</html>