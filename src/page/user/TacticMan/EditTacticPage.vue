<template>
	<div style="margin-top: 80px;">
		<TacticEdit v-bind:articleTitleDisable="true"
		            v-bind:tacticId="this.$route.params.id"
		            @close="this.$router.go(-1);"
		            @save="saveTactic"/>
	</div>
</template>

<script>
import TacticEdit from "../../system/TacticEdit.vue";
import {ElNotification} from "element-plus";
import {editTactic} from "../../../api/user/tactic.js";
import router from "../../../router/index.js";

export default {
	name: "EditTacticPage",
	components: {TacticEdit},
	methods: {
		async saveTactic(blogForm) {
			const res = await editTactic(blogForm);
			if (res.success) {
				ElNotification({
					message: '成功',
					type: 'success'
				})
				router.go(-1);
			}
		},
	}
}
</script>

<style scoped>

</style>