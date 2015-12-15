describe("Data la lista degli item", function () {
    var apiService,
        newTodoItem,
        removeItemIndex,
        selectedItemIndex,
        todoList;

    beforeEach(function () {
        apiService = {
            loadTodoItems: function () {
                var deferred = jQuery.Deferred().resolve([{
                    title: "test",
                    description: "test",
                    dueDate: moment()
                }]);
                return deferred.promise();
            }
        };
        newTodoItem = new Bacon.Bus();
        removeItemIndex = new Bacon.Bus();
        selectedItemIndex = new Bacon.Bus();
        todoList = new rm.TodoList(apiService, newTodoItem, removeItemIndex, selectedItemIndex);
    });

    it("quando inizializzata, non contiene elementi", function () {
        var itemsHandler = jasmine.createSpy("itemsHandler");

        todoList.todoItems
        .onValue(itemsHandler);

        expect(itemsHandler).toHaveBeenCalled();
        expect(itemsHandler.calls.count()).toEqual(2);
        expect(itemsHandler.calls.argsFor(0).length).toEqual(1);
        expect(itemsHandler.calls.argsFor(0)[0]).toEqual(jasmine.any(Array));
        expect(itemsHandler.calls.argsFor(0)[0].length).toEqual(0);
    });

    it("quando viene aggiunto un nuovo elemento alla lista vuota, la lista viene aggiornata con il nuovo elemento in fondo", function () {
        var itemsHandler = jasmine.createSpy("itemsHandler"),
            item = {
                title: "Title 01",
                description: "Description 01",
                dueDate: moment().toDate()
            },
            newItems;

        todoList.todoItems
        .onValue(itemsHandler);

        newTodoItem.push(item);

        expect(itemsHandler).toHaveBeenCalled();
        expect(itemsHandler.calls.count()).toEqual(3);
        expect(itemsHandler.calls.argsFor(1).length).toEqual(1);
        newItems = itemsHandler.calls.argsFor(1)[0];
        expect(newItems).toEqual(jasmine.any(Array));
        expect(newItems.length).toEqual(2);
        expect(newItems[1].title).toEqual(item.title);
    });

    it("quando viene aggiunto un nuovo elemento alla lista non vuota, la lista viene aggiornata con il nuovo elemento in fondo", function () {
        var itemsHandler = jasmine.createSpy("itemsHandler"),
            items = [{
                title: "Title 01",
                description: "Description 01",
                dueDate: moment().toDate()
            }, {
                title: "Title 02",
                description: "Description 02",
                dueDate: moment().toDate()
            }];

        todoList.todoItems
        .onValue(itemsHandler);

        newTodoItem.push(items[0]);

        newTodoItem.push(items[1]);

        expect(itemsHandler).toHaveBeenCalled();
        expect(itemsHandler.calls.count()).toEqual(4);
        expect(itemsHandler.calls.argsFor(2).length).toEqual(1);
        expect(itemsHandler.calls.argsFor(2)[0]).toEqual(jasmine.any(Array));
        expect(itemsHandler.calls.argsFor(2)[0].length).toEqual(3);
    });
});