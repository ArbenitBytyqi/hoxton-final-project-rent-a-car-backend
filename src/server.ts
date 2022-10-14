import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())
const port = 5000

// CARS

app.get('/cars' , async (req, res) => {
    const cars = await prisma.cars.findMany()
    res.send(cars)
})

app.get('/cars/:id', async (req, res) => {
    const car = await prisma.cars.findUnique({ 
        where: { id: Number(req.params.id) }
    })
    if (car){
        res.send(car)
    }else {
        res.status(404).send({ error: 'Car does not exists! 😒' })
    }
})

app.post('/cars', async (req, res)=>{
    const car = {
      name: req.body.name,
      model: req.body.model,
      maker: req.body.maker,
      price: req.body.price,
      photo: req.body.photo,
      description: req.body.description,
      costToRun: req.body.costToRun
    }
    let errors: string[] = []
  
      if (typeof req.body.name !== 'string') {
          errors.push('Name of Car not given!')
        }

      if (typeof req.body.model !== 'string') {
          errors.push('Model of car not given or wrong!')
        }

      if(typeof req.body.maker  !=='string') {
          errors.push('Maker of car not given or wrong!')
        }

      if(typeof req.body.price  !=='number') {
          errors.push('Price of car not given or wrong!')
        }

      if(typeof req.body.photo  !=='string') {
          errors.push('Photo of car not given or wrong!')
        }

      if(typeof req.body.description  !=='string') {
          errors.push('Description of car not given or wrong!')
        }    

      if(typeof req.body.costToRun  !=='string') {
          errors.push('Cost to run of car not given or wrong!')
        }    

      if( errors.length === 0)  {
        try{
            const newCar = await prisma.cars.create({
              data: {
                name: car.name,
                model :car.model,
                maker:car.maker,
                price: car.price,
                photo: car.photo,
                description: car.description,
                costToRun: car.costToRun
              }
            })
            res.send(newCar)
          } catch(err) {
            // @ts-ignore
            res.status(400).send({errors: errors})
          }
      }
})

app.delete('/cars/:id', async (req, res) => {
    try {
        const car = await prisma.cars.delete({
          where: { id: Number(req.params.id) }
        })
        res.send(car)
      } catch (error) {
        res.status(400).send({ error: 'Car could not be deleted!' })
      }
})

// USERS

app.get('/users' , async (req, res) => {
    const users = await prisma.user.findMany({ include: { reviews: true } })
    res.send(users)
})

app.get('/users/:id', async (req, res) => {
    const user = await prisma.user.findUnique({ 
        where: { id: Number(req.params.id) }
    })
    if (user){
        res.send(user)
    }else {
        res.status(404).send({ error: 'User does not exists! 😒' })
    }
})

app.post('/users', async (req, res)=>{
    const user = {
      email: req.body.email,
      name: req.body.name,
      image: req.body.image,
      password: req.body.password
    }
    let errors: string[] = []
  
      if (typeof req.body.email !== 'string') {
          errors.push('Email not given!')
        }

      if (typeof req.body.name !== 'string') {
          errors.push('Name not given or wrong!')
        }

      if(typeof req.body.image  !=='string') {
          errors.push('Image not given or wrong!')
        }

      if(typeof req.body.password  !=='string') {
          errors.push('Password not given or wrong!')
        }    

      if( errors.length === 0)  {
        try{
            const newUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                password: user.password
              }
            })
            res.send(newUser)
          } catch(err) {
            // @ts-ignore
            res.status(400).send({errors: errors})
          }
      }
})

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await prisma.user.delete({
          where: { id: Number(req.params.id) }
        })
        res.send(user)
      } catch (error) {
        res.status(400).send({ error: 'User could not be deleted!' })
      }
})

// REVIEWS

app.get('/reviews' , async (req, res) => {
    const reviews = await prisma.review.findMany()
    res.send(reviews)
})

app.get('/reviews/:id', async (req, res) => {
    const review = await prisma.review.findUnique({ 
        where: { id: Number(req.params.id) }
    })
    if (review){
        res.send(review)
    }else {
        res.status(404).send({ error: 'Review does not exists! 😒' })
    }
})

app.post('/reviews', async (req, res)=>{
    const review = {
      userId: req.body.userId,
      rating: req.body.rating,
      content: req.body.content,
      createdAt: req.body.createdAt
    }
    let errors: string[] = []
  
      if (typeof req.body.userId !== 'number') {
          errors.push('User Id not given!')
        }

      if (typeof req.body.rating !== 'number') {
          errors.push('Rating not given or wrong!')
        }

      if(typeof req.body.content  !=='string') {
          errors.push('Review not given or wrong!')
        }

      if(typeof req.body.createdAt  !=='number') {
          errors.push('Date not given or wrong!')
        }    

      if( errors.length === 0)  {
        try{
            const newReview = await prisma.review.create({
              data: {
                userId: req.body.userId,
                rating: req.body.rating,
                content: req.body.content,
                createdAt: req.body.createdAt
              }
            })
            res.send(newReview)
          } catch(err) {
            // @ts-ignore
            res.status(400).send({errors: errors})
          }
      }
})

app.delete('/reviews/:id', async (req, res) => {
    try {
        const review = await prisma.review.delete({
          where: { id: Number(req.params.id) }
        })
        res.send(review)
      } catch (error) {
        res.status(400).send({ error: 'Review could not be deleted!' })
      }
})

// GENERAL

app.listen(port, () => {
    console.log(`Listening on port: http://localhost:${port}`)
})