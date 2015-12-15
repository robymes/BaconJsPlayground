this.rm = (function (rm) {
    rm.TodoListView = function (newTodoItem, typedItemIndex) {
        var self = this,
            apiService = new rm.ApiService(),
            $itemsTableBody = jQuery("#todoListView table"),
            todoListTableBuilder = new rm.TodoListTableBuilder(
                Enumerable.from($itemsTableBody.get())
                .single()
            ),
            removeItemIndex =
                $itemsTableBody.asEventStream("click", "button.btn.btn-default.btn-xs")
                .map(function (e) {
                    return jQuery(e.currentTarget).val();
                }),
            todoList = new rm.TodoList(apiService, newTodoItem, removeItemIndex, typedItemIndex);

        todoList.todoItems
        .onValue(function (items) {
            todoListTableBuilder.update(items);
        });

        self.todoItems = todoList.todoItems;

        self.selectedTodoItem = todoList.selectedTodoItem;
    };
    return rm;
}(this.rm || {}));
