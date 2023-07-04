//eslint-disable-next-line
self.addEventListener("push", (e)=>{
    const body = e.data?.text() ?? ""
    
    e.waitUntil(
        //eslint-disable-next-line
        self.registration.showNotification("Teste", {
            body,
        })
    )
})