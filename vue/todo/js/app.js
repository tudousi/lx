(function(exports) {
    var filters = {
        all: function(todos) {
            return todos;
        },
        active: function(todos) {
            return todos.filter(function(todo) {
                return !todo.completed
            });
        },
        completed: function(todos) {
            return todos.filter(function(todo) {
                return todo.completed;
            })
        }
    }
    exports.app = new Vue({
        el: '.todoapp',
        data: {
            todos: todoStorage.fetch(),
            newTodo: '',
            editedTodo: null,
            visibility: 'all'
        },
        watch: {
            todos: {
                handler: function(todos) {
                    todoStorage.save(todos);
                },
                deep: true
            }
        },
        computed: {
            filteredTodos: function() {
                return filters[this.visibility](this.todos);
            }
        },
        methods: {
            addTodo: function() {
                var value = this.newTodo && this.newTodo.trim();
                if(!value) {
                    return;
                }
                this.todos.push({title: value, computed: false});
                this.newTodo = "";
            },
            removeTodo: function(todo) {
                this.todos.$remove(todo);
            }
        },
        directives: {
            'todo-focus': function(value) {
                console.log(value);
            }
        }
    })
})(window)
