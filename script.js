const Load = document.getElementById("Load").addEventListener("click", () => {
    const status = document.getElementById("status");
    const output = document.querySelector("#cards");
    status.textContent = "Loading...";

    let consoles = new XMLHttpRequest();
    consoles.open("GET", "https://ozarktechwebdev.com/api/consoles.json");
    consoles.onreadystatechange = () => {


        if (consoles.readyState == 4) {
            status.textContent = "Status: " + `${consoles.status}: Complete!`;
            if (consoles.status !== 200) {
                output.textContent = "Request failed.";
                status.textContent = "Status: " + `${consoles.status}: Error`;
                return;
            }

            //parse json to object and 
            const data = JSON.parse(consoles.responseText);
            output.replaceChildren();
            data.consoles.forEach((consoleItem) => {
                const card = document.createElement("article");
                card.classList.add("card-body")

                const image = document.createElement("img");
                image.src = consoleItem.image;
                image.alt = consoleItem.name;
                image.height = 200;
                image.width = 300;

                const name = document.createElement("h2");
                name.textContent = consoleItem.name;

                const details = document.createElement("p");
                details.textContent = `${consoleItem.manufacturer} - ${consoleItem.year}`;

                card.append(image, name, details);
                output.append(card);
            });

        };
    };
    consoles.send();


});



