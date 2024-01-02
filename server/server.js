const express = require('express')
const cors = require('cors')
const {newGoal, updateGoal, accomplishGoal, getGoals} = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/api/getGoals', getGoals)
app.post('/api/newGoal', newGoal)
app.put('/api/updateGoal', updateGoal)
app.delete('/api/accomplishTask/:id', accomplishGoal)

app.listen(4004, () => console.log('Up on 4004'))