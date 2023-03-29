const socket = io.connect();

//------------------------------------------------------------------------------------

const addProductForm = document.getElementById('addProductForm')
addProductForm.addEventListener('submit', e => {
    e.preventDefault()
    const product = {
        title: addProductForm[0].value,
        price: addProductForm[1].value,
        thumbnail: addProductForm[2].value
    }
    socket.emit('update', product);
    addProductForm.reset()
})

socket.on('products', products => {
    makeHtmlTable(products).then(html => {
        document.getElementById('products').innerHTML = html
    })
});

function makeHtmlTable(products) {
    return fetch('views/tablas.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ products })
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputEmail = document.getElementById('inputEmail')
const inputMessage = document.getElementById('inputMessage')
const buttonSend = document.getElementById('buttonSend')

const postMessageForm = document.getElementById('postMessageForm')
postMessageForm.addEventListener('submit', e => {
    e.preventDefault()

    const message = { autor: inputEmail.value, texto: inputMessage.value }
    socket.emit('newMessage', message);
    postMessageForm.reset()
    inputMessage.focus()
})

socket.on('messages', messages => {
    console.log(messages);
    const html = makeHtmlList(messages)
    document.getElementById('messages').innerHTML = html;
})

function makeHtmlList(messages) {
    return messages.map(message => {
        return (`
            <div>
                <b style="color:blue;">${message.autor}</b>
                [<span style="color:brown;">${message.fyh}</span>] :
                <i style="color:green;">${message.texto}</i>
            </div>
        `)
    }).join(" ");
}

inputEmail.addEventListener('input', () => {
    const hayEmail = inputEmail.value.length
    const hayTexto = inputMessage.value.length
    inputMessage.disabled = !hayEmail
    buttonSend.disabled = !hayEmail || !hayTexto
})

inputMessage.addEventListener('input', () => {
    const hayTexto = inputMessage.value.length
    buttonSend.disabled = !hayTexto
})
