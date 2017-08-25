function memoCtrl($scope) {
	$scope.esc_ret = function() {
		return $scope.ESC_INPUT.replace(/\//g, '\\/').
		replace(/\u0008/g, '\\b').
		replace(/\t/g, '\\t').
		replace(/\n/g, '\\n').
		replace(/\f/g, '\\f').
		replace(/\r/g, '\\r').
		replace(/'/g, '\\\'').
		replace(/"/g, '\\"').
		replace(/ /g, '\\ ');
	}
}

Vue.component('varin', {
	props: ['label','value'],
	template: `
	<div class="form-group">
	<label class="control-label col-xs-6">{{ label }}</label>
	<div class="col-xs-6">
	<input type="text" class="form-control" v-on:input="onInput" onClick="this.select();"/>
	</div>
	</div>`,
	methods: { onInput (e) { this.$emit('input', e.target.value) }}
})

