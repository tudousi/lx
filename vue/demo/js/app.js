/*
var TDComponent = Vue.extend({
    template: '<div>component -{{ name }}</div><input type="text" v-model="name"> {{ tp }}',
    data: function() {
        return {
            tds: 'td'
        }
    },
    props: {
        name: Number,
        tp: {
            type: String,
            default: 'shark'
        }
    }
});
Vue.component('td-component', TDComponent);
*/
Vue.component('child', {
    template: '#child-template',
    data: function(){
        return {
            msg: 'hello'
        }
    },
    methods: {
        notify: function() {
            if(this.msg.trim()) {
                this.$dispatch('child-msg', this.msg);
                this.msg = '';
            }
        }
    }
});
var vm = new Vue({
    el: '#events-example',
    data: {
        message: []
    },
    methods: {
        handleIt: function(msg) {
            this.message.push(msg);
        }
    }
});
var child = vm.$refs.profile;














//
