this.rm = (function (rm) {
    rm.namespace = function (ns_string) {
        var parts = ns_string.split("."),
            parent = rm,
            i;
        if (parts[0] === "rm") {
            parts = parts.slice(1);
        }
        for (i = 0; i < parts.length; i += 1) {
            if (parent[parts[i]] === "undefined") {
                parent[parts[i]] = {};
            }
            parent = parent[parts[i]];
        }
        return parent;
    };
    jQuery.ajax = function (response) {
        var deferred = jQuery.Deferred().resolve(response);
        return deferred.promise();
    };
    rm.createBus = function (stream) {
        var bus = new Bacon.Bus();
        bus.plug(stream);
        return bus;
    };
    return rm;
}(this.rm || {}));