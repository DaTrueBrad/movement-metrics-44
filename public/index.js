console.log("JS Connected")
const gTitle = document.getElementById('goal-title')
const gAmount = document.getElementById('goal-amount')
const gForm = document.getElementById('goal-form')
const gContainer = document.getElementById('goal-container')

const updateProgress = (goal, newProgress) => {
    goal.progress = newProgress
    axios.put('http://localhost:4004/api/updateGoal', goal)
    .then((res) => {
        gContainer.innerHTML = ""
            console.log(res.data)
            res.data.forEach(createGoal)
    })

}

const accomplishGoal = (id) => {
    axios
        .delete(`http://localhost:4004/api/accomplishTask/${id}`)
        .then((res) => {
            gContainer.innerHTML = ""
                console.log(res.data)
                res.data.forEach(createGoal)
        })
}


const createGoal = (goal, index) => {
    const outerDiv = document.createElement('div')
    const upperDiv = document.createElement('div')
    const lowerDiv = document.createElement('div')
    const goalTitle = document.createElement('h2')
    const goalAmount = document.createElement('h3')
    const goalProgress = document.createElement('h2')
    const updateInput = document.createElement('input')
    const accomplishButton = document.createElement('button')
    const updateButton = document.createElement('button')

    goalTitle.textContent = goal.title
    goalAmount.textContent = goal.amount
    goalProgress.textContent = goal.progress
    updateButton.textContent = "🚀"
    accomplishButton.textContent = '✅'

    upperDiv.appendChild(goalTitle)
    upperDiv.appendChild(goalAmount)

    lowerDiv.appendChild(updateInput)
    lowerDiv.appendChild(updateButton)
    lowerDiv.appendChild(accomplishButton)

    outerDiv.appendChild(upperDiv)
    outerDiv.appendChild(goalProgress)
    outerDiv.appendChild(lowerDiv)

    gContainer.appendChild(outerDiv)

    outerDiv.classList.add('goal')
    upperDiv.classList.add('upper-div')
    lowerDiv.classList.add('lower-div')

    updateButton.addEventListener('click', () => updateProgress(goal, updateInput.value))
    accomplishButton.addEventListener('click', () => accomplishGoal(goal.id))
}

const handleSubmit = (e) => {
    e.preventDefault()
    const newGoal = {
        title: gTitle.value,
        amount: gAmount.value,
        progress: 'N/A',
        accomplished: false
    }
    axios
        .post('http://localhost:4004/api/newGoal', newGoal)
        .then((res) => {
            gContainer.innerHTML = ""
            console.log(res.data)
            res.data.forEach(createGoal)
        })
}

gForm.addEventListener('submit', handleSubmit)

axios
    .get('http://localhost:4004/api/getGoals')
    .then((res) => {
        gContainer.innerHTML = ""
        console.log(res.data)
        res.data.forEach(createGoal)
    })