this.rm = (function (rm) {
    rm.ApiService = function () {
        var self = this;

        self.loadTodoItems = function () {
            var items =
                Enumerable.cycle({
                    title: "Star Wars VII",
                    description: "Hype a mille",
                    dueDate: moment()
                })
                .take(1)
                .union(
                    Enumerable.cycle({
                        title: "Todo ",
                        description: "This is the Todo #",
                        dueDate: moment()
                    })
                    .take(10)
                    .select(function (item, i) {
                        return {
                            title: item.title + i,
                            description: item.description + i,
                            dueDate: item.dueDate
                        };
                    })
                )
                .toArray();
            return jQuery.ajax(items);
        };
    };
    return rm;
}(this.rm || {}));
