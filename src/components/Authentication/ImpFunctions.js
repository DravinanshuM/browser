const showMessage = (message) => {
    const elementMessage = document.createElement('div');
    elementMessage.textContent = message; 
    elementMessage.classList.add('message-class'); 
    document.body.appendChild(elementMessage); 
    // console.log("call :: ", message);

    setTimeout(()=>{
        document.body.removeChild(elementMessage);
    }, 10000);
}

export { showMessage };