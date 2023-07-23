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

function ChangeNameTitlePage(){
    const titleTag = document.head.querySelector("title")
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug");
    titleTag.textContent = slug
}

async function addNewStories (){
    const root = document.body.querySelector("#root")
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get("slug")
    const stories = await fetchNewStories(slug);


    const player = document.createElement("amp-story-player");
    player.setAttribute("width", "100vw")
    player.setAttribute("height", "100vh")
    player.setAttribute("layout", "fixed")
    
    const script = document.createElement("script");
    script.setAttribute("type","application/json")
    script.innerHTML = `{
        "behavior": {
            "pageScroll": false,
            "autoplay": false,
            "on": "end",
            "action": "circular-wrapping"
        },
         "controls": [{
                "name": "close",
            "position": "start"
        }]
     }`

    stories.forEach(story => {
        const ancora = `<a href="https://stories.temsabor.blog/story/${story.slug}" loading="lazy"></a>`
        player.insertAdjacentHTML("afterbegin", ancora)
    });

    player.appendChild(script)
    root.appendChild(player)

    initializePlayer();
}


function fetchNewStories(slug){
    return new Promise((resolve)=>{
        fetch("https://api.temsabor.blog/stories/",{
            method: "GET"
        }).then(res => res.json())
        .then(stories => {
            const indexSlug = stories.findIndex(story => story.slug === slug)
            if(indexSlug !== -1){
                const selectedStory = stories.splice(indexSlug, 1)[0]
                stories.push(selectedStory)
            }
            resolve(stories)
        })
        .catch(err => console.log(err))
    }) 
}

addNewStories();
