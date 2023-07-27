console.log("fui chamado")
window.addEventListener("load", ()=>{
    console.log("window load")
    const { head } = document

    // script to adsense
    const adsense = document.createElement("script");
    adsense.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4781060024956035"
    adsense.setAttribute("defer")
    adsense.setAttribute("crossorigin", "anonymous")
    head.appendChild(adsense)
})
