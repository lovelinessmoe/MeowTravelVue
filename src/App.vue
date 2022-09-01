<template>
	<LoadingPage/>
	<TopBar/>
	<TravelPage/>
	<FooterView/>
	<!--    <meting-js
				fixed="true"
				id="7454455583"
				server="netease"
				type="playlist"
				volume="0.4">
		</meting-js>-->

	<!--    https://music.163.com/playlist?id=7454455583&userid=265622372-->
</template>

<script>
import LoadingPage from "./components/LoadingPage.vue";
import TopBar from "./components/TopBar.vue";
import TravelPage from "./Page/TravelPage.vue";
import FooterView from "./components/FooterView.vue";

export default {
	name: 'App',
	components: {FooterView, TravelPage, TopBar, LoadingPage},
	data() {
		return {}
	},
	methods: {}
}
</script>

<style>
#app {
	font-size: 17px;
	color: #6f6f6f;
}

html, body {
	margin: 0;
	padding: 0;
	min-height: calc(100vh - 80px);
}


</style>
