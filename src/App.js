this.rm = (function (rm) {
    jQuery(document).ready(function () {
        var newTodoItemView,
            todoListView,
            documentKeyUp = jQuery(document.body).asEventStream("keyup"),
            $itemListPanel = jQuery("div.row:eq(0)"),
            $itemDetailPanel = jQuery("div.row:eq(1)"),
            typedItemIndex,
            itemDetailHiding;

        newTodoItemView = new rm.NewTodoItemView();

        typedItemIndex =
            //al keyup
            documentKeyUp
            //nel caso in cui non si stia aggiungendo un nuovo item
            .filter(
                newTodoItemView.newTodoItemInModification
                .not()
            )
            //nel caso in cui il pannello di dettaglio di non sia attivo e
            //i tasti digitati siano numerici
            .filter(function (e) {
                return ($itemDetailPanel.hasClass("hidden")) &&
                    (e.keyCode >= 48) && (e.keyCode <= 57);
            })
            //attendi la digitazione di 2 tasti o il trascorrere di 250 msec
            .bufferWithTimeOrCount(250, 2)
            //individua il valore dell'indice digitato
            .map(function (e) {
                var i, itemIndex = "";
                for (i = 0; i < e.length; i += 1) {
                    itemIndex += (e[i].keyCode - 48).toFixed(0);
                }
                return parseInt(itemIndex, 10);
            });

        itemDetailHiding =
            documentKeyUp
            //se il dettaglio item è aperto e il tasto digitato è esc
            .filter(function (e) {
                return ($itemDetailPanel.hasClass("show")) && (e.keyCode === 27);
            });

        todoListView = new rm.TodoListView(newTodoItemView.newTodoItem, typedItemIndex);

        todoListView.selectedTodoItem
        .onValue(function (item) {
            if (item) {
                jQuery("div.row:eq(1) span").text(item.index);
                jQuery("div.row:eq(1) strong").text(item.todoItem.title);
                $itemListPanel.toggleClass("show hidden");
                $itemDetailPanel.toggleClass("show hidden");
            }
        });

        itemDetailHiding
        .onValue(function (e) {
            $itemDetailPanel.toggleClass("show hidden");
            $itemListPanel.toggleClass("show hidden");
        });
    });
    return rm;
}(this.rm || {}));