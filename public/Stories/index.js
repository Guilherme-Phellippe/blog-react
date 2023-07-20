// JS
let player;

function initializePlayer() {
    player = window.document.querySelector("amp-story-player");
    if (player.isReady) {
        player.addEventListener("amp-story-player-close", () => {
            window.location.href = "https://temsabor.blog/"
        });

        addNewStories();
        return;
    }

    player.addEventListener("ready", () => {
        player.addEventListener("amp-story-player-close", () => {
            window.location.href = "https://temsabor.blog/"
        });
    });
}


async function addNewStories (){
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug")
    const stories = await fetchNewStories();
}


function fetchNewStories(){
    return new Promise((resolve)=>{
        fetch("https://api.temsabor.blog/stories/",{
            method: "GET"
        }).then(res => res.json)
        .then(stories => {
            console.log(stories)
            resolve(stories)
        })
        .catch(err => console.log(err))
    }) 
}

addNewStories();
initializePlayer();