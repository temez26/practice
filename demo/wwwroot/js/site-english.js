let map = [];
map[0] = "Old castle tower";
map[1] = "Deep well";
map[2] = "Sunny forest clearing";
map[3] = "Sleeping dragon";
map[4] = "Narrow forest path";
map[5] = "Old gate";
map[6] = "Riverbank";
map[7] = "Empty wooden bench";
map[8] = "Old cottage, faint music can be heard from inside";

// Player's initial location
let mapLocation = 4;

let images = []
images[0] = "torni.jpg"
images[1] = "kaivo.jpg"
images[2] = "aukio.jpg"
images[3] = "dragon.jpg"
images[4] = "polku.jpg"
images[5] = "portti.jpg"
images[6] = "joki.jpg"
images[7] = "penkki.jpg"
images[8] = "mokki.jpg"
images[9] = "järvi.jpg"

let blockMessage = [];
blockMessage[0] = "The desired route is too dangerous.";
blockMessage[1] = "A mysterious force prevents you from going that way.";
blockMessage[2] = "A dense thicket blocks your path.";
blockMessage[3] = "You can't pass the dragon this way.";
blockMessage[4] = "";
blockMessage[5] = "The gate has closed.";
blockMessage[6] = "The river is too deep to cross.";
blockMessage[7] = "The forest is too dense to pass through.";
blockMessage[8] = "You're too scared to go in that direction.";

// Player's input
let playersInput = "";
// Game message
let gameMessage = "";
// Player's available actions
let actionsForPlayer = ["north", "east", "south", "west", "pick up", "use", "drop", "call"];
let action = "";
let items = ["stone", "whip", "dog", "flute", "sword"];
let itemLocations = [2, 6, 5];
let backPack = [];
let knownItems = ["flute", "stone", "sword", "whip", "dog"];
let item = "";

// UI elements
let output = document.querySelector("#output");
let input = document.querySelector("#input");
let image = document.querySelector("img");

// Button
let button = document.getElementById("nappi");
button.style.cursor = "pointer";
button.addEventListener("click", clickHandler, false);

// Update player's location
render();

function clickHandler() {
    console.log("Button clicked");
}

// Check if the button element exists
if (button) {
    // Add a click event listener to the button
    button.style.cursor = "pointer";
    button.addEventListener("click", function () {
        console.log("Nappia painettu");
        playGame(); // Call playGame() when the button is clicked
    });

    // Add a keypress event listener to the document
    document.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            playGame();
        }
    });
} else {
    console.error("Button with id 'nappi' not found");
}

function playGame() {
    // Read player's input and convert it to lowercase
    playersInput = input.value.toLowerCase();
    // Reset variables from the previous round
    gameMessage = "";
    action = "";

    // Check player's input and take necessary actions
    for (let i = 0; i < actionsForPlayer.length; i++) {
        if (playersInput.indexOf(actionsForPlayer[i]) !== -1) {
            action = actionsForPlayer[i];
            console.log("Player chose action: " + action);
            break;
        }
    }

    for (let i = 0; i < knownItems.length; i++) {
        if (playersInput.indexOf(knownItems[i]) !== -1) {
            item = knownItems[i];
            console.log("Player chose item: " + item);
            break;
        }
    }

    // Switch case for actions
    switch (action) {
        case "north":
            if (mapLocation >= 3)
                mapLocation -= 3;
            else
                gameMessage = blockMessage[mapLocation];
            break;

        case "east":
            if (mapLocation % 3 != 2)
                mapLocation += 1;
            else
                gameMessage = blockMessage[mapLocation];
            break;

        case "south":
            if (mapLocation < 6)
                mapLocation += 3;
            else
                gameMessage = blockMessage[mapLocation];
            break;

        case "west":
            if (mapLocation % 3 != 0)
                mapLocation -= 1;
            else
                gameMessage = blockMessage[mapLocation];
            break;

        case "call":
            takeItem();
            break;

        case "pick up":
            takeItem();
            break;

        case "use":
            useItem();
            break;

        case "drop":
            dropItem();
            break;

        default:
            gameMessage = "Unknown action.";
    }

    render();
}

function takeItem() {
    let itemIndexNumber = items.indexOf(item);
    if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === 5) {
        gameMessage = item + " ran away.";
        items.splice(itemIndexNumber, 1);
        itemLocations.splice(itemIndexNumber, 1);
    }
    else if (itemIndexNumber !== -1 && itemLocations[itemIndexNumber] === mapLocation) {
        gameMessage = "You pick up the item: " + item;
        backPack.push(item);
        items.splice(itemIndexNumber, 1);
        itemLocations.splice(itemIndexNumber, 1);
        console.log("On the map: " + items);
        console.log("In your backpack: " + backPack);
    } else {
        gameMessage = "You can't do that.";
    }
}

function useItem() {
    let backPackIndexNumber = backPack.indexOf(item);

    if (backPackIndexNumber === -1) {
        gameMessage += "You don't have that with you.";
    }
    if (backPack.length === 0) {
        gameMessage += "You don't have anything with you.";
    }

    if (backPackIndexNumber !== -1) {

        switch (item) {
            case "flute":
                if (mapLocation === 8)
                    gameMessage = "Beautiful music fills the air as you play the " + item + ". It then disappears into thin air, and a bright light flashes, revealing a new item in front of you.";
                knownItems.push(backPack[item]);
                items.push(backPack[backPackIndexNumber]);
                itemLocations.push(mapLocation);
                backPack.splice(backPackIndexNumber, 1);
                break;

            case "sword":
                if (mapLocation === 3) {
                    gameMessage = "You swing your sword and defeat the dragon.";
                    window.alert("You completed the game!");
                } else {
                    gameMessage = "You swing your sword idly.";
                }
                break;

            case "whip":
                gameMessage = "You swing the lasso excitedly.";
                break;

            case "stone":
                if (mapLocation === 1) {
                    gameMessage = "You throw the " + item + " into the well.";
                    knownItems.push(backPack[item]);
                    items.push(backPack[backPackIndexNumber]);
                    itemLocations.push(mapLocation);
                    backPack.splice(backPackIndexNumber, 1);
                } else {
                    gameMessage = "You fiddle with the stone in your pocket.";
                }
                break;
        }
    }
}

function dropItem() {
    if (backPack.length !== 0) {
        let backPackIndexNumber = backPack.indexOf(item);
        if (backPackIndexNumber !== -1) {
            gameMessage = "You drop the item: " + item + ".";
            itemLocations.push(mapLocation);
            backPack.splice(backPackIndexNumber, 1);
        } else {
            gameMessage = "You can't do that.";
        }
    } else {
        gameMessage = "You don't have anything with you.";
    }
}

function render() {
    output.innerHTML = "Your location: " + map[mapLocation];

    if (backPack.length != 0) {
        output.innerHTML += "<br>You have: " + backPack.join(", ");
    }
    if (mapLocation === 5) {
        for (let i = 0; i < items.length; i++) {
            if (mapLocation === itemLocations[i])
                output.innerHTML += "<br>You see an animal: <strong>" + items[i] + "</strong>";
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            if (mapLocation === itemLocations[i])
                output.innerHTML += "<br>You see an item: <strong>" + items[i] + "</strong>";
        }
    }
    image.src = "images/" + images[mapLocation];
    output.innerHTML += "<br><em>" + gameMessage + "</em>";
}
