(function(exports) {
    debugger;
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
            },
            editTodo: function(todo) {
                this.beforeEditCache = todo.title;
                this.editedTodo = todo;
            },
            doneEdit: function(todo) {
                if(!this.editedTodo) {
                    return;
                }
                this.editedTodo = null;
                todo.title = todo.title.trim();
                if(!todo.title) {
                    this.removeTodo(todo);
                }
            },
            cancelEdit: function(todo) {
                this.editedTodo = null;
                todo.title = beforeEditCache;
            },
            removeCompleted: function() {
                this.todos = filters['active'](this.todos);
            }
        },
        directives: {
            'todo-focus': function(value) {
                console.log('directives');
                if (!value) {
					return;
				}
				var el = this.el;
				Vue.nextTick(function () {
					el.focus();
				});
            }
        }
    })
})(window)
