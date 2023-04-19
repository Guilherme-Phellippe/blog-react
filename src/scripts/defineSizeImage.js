export const defineSizeImage = (imgs) => { 
    if(window.innerWidth <= 600) return imgs[0].medium
    else return imgs[0].big
}