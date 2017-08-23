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


Vue.component('my', {
    props: ['opt1', 'opt2', 'value'],
    template: `
	<form class="form-horizontal">
	<div class="form-group">
	<label class="control-label col-xs-6">{{ opt1 }}</label>
	<div class="col-xs-6">
	<input class="form-control" v-on:input="onInput" onClick="this.select();" type="text">
	</div>
	</div>
	</form>
	`,
    methods:{
	onInput(e) {
	    this.$emit('input', e.target.value)
	}
    }
})

