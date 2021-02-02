(async function() {
    const counterValueContainer = document.querySelector('.counter-value');
    
    const apiResponse = await fetch('http://localhost:3000/getCount')
    const counterValue = await apiResponse.text();
    counterValueContainer.innerHTML = counterValue;
})()

