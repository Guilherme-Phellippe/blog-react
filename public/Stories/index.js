// JS
let player;

function initializePlayer() {
    player = window.document.querySelector("amp-story-player");
    if (player.isReady) {
        player.addEventListener("amp-story-player-close", () => {
            window.location.href = "https://temsabor.blog/"
        });

        return;
    }

    player.addEventListener("ready", () => {
        player.addEventListener("amp-story-player-close", () => {
            window.location.href = "https://temsabor.blog/"
        });
    });
}


async function addNewStories (){
    const root = document.body.querySelector("#root")
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug")
    const stories = await fetchNewStories();
    const player = document.createElement("amp-story-player");

    stories.forEach(story => {
        const ancora = `<a href="https://stories.temsabor.blog/story/${story.slug}" loading="lazy"></a>`
        player.insertAdjacentHTML("afterbegin", ancora)
    });


    root.appendChild(player)
}


function fetchNewStories(){
    return new Promise((resolve)=>{
        fetch("https://api.temsabor.blog/stories/",{
            method: "GET"
        }).then(res => res.json())
        .then(stories => {
            resolve(stories)
        })
        .catch(err => console.log(err))
    }) 
}

addNewStories();
initializePlayer();