this.rm = (function (rm) {
    rm.ApiService = function () {
        var self = this;

        self.loadTodoItems = function () {
            return jQuery.ajax([{
                title: "Star Wars VII",
                description: "Hype a mille",
                dueDate: moment()
            }]);
        };
    };
    return rm;
}(this.rm || {}));
