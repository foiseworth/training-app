const counterValueContainer = document.querySelector('.counter-value');
const counterUpdaterValue = document.querySelector('.counter-updater-value')
const counterUpdaterSubmit = document.querySelector('.counter-updater-submit');
const errorMessage = document.querySelector('.error-message');

setValue();

counterUpdaterValue.addEventListener('focus', hideError);
counterUpdaterSubmit.addEventListener('click', updateValue);

async function setValue() {
    try {
        const apiResponse = await fetch('http://localhost:3000/getCount')
        const counterValue = await apiResponse.text();
        counterValueContainer.innerHTML = counterValue;
    } catch {
        displayError()
    }
}

async function updateValue() {
    try {
        const value = parseInt(counterUpdaterValue.value);

        if (isNaN(value)) {
            displayError();
            return;
        }

        const response = await fetch('http://localhost:3000/updateCount', {
            method: 'POST',
            body: JSON.stringify({number: value}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText)
        }
        setValue();
    } catch(error) {
        displayError(error)
    }
}

function displayError(errorText) {
    if (errorText) {
        errorMessage.innerHTML = errorText
    }
    errorMessage.style.display = 'block';
}

function hideError() {
    errorMessage.style.display = 'none';
}