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


Vue.component('my-component', {
    props: ['opt'],
    template: '<div class="form-group"><label class="control-label col-xs-6">{{ opt }}</label><div class="col-xs-6"><input class="form-control" onClick="this.select();" type="text"></div></div>'
    // template:`<h3>
    // 	{{ opt }}
    // </h3>`
    // template: '<div class="form-group"><label class="control-label col-xs-6">{{ opt }}</label><div class="col-xs-6"><input class="form-control" v-model="{{ this.opt }}" onClick="this.select();" type="text"></div></div>'
})



