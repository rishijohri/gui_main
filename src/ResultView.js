import React from "react";
import {Paper} from "@material-ui/core";

import {io} from "socket.io-client";

function ResultView() {
    const socket = io("http://localhost:5000/results");
    socket.on("connect", () => {
        socket.emit("images", {data: "images/jpeg, base64, abcdefghijklmnopqrstuvwxyz"});
        socket.on("processed_images", (data) => {
            console.log(data);
            // do something with processed images
            socket.disconnect();
        });
    });

    return (
        <React.Fragment>
            <Paper variant="outlined">
                result
            </Paper>
        </React.Fragment>
    );
}

export default ResultView;
