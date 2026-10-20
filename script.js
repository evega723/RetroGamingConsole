const Load = document.getElementById("Load").addEventListener("click", () => {
    const status = document.getElementById("status");
    const output = document.querySelector("#cards");
    status.textContent = "Loading...";
    status.style.color = "";
    output.style.color = "";


    // API setup
    let consoles = new XMLHttpRequest();
    consoles.open("GET", "https://ozarktechwebdev.com/api/consoles.json");
    consoles.onreadystatechange = () => {
        status.textContent = "Status: Loading"


        if (consoles.readyState == 4) {
            status.textContent = "Status: " + `${consoles.status}: Complete!`;
            if (consoles.status !== 200) {
                output.textContent = "Request failed.";
                status.textContent = `Status: ${consoles.status}: Error`;
                status.style.color = "red";
                output.style.color = "red";
                return;
            }

            //declare variables
            const data = JSON.parse(consoles.responseText);
            const consoleArray = data.consoles;
            const summary = document.getElementById("summary");


            //summary line
            summary.textContent = `${consoleArray.length} consoles.`;


            if (consoleArray.length > 0) {
                let oldest = consoleArray[0];
                let newest = consoleArray[0];

                for (let i = 1; i < consoleArray.length; i++) {
                    const current = consoleArray[i];

                    if (current.year < oldest.year) oldest = current;
                    if (current.year > newest.year) newest = current;
                }

                summary.textContent += ` Oldest: ${oldest.name} (${oldest.year}).`;
                summary.textContent += ` Newest: ${newest.name} (${newest.year}).`;
            }

            //populate array + fill cards
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



