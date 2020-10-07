function urlGenerator(domain){
    return function(url){
    return `https://${url}.${domain}`
    }
    }
    const comUrl = urlGenerator('com')
    const ruUrl = urlGenerator('ru')
    
    console.log(comUrl('google'))
    console.log(ruUrl('yandex'))
