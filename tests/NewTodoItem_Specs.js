describe("Data la funzionalità di inserimento nuovo item", function () {
    var title,
        description,
        dueDate,
        addNewTodoItem,
        newTodoItem;

    beforeEach(function () {
        title = Bacon.Model("");
        description = Bacon.Model("");
        dueDate = new Bacon.Bus();
        addNewTodoItem = new Bacon.Bus();
        newTodoItem = new rm.NewTodoItem(title, description, dueDate, addNewTodoItem);
    });

    it("quando appena attiva, non permette di inserire un nuovo item", function () {
        var canInsertTodoItemHandler = jasmine.createSpy("canInsertTodoItemHandler"),
            newTodoItemHandler = jasmine.createSpy("newTodoItemHandler");

        newTodoItem.canInsertTodoItem
        .onValue(canInsertTodoItemHandler);

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        expect(canInsertTodoItemHandler).not.toHaveBeenCalled();
        expect(newTodoItemHandler).not.toHaveBeenCalled();
    });

    it("quando è inserito solo il titolo, non permette di inserire un nuovo item", function () {
        var canInsertTodoItemHandler = jasmine.createSpy("canInsertTodoItemHandler"),
            newTodoItemHandler = jasmine.createSpy("newTodoItemHandler");

        newTodoItem.canInsertTodoItem
        .onValue(canInsertTodoItemHandler);

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        title.set("An Item");

        expect(canInsertTodoItemHandler).not.toHaveBeenCalled();
        expect(newTodoItemHandler).not.toHaveBeenCalled();
    });

    it("quando è inserita solo la descrizione, non permette di inserire un nuovo item", function () {
        var canInsertTodoItemHandler = jasmine.createSpy("canInsertTodoItemHandler"),
            newTodoItemHandler = jasmine.createSpy("newTodoItemHandler");

        newTodoItem.canInsertTodoItem
        .onValue(canInsertTodoItemHandler);

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        description.set("A description");

        expect(canInsertTodoItemHandler).not.toHaveBeenCalled();
        expect(newTodoItemHandler).not.toHaveBeenCalled();
    });

    it("quando è inserita solo la data, non permette di inserire un nuovo item", function () {
        var canInsertTodoItemHandler = jasmine.createSpy("canInsertTodoItemHandler"),
            newTodoItemHandler = jasmine.createSpy("newTodoItemHandler");

        newTodoItem.canInsertTodoItem
        .onValue(canInsertTodoItemHandler);

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        dueDate.push(new Date());

        expect(canInsertTodoItemHandler).toHaveBeenCalled();
        expect(canInsertTodoItemHandler.calls.count()).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0).length).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0)[0]).toEqual(false);
        expect(newTodoItemHandler).not.toHaveBeenCalled();
    });

    it("quando sono inseriti solo titolo e descrizione, non permette di inserire un nuovo item", function () {
        var canInsertTodoItemHandler = jasmine.createSpy("canInsertTodoItemHandler"),
            newTodoItemHandler = jasmine.createSpy("newTodoItemHandler");

        newTodoItem.canInsertTodoItem
        .onValue(canInsertTodoItemHandler);

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        title.set("An Item");

        description.set("A description");

        expect(canInsertTodoItemHandler).not.toHaveBeenCalled();
        expect(newTodoItemHandler).not.toHaveBeenCalled();
    });

    it("quando sono inseriti solo titolo e data, non permette di inserire un nuovo item", function () {
        var canInsertTodoItemHandler = jasmine.createSpy("canInsertTodoItemHandler"),
            newTodoItemHandler = jasmine.createSpy("newTodoItemHandler");

        newTodoItem.canInsertTodoItem
        .onValue(canInsertTodoItemHandler);

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        title.set("An Item");

        dueDate.push(new Date());

        expect(canInsertTodoItemHandler).toHaveBeenCalled();
        expect(canInsertTodoItemHandler.calls.count()).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0).length).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0)[0]).toEqual(false);
        expect(newTodoItemHandler).not.toHaveBeenCalled();
    });

    it("quando sono inseriti solo descrizione e data, non permette di inserire un nuovo item", function () {
        var canInsertTodoItemHandler = jasmine.createSpy("canInsertTodoItemHandler"),
            newTodoItemHandler = jasmine.createSpy("newTodoItemHandler");

        newTodoItem.canInsertTodoItem
        .onValue(canInsertTodoItemHandler);

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        description.set("A description");

        dueDate.push(new Date());

        expect(canInsertTodoItemHandler).toHaveBeenCalled();
        expect(canInsertTodoItemHandler.calls.count()).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0).length).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0)[0]).toEqual(false);
        expect(newTodoItemHandler).not.toHaveBeenCalled();
    });

    it("quando viene inserita una data posteriore ad oggi, la data è corretta", function () {
        var incorrectDueDateHandler = jasmine.createSpy("incorrectDueDateHandler");

        newTodoItem.incorrectDueDate
        .onValue(incorrectDueDateHandler);

        dueDate.push(moment().add(1, "d").toDate());

        expect(incorrectDueDateHandler).toHaveBeenCalled();
        expect(incorrectDueDateHandler.calls.count()).toEqual(1);
        expect(incorrectDueDateHandler.calls.argsFor(0).length).toEqual(1);
        expect(incorrectDueDateHandler.calls.argsFor(0)[0]).toEqual(false);
    });

    it("quando viene inserita una data anteriore ad oggi, la data non è corretta", function () {
        var incorrectDueDateHandler = jasmine.createSpy("incorrectDueDateHandler");

        newTodoItem.incorrectDueDate
        .onValue(incorrectDueDateHandler);

        dueDate.push(moment().subtract(1, "d").toDate());

        expect(incorrectDueDateHandler).toHaveBeenCalled();
        expect(incorrectDueDateHandler.calls.count()).toEqual(1);
        expect(incorrectDueDateHandler.calls.argsFor(0).length).toEqual(1);
        expect(incorrectDueDateHandler.calls.argsFor(0)[0]).toEqual(true);
    });

    it("quando viene inserita la data di oggi, la data non è corretta", function () {
        var incorrectDueDateHandler = jasmine.createSpy("incorrectDueDateHandler");

        newTodoItem.incorrectDueDate
        .onValue(incorrectDueDateHandler);

        dueDate.push(new Date());

        expect(incorrectDueDateHandler).toHaveBeenCalled();
        expect(incorrectDueDateHandler.calls.count()).toEqual(1);
        expect(incorrectDueDateHandler.calls.argsFor(0).length).toEqual(1);
        expect(incorrectDueDateHandler.calls.argsFor(0)[0]).toEqual(true);
    });

    it("quando la data è vuota, la data è considerata corretta", function () {
        var incorrectDueDateHandler = jasmine.createSpy("incorrectDueDateHandler");

        newTodoItem.incorrectDueDate
        .onValue(incorrectDueDateHandler);

        dueDate.push(null);

        expect(incorrectDueDateHandler).toHaveBeenCalled();
        expect(incorrectDueDateHandler.calls.count()).toEqual(1);
        expect(incorrectDueDateHandler.calls.argsFor(0).length).toEqual(1);
        expect(incorrectDueDateHandler.calls.argsFor(0)[0]).toEqual(false);
    });

    it("quando sono inseriti titolo, descrizione e data corretta, permette di inserire un nuovo item", function () {
        var canInsertTodoItemHandler = jasmine.createSpy("canInsertTodoItemHandler"),
            newTodoItemHandler = jasmine.createSpy("newTodoItemHandler");

        newTodoItem.canInsertTodoItem
        .onValue(canInsertTodoItemHandler);

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        title.set("An Item");

        description.set("A description");

        dueDate.push(moment().add(1, "d").toDate());

        expect(canInsertTodoItemHandler).toHaveBeenCalled();
        expect(canInsertTodoItemHandler.calls.count()).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0).length).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0)[0]).toEqual(true);
        expect(newTodoItemHandler).not.toHaveBeenCalled();
    });

    it("quando sono inseriti titolo, descrizione e data non corretta, non permette di inserire un nuovo item", function () {
        var canInsertTodoItemHandler = jasmine.createSpy("canInsertTodoItemHandler"),
            newTodoItemHandler = jasmine.createSpy("newTodoItemHandler");

        newTodoItem.canInsertTodoItem
        .onValue(canInsertTodoItemHandler);

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        title.set("An Item");

        description.set("A description");

        dueDate.push(moment().subtract(1, "d").toDate());

        expect(canInsertTodoItemHandler).toHaveBeenCalled();
        expect(canInsertTodoItemHandler.calls.count()).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0).length).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0)[0]).toEqual(false);
        expect(newTodoItemHandler).not.toHaveBeenCalled();
    });

    it("quando viene annullata la data, non permette di inserire un nuovo item", function () {
        var canInsertTodoItemHandler = jasmine.createSpy("canInsertTodoItemHandler"),
            newTodoItemHandler = jasmine.createSpy("newTodoItemHandler");

        newTodoItem.canInsertTodoItem
        .onValue(canInsertTodoItemHandler);

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        title.set("An Item");

        description.set("A description");

        dueDate.push(moment().add(1, "d").toDate());

        dueDate.push(null);

        expect(canInsertTodoItemHandler).toHaveBeenCalled();
        expect(canInsertTodoItemHandler.calls.count()).toEqual(2);
        expect(canInsertTodoItemHandler.calls.argsFor(0).length).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(0)[0]).toEqual(true);
        expect(canInsertTodoItemHandler.calls.argsFor(1).length).toEqual(1);
        expect(canInsertTodoItemHandler.calls.argsFor(1)[0]).toEqual(false);
        expect(newTodoItemHandler).not.toHaveBeenCalled();
    });

    it("quando viene dato il comando di inserimento di un nuovo item, il nuovo item viene composto ed è disponibile", function () {
        var newTodoItemHandler = jasmine.createSpy("newTodoItemHandler"),
            item = {
                title: "An Item",
                description: "A description",
                dueDate: moment().add(1, "d").toDate()
            };

        newTodoItem.newTodoItem
        .onValue(newTodoItemHandler);

        title.set(item.title);

        description.set(item.description);

        dueDate.push(item.dueDate);

        addNewTodoItem.push(null);

        expect(newTodoItemHandler).toHaveBeenCalled();
        expect(newTodoItemHandler.calls.count()).toEqual(1);
        expect(newTodoItemHandler.calls.argsFor(0).length).toEqual(1);
        expect(newTodoItemHandler.calls.argsFor(0)[0]).toEqual(jasmine.any(Object));
        expect(newTodoItemHandler.calls.argsFor(0)[0].title).toBeDefined();
        expect(newTodoItemHandler.calls.argsFor(0)[0].title).toEqual(item.title);
    });
});