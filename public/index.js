async function main(){
    const countContainer = document.querySelector('#count-container');
    const incrementButton = document.querySelector('#increment-button');
    const decrementButton = document.querySelector('#decrement-button');

        let res = await fetch('http://localhost:9001/counter')
        let db = await res.json()
        console.log(db)

    async function updateValue (val) {
        let res = await fetch('http://localhost:9001/counter',
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                value: val
            })
        })
        
        let newValue = await res.json()
        return newValue.value
    }
    

    let countValue = db.value;

    async function increment(){
        let newValue = await updateValue(countValue + 1)
        countValue = newValue;
        countContainer.textContent = countValue;
    }

    async function decrement(){
        let newValue = await updateValue(countValue - 1)
        countValue = newValue;
        countContainer.textContent = countValue;
    }

    incrementButton.addEventListener('click', increment);
    decrementButton.addEventListener('click', decrement);
    countContainer.textContent = countValue;
}
main()