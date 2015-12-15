this.rm = (function (rm) {
    rm.TodoListTableBuilder = function (itemsTableBodyElement) {
        var self = this,
            projector = null,
            itemsToBeRendered = [],
            buildItemsTree = function () {
                var hItems = Enumerable.from(itemsToBeRendered)
                    .select(function (item, index) {
                        return maquette.h("tr", { key: "tr_" + index }, [
                            maquette.h("td", { key: "td_title" }, [ (index + 1).toFixed(0) ]),
                            maquette.h("td", { key: "td_title" }, [ item.title ]),
                            maquette.h("td", { key: "td_desc" }, [ item.description ]),
                            maquette.h("td", { key: "td_dueDate" }, [ moment(item.dueDate).format("DD/MM/YYYY")]),
                            maquette.h("td", { key: "td_remove" }, [
                                maquette.h("button.btn.btn-default.btn-xs", {
                                    type: "button",
                                    value: String(index)
                                }, [ "Remove" ])
                            ])
                        ]);
                    })
                    .toArray();
                return maquette.h("tbody", null, hItems);
            };
        projector = maquette.createProjector();
        projector.append(itemsTableBodyElement, buildItemsTree, {});
        self.update = function (items) {
            itemsToBeRendered = items;
            projector.scheduleRender();
        };
    };
    return rm;
}(this.rm || {}));