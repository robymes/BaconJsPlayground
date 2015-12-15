this.rm = (function (rm) {
    rm.NewTodoItemView = function () {
        var self = this,
            $titleInput = jQuery("#newTodoItemView input:text:first"),
            $descriptionInput = jQuery("#newTodoItemView textarea"),
            $dueDateInput = jQuery("#newTodoItemView div.input-group.date"),
            $dueDateValidation = $dueDateInput.next(),
            $inputs = jQuery("#newTodoItemView input:text, textarea"),
            $addNewTodoItemButton = jQuery("#newTodoItemView button"),
            title = Bacon.$.textFieldValue($titleInput, ""),
            description = Bacon.$.textFieldValue($descriptionInput, ""),
            dueDate = new Bacon.Bus(),
            addNewTodoItem = $addNewTodoItemButton.asEventStream("click"),
            newTodoItem;

        $dueDateInput.datepicker({
            language: "it",
            format: "dd/mm/yyyy",
            startDate: moment().add(1, "d").toDate(),
            clearBtn: true,
            todayBtn: "linked",
            autoclose: true,
            todayHighlight: true
        }).on("changeDate", function (e) {
            dueDate.push(e.date);
        }).on("clearDate", function (e) {
            dueDate.push(null);
        });

        newTodoItem = new rm.NewTodoItem(title, description, dueDate, addNewTodoItem);

        newTodoItem.canInsertTodoItem
        .not()
        .onValue($addNewTodoItemButton, "attr", "disabled");

        newTodoItem.incorrectDueDate
        .not()
        .onValue(function (dueDate) {
            $dueDateValidation.toggleClass("show", !dueDate).toggleClass("hidden", dueDate);
        });

        newTodoItem.newTodoItem
        .onValue(function (newItem) {
            title.set("");
            description.set("");
            $dueDateInput.datepicker("setDate", null);
        });

        self.newTodoItem = newTodoItem.newTodoItem;

        self.newTodoItemInModification =
            $inputs.asEventStream("focus")
            .map(function (e) {
                return true;
            })
            .merge(
                $inputs.asEventStream("blur")
                    .map(function (e) {
                        return false;
                    })
            )
            .toProperty();
    };
    return rm;
}(this.rm || {}));