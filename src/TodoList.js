this.rm = (function (rm) {
    rm.TodoList = function (apiService, newTodoItem, removeItemIndex, selectedItemIndex) {
        var self = this;

        self.todoItems =
            Bacon.update(
                [],
                [newTodoItem], function (todoItems, newItem) {
                    todoItems.push(newItem);
                    return todoItems;
                },
                [removeItemIndex], function (todoItems, removedItemIndex) {
                    todoItems.splice(removedItemIndex, 1);
                    return todoItems;
                },
                [Bacon.fromPromise(apiService.loadTodoItems())], function (todoItems, loadedItems) {
                    return loadedItems;
                }
            );

        self.selectedTodoItem =
            self.todoItems
            .sampledBy(selectedItemIndex, function (todoItems, typedItemIndex) {
                if ((typedItemIndex > 0) &&
                    (typedItemIndex <= todoItems.length)) {
                    return {
                        todoItem: todoItems[typedItemIndex - 1],
                        index: typedItemIndex
                    };
                }
                return null;
            });
    };
    return rm;
}(this.rm || {}));
