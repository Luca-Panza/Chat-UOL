axios.defaults.headers.common['Authorization'] = 'sLzHR234raU7rEAU0ZBrKHoo';

function render_messages (){
    axios.post('https://mock-api.driven.com.br/api/vm/uol/status', user);

    const messages_promise = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');

    messages_promise.then((package)=>{

    messages = package.data;

    let Hub_Central = document.querySelector(".Hub-central");

    Hub_Central.innerHTML = ``;

    for(i=0;i<messages.length;i++){
    
        if(messages[i].type === "message"){
            Hub_Central.innerHTML += `
                <div class="${messages[i].type}" data-test="message"> 
                    <p>
                        <span class ="Time">${messages[i].time}</span>
                        <span class ="Name"> ${messages[i].from} </span>
                        <span class ="Message">para </span> <span class ="Name"> ${messages[i].to} </span>: <span class="Message">${messages[i].text}</span>
                    </p>
                </div>
            `
            }

        else if(messages[i].type === "private_message" && (messages[i].to === user.name || messages[i].to === "Todos")){
            Hub_Central.innerHTML += `
            <div class="${messages[i].type}" data-test="message"> 
                <p>
                    <span class ="Time">${messages[i].time}</span>
                    <span class ="Name"> ${messages[i].from} </span>
                    <span class ="Message">para </span> <span class ="Name"> ${messages[i].to} </span>: <span class="Message">${messages[i].text}</span>
                </p>
            </div>
        `
        }

        else{
            Hub_Central.innerHTML += `
                <div class="${messages[i].type}" data-test="message"> 
                    <p>
                        <span class ="Time">${messages[i].time}</span>
                        <span class ="Name"> ${messages[i].from} </span>
                        <span class ="Message">${messages[i].text}</span>
                    </p>
                </div>`
        }
    }

    const scrollToBottom = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView(false);
    }    

    scrollToBottom("bottom_page");

    });
    
}

function send_message (){
    let enviar_message = {
        from: user.name,
        to:"Todos",
        text: document.getElementById("text_written").value ,
        type: "message",
    } 
    sendmsg_promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', enviar_message);
    sendmsg_promise.then(()=>{
        document.getElementById("text_written").value = ``
    });
    sendmsg_promise.catch(()=>{
        window.location.reload()
    });
} 

let sendMessage = document.getElementById("text_written");
sendMessage.addEventListener("keyup", function(event) {
    if (event.key === "Enter") { 
        event.preventDefault();
        send_message ()
    }
})


function Success (){
    setInterval(render_messages, 3000);
}

function Denied (){

    user.name = prompt ("Digite seu nome");
    promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', user);
    
    promise.then(Success);
    promise.catch(Denied);
}

let user = {};
let messages = {};
user.name = prompt ("Digite seu nome");
let promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', user);

promise.then(Success);

promise.catch(Denied);
