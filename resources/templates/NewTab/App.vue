<template>
	<transition name="fade">
		<div class="flex-app-container" v-if="show">
			<slot></slot>
		</div>
	</transition>
</template>

<script>
const data = () => ({
	show: false
});

const mounted = function() {
	this.show = true;
};

export default {
	data,
	mounted
}
</script>