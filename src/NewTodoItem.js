this.rm = (function (rm) {
    rm.NewTodoItem = function (title, description, dueDate, addNewTodoItem) {
        var self = this,
            nonEmpty,
            titleNotEmpty,
            descriptionNonEmpty,
            dueDateNotEmpty,
            validDueDate;

        nonEmpty = function (e) {
            if (!e) {
                return false;
            }
            if (e.length) {
                return e.length > 0;
            }
            return true;
        };

        titleNotEmpty =
            title
            .map(nonEmpty);

        descriptionNonEmpty =
            description
            .map(nonEmpty);

        dueDateNotEmpty =
            dueDate
            .map(nonEmpty);

        self.incorrectDueDate =
            dueDate
            .map(function (dueDate) {
                var momentDueDate;
                if (!dueDate) {
                    return false;
                }
                momentDueDate = moment(dueDate);
                return !(momentDueDate.isValid() && (momentDueDate > moment()));
            })
            .toProperty();

        validDueDate =
            self.incorrectDueDate
            .not()
            .and(dueDateNotEmpty);

        self.canInsertTodoItem =
            titleNotEmpty
            .and(descriptionNonEmpty)
            .and(validDueDate);

        self.newTodoItem =
            Bacon.combineTemplate({
                title: title,
                description: description,
                dueDate: dueDate
            })
            .sampledBy(addNewTodoItem);
    };
    return rm;
}(this.rm || {}));