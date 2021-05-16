const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const locationMsg = document.querySelector('#message-1')
const forecastMsg = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    locationMsg.textContent = 'Loading...'
    forecastMsg.textContent = ''

    fetch('/weather?address=' + search.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                return locationMsg.textContent = data.error
            }
            locationMsg.textContent = data.location
            forecastMsg.textContent = data.forecast
        })
    })
})