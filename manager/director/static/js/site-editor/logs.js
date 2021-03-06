function SiteLogsFollower(container, uri) {
    var self = this;

    container.css({
        "overflow-x": "hidden",
        "overflow-y": "auto",
        "background-color": "white",
    });

    var logDiv = $("<div>").css({
        "width": "calc(100% - 10px)",
        "margin": "5px",
        "font-size": "90%",
        "font-family": "Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
        "white-space": "pre-wrap",
    }).appendTo(container);

    var ws = new ReconnectingWebSocket(
        uri,
        null,
        {
            debug: DEBUG,
            automaticOpen: true,
            reconnectInterval: 1000,
            maxReconnectInterval: 10000,
            reconnectDecay: 1.5,
            maxReconnectAttempts: null,
            timeoutInterval: 2000,
        },
    );

    // Send heartbeats to keep the connection alive
    setInterval(function() {
        ws.send(JSON.stringify({heartbeat: 1}));
    }, 30000);

    // Clear the output when the websocket connects.
    // The server will send some of the previous output, so we can
    // just display that.
    ws.addEventListener("open", function(e) {
        logDiv.text("");
    });

    ws.addEventListener("message", function(e) {
        var data = JSON.parse(e.data);

        if(data.heartbeat != null) {
            return;
        }

        var isScrolledToBottom = container.prop("scrollHeight") - container.prop("clientHeight") <= container.prop("scrollTop") + 1;

        logDiv.append(document.createTextNode(data.line));
        if(isScrolledToBottom) {
            container.prop("scrollTop", container.prop("scrollHeight"));
        }
    });

    this.updateSettings = function(settings) {
    };
}
