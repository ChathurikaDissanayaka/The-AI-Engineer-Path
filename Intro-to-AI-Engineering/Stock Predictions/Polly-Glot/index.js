const messageEl = document.getElementById("message")
const msgsEl = document.getElementById("msgs")
const sendEl = document.getElementById("send")
let languages = document.querySelectorAll('input[name="lang"]')

sendEl.addEventListener("click", function(){
    let msgContent = messageEl.value
    let checked = false
    if (msgContent){
        for (const l of languages) {
            if (l.checked) {
                msgsEl.innerHTML += `<p class="sender-msg">${msgContent}</p>` 
                generateTranslation(msgContent, l.id)
                messageEl.value = ""
                checked = true
            }
          }
          if(!checked){
            msgsEl.innerHTML += `<p class="reciever-msg">Select a language to translate.</p>`
          }
    }
})

function setTranslation(msg){
    msgsEl.innerHTML += `<p class="reciever-msg">${msg}</p>` 
    msgsEl.scrollTop = msgsEl.scrollHeight
}

async function generateTranslation(text, lang){
    let translation = text+ " " + lang
    const messages = [
        {
            role: 'system',
            content: 'You are a language expert. Translate the given text into the language provided. Output should only be the translation in the given language'
        },
        {
            role: 'user',
            content: `Text: ${text} Language:${lang}`
        }
    ]

    try {
        const url = "https://openai-api-worker.dchathu20.workers.dev/"
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messages) 
        })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(`Worker Error: ${data.error}`)
        }
        translation = data.content
    } catch (err) {
        console.error(err.message)
        loadingArea.innerText = 'Unable to access AI. Please refresh and try again'
    }
    setTranslation(translation)
}
