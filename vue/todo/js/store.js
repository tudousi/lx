(function(exports) {
    var STORAGE_KEY = 'todo-vue';
    exports.todoStorage = {
        fetch: function() {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        },
        save: function(todos) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        }
    }
})(window);
