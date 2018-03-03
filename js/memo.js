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
});





var titles = document.getElementsByTagName('h1');
var titleTextArray = [];

for (var i=0; i<titles.length; i += 1) {
    var title = titles[i];
    titleTextArray.push({
	title: title.hasAttribute('alt-title') ? title.getAttribute('alt-title') : title.innerText,
	href: title.id
    });
}

var vm = new Vue({
    el: '.menu',
    data: {
	titles: titleTextArray
    }
});
