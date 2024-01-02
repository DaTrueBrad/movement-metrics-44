let goals = []
let globalId = 1

module.exports = {
    newGoal: (req, res) => {
        let newGoal = req.body
        newGoal.id = globalId
        globalId++
        goals.push(newGoal)
        res.status(200).send(goals)
    },
    updateGoal: (req, res) => {
        let indexValue = goals.findIndex((goal) => goal.id === req.body.id)
        console.log(indexValue)
        console.log(goals[indexValue])
        goals.splice(indexValue, 1, req.body)
        res.status(200).send(goals)
    },
    accomplishGoal: (req, res) => {
        let newGoals = goals.filter((goal) => goal.id !== +req.params.id)
        goals = newGoals
        res.status(200).send(goals)
    },
    getGoals: (req, res) => {
        res.status(200).send(goals)
    }
}