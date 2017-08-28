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
	template: '#varin',
	methods: { onInput (e) { this.$emit('input', e.target.value) }}
})

