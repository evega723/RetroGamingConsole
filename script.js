const Load = document.getElementById("Load").addEventListener("click", () => {
    const status = document.getElementById("status");
    const output = document.querySelector("#cards");
    status.textContent = "Loading...";
    const consoleArray = []

    let consoles = new XMLHttpRequest();
    consoles.open("GET", "https://ozarktechwebdev.com/api/consoles.json");
    consoles.onreadystatechange = () => {

        if (consoles.readyState == 1) {
            status.textContent = "Status: " + consoles.status;
        }

        if (consoles.readyState == 2) {
            status.textContent = "Status: " + consoles.status;
        }

        if (consoles.readyState == 3) {
            status.textContent = "Status: " + consoles.status;
        }

        if (consoles.readyState == 4) {
            status.textContent = "Status: " + consoles.status;
            output.textContent = consoles.status == 200 ? consoles.responseText : "Request failed.";
            consoleArray = JSON.parse(consoles.responseText);

            console.log(consoleArray);
            consoleArray.forEach((consoleItem) => {
                console.log(consoleItem);
            });

        };
    };
    consoles.send();


});



