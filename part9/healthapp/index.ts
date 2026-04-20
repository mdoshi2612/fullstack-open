import express from 'express'
import { calculateBmi } from './bmi.ts'

const app = express()
app.use(express.json())

const PORT: number = 3000

app.get('/hello', (_req, res) => {
  res.send('Hello World')
})

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query

  const heightNum = Number(height)
  const weightNum = Number(weight)

  if (!height || !weight || isNaN(heightNum) || isNaN(weightNum)) {
    res.status(400).send({
      error: 'malformatted parameters',
    })
    return
  }

  res.send({
    weight: weightNum,
    height: heightNum,
    bmi: calculateBmi(heightNum, weightNum),
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
