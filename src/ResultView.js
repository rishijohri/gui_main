import React from "react";
import {Paper} from "@material-ui/core";

import {io} from "socket.io-client";

function ResultView() {
    const socket = io("http://localhost:5000/results");
    socket.on("connect", () => {
        const imagesData = {data: "images/jpeg, base64, gibberish gibberish gibberish"};
        socket.emit("images", imagesData);
        socket.on("processed_images", (responseData) => {
            console.log(responseData);
            // do something with processed images
            // disconnect if not needed again
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
