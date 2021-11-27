console.log("client side js is loaded")



const weatherForm= document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2') //# is used for id and . is used for class

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    
    messageOne.textContent="Loading...."
    messageTwo.textContent=''
    
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    
    response.json().then((data)=>{
        if (data.error){
            messageOne.textContent=(data.error)
            messageTwo.textContent=''
        } else{
            messageOne.textContent=(data.location)
            messageTwo.textContent=(data.forecast)
        }
    })
})
})