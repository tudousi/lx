(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['b'], factory);
    } else {
        // Browser globals
        root.amdWeb = factory(root.b);
    }
}(this, function (b) {
    //use b in some fashion.

    // Just return a value to define the module export.
    // This example returns an object, but the module
    // can return a function as the exported value.
    return function(abc){};
}));

$(function(){
    var dx = 0, dy = 0;
    var taCount = $('.timeaxis-item').length;
    var index = 0;

    var firstTimeaxisWidth = $('.timeaxis-item').eq(0).width();

    touch.on('.timeaxis-bar', 'toushstart', function(ev) {
        ev.preventDefault();
    });
    touch.on('.timeaxis-item', 'tap', function(ev) {
        var self = ev.currentTarget;
        var bar = $('.timeaxis-bar')[0];
        var index = $('.timeaxis-item').index(ev.currentTarget) - 2;

        findSi(index * firstTimeaxisWidth);

        bar.style.transition = '-webkit-transform 0.4s ease 0s';
        bar.style.transform = 'translate3d(' + dx + 'px, 0px, 0px)';
        setTimeout(function() {
            bar.style.transition = '';
        }, 500);
        setClass();
    });

    touch.on('.timeaxis-bar', 'drag', function(ev){
        var offx = dx + ev.x;
	    var offy = dy + ev.y;

        ev.currentTarget.style.transform = 'translate3d(' + offx + 'px, 0px, 0px)'
    	console.log("当前x值为:" + dx);
    });
    touch.on('.timeaxis-bar', 'dragend', function(ev) {
        var offx = dx + ev.x;
	    var offy = dy + ev.y;
        var self = ev.currentTarget;

        dx = offx;
        dy = offy;

        // 超出限制
        if(offx > 0) {
            self.style.transform = 'translate3d(0px, 0px, 0px)';
            dx = 0;
            dy = 0;
        }

        // 修正后的位置
        if( (-(taCount - 3) * firstTimeaxisWidth ) > dx ) {
            dx = (-(taCount - 3) * firstTimeaxisWidth );
            findSi(dx);
            self.style.transform = 'translate3d(' + dx + 'px, 0px, 0px)';
        } else {
            // 修正当前位置
            findSi(dx);
            self.style.transform = 'translate3d(' + dx + 'px, 0px, 0px)';
        }
        ev.currentTarget.style.transition = '-webkit-transform 0.4s ease 0s';

        // 修正class
        setClass();

        setTimeout(function() {
            self.style.transition = '';
        }, 500);
        console.log(ev);
    });

    // 查找最近的元素
    function findSi(tdx){

        tdx = Math.abs(tdx);
        index = Math.round(tdx / firstTimeaxisWidth);
        console.log('选中：' + index);
        dx = -(index * firstTimeaxisWidth);
    }
    function setClass() {
        $('.timeaxis-item').removeClass('timeaxis-active');
        $('.timeaxis-item').eq(index + 2).addClass('timeaxis-active');
    }
});
