Vue.directive('mylable', {
    // isLiteral: true,
    bind: function() {
	console.log(this.arg)
	console.log(this.expression)
	html = '<label class="control-label col-xs-6">'+this.expression+'</label>'
	this.el.innerHTML = html
    } 
    // ,
    // update: function() {
    // 	console.log(this.arg)
    // 	this.el.innerHTML = this.arg
    // }
});

var mylabel = new Vue({
    el: '#mylabel'
    // ,
    // data: {
    // 	msg: 'OOO'
    // }
});


