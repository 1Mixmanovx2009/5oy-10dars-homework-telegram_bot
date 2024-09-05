let elListGroup = document.querySelector(".list-group")


function getRequest(){
    axios.get(" https://dummyjson.com/products ").then(res => {
        res.data.products.map(item =>{
            let elItem = document.createElement("li")
            elItem.className = "w-[400px] p-5 rounded-lg bg-slate-200"
            elItem.innerHTML =`
            <img class="object-contain  h-[200px] bg-white p-2 rounded-lg"  src=${item.images[0]} alt="Product img" width="100%" height="70"> 
            <h2 class="font-bold text-[20px]">${item.title}</h2>
            <p class="line-clamp-3">${item.description}</p>
            <button onclick="hendleSendMessage(${item.id})" class="bg-blue-500 text-white w-full mt-5 py-2 rounded-lg">Send message</button>
            `
            elListGroup.appendChild(elItem)
        })
    })
}
getRequest()



// ------------chat bot------------

const TOKEN = "7493624885:AAEXMMk8zDTVZCeB-CR-Wh0Om24gob1hodc"
const CHAT_ID = "-1002240553165"
const HTTP = `https://api.telegram.org/bot${TOKEN}/sendPhoto`

function hendleSendMessage(id){
    axios.get(`https://dummyjson.com/products/${id}`).then(res => {
        let message = `<b>Products info</b>\n`
        message += `<b>Name: ${res.data.title}</b>\n`
        message += `<b>Description: ${res.data.description}</b>\n`

        axios.post(HTTP, { 
            chat_id: CHAT_ID, 
            photo:res.data.images[0],
            parse_mode:"html",
            caption: message 
        })
    })
    
    
}