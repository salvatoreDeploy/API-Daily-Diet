import { afterAll, beforeAll, beforeEach, it, describe, expect } from 'vitest'
import { app } from '../src/app'
import request from 'supertest'
import { execSync } from 'node:child_process'

describe('Meals Route', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback')
    execSync('npm run knex migrate:latest')
  })
  it('Should be able to create a new meal', async () => {
    const userResponse = await request(app.server).post('/users/signup').send({
      id: 'uuid-001-teste',
      username: 'user1',
      email: 'user1@email.com',
    })

    const meal = {
      name: 'meal',
      description: 'description',
      date: '24/07/2023',
      time: '00:00',
      isInDiet: true,
    }

    const userId = userResponse.body.user.id

    const response = await request(app.server)
      .post('/meals')
      .send(meal)
      .query({ userId })
      .expect(201)

    expect(response.body.meal.id).toEqual(expect.any(String))
  })

  it('Should be able to get all meals from a user', async () => {
    const userResponse = await request(app.server).post('/users/signup').send({
      id: 'uuid-001-teste',
      username: 'user',
      email: 'user1@email.com',
    })

    const mealsToCreate = [
      {
        name: 'meal-1',
        description: 'description-1',
        date: '24/07/2023',
        time: '12:00',
        isInDiet: true,
      },
      {
        name: 'meal-2',
        description: 'description-2',
        date: '24/07/2023',
        time: '15:00',
        isInDiet: true,
      },
      {
        name: 'meal-3',
        description: 'description-3',
        date: '24/07/2023',
        time: '18:00',
        isInDiet: false,
      },
    ]

    const userId = userResponse.body.user.id

    mealsToCreate.map(async (meal) => {
      await request(app.server).post('/meals').send(meal).query({ userId })
    })

    const response = await request(app.server)
      .get('/meals')
      .query({ userId })
      .expect(200)

    expect(response.body.meals).toHaveLength(3)
  })

  it('Should be able to get meal by id', async () => {
    const userResponse = await request(app.server).post('/users/signup').send({
      id: 'uuid-001-teste',
      username: 'user',
      email: 'user1@email.com',
    })

    const mealsToCreate = [
      {
        name: 'meal-1',
        description: 'description-1',
        date: '24/07/2023',
        time: '12:00',
        isInDiet: true,
      },
      {
        name: 'meal-2',
        description: 'description-2',
        date: '24/07/2023',
        time: '15:00',
        isInDiet: true,
      },
      {
        name: 'meal-3',
        description: 'description-3',
        date: '24/07/2023',
        time: '18:00',
        isInDiet: false,
      },
    ]

    const userId = userResponse.body.user.id

    mealsToCreate.map(async (meal) => {
      await request(app.server).post('/meals').send(meal).query({ userId })
    })

    const meals = await request(app.server).get('/meals').query({ userId })

    const response = await request(app.server)
      .get(`/meals/${meals.body.meals[1].id}`)
      .query({ userId })
      .expect(200)

    expect(response.body.meal).toEqual(
      expect.objectContaining({ name: 'meal-2' }),
    )
  })

  it('Should be able to delete meal by id', async () => {
    const userResponse = await request(app.server).post('/users/signup').send({
      id: 'uuid-001-teste',
      username: 'user',
      email: 'user1@email.com',
    })

    const mealsToCreate = [
      {
        name: 'meal-1',
        description: 'description-1',
        date: '24/07/2023',
        time: '12:00',
        isInDiet: true,
      },
      {
        name: 'meal-2',
        description: 'description-2',
        date: '24/07/2023',
        time: '15:00',
        isInDiet: true,
      },
      {
        name: 'meal-3',
        description: 'description-3',
        date: '24/07/2023',
        time: '18:00',
        isInDiet: false,
      },
    ]

    const userId = userResponse.body.user.id

    mealsToCreate.map(async (meal) => {
      await request(app.server).post('/meals').send(meal).query({ userId })
    })

    const meals = await request(app.server).get('/meals').query({ userId })

    await request(app.server)
      .delete(`/meals/${meals.body.meals[1].id}`)
      .query({ userId })

    const response = await request(app.server)
      .get('/meals')
      .query({ userId })
      .expect(200)

    expect(response.body.meals).toHaveLength(2)
  })

  it('Should be able to update a meal', async () => {
    const userResponse = await request(app.server).post('/users/signup').send({
      id: 'uuid-001-teste',
      username: 'user',
      email: 'user1@email.com',
    })

    const meal = {
      name: 'meal',
      description: 'description',
      date: '24/07/2023',
      time: '12:00',
      isInDiet: true,
    }

    const userId = userResponse.body.user.id

    const mealResponse = await request(app.server)
      .post('/meals')
      .send(meal)
      .query({ userId })

    const mealUpdate = {
      name: 'meal-2',
      description: 'description-2',
      date: '24/07/2023',
      time: '14:00',
      isInDiet: false,
    }

    const response = await request(app.server)
      .put(`/meals/${mealResponse.body.meal.id}`)
      .send(mealUpdate)
      .query({ userId })
      .expect(202)

    expect(response.body.meal.id).toEqual(expect.any(String))
  })

  it('Should be able to get meal by id', async () => {
    const userResponse = await request(app.server).post('/users/signup').send({
      id: 'uuid-001-teste',
      username: 'user',
      email: 'user1@email.com',
    })

    const mealsToCreate = [
      {
        name: 'meal-1',
        description: 'description-1',
        date: '24/07/2023',
        time: '12:00',
        isInDiet: true,
      },
      {
        name: 'meal-2',
        description: 'description-2',
        date: '24/07/2023',
        time: '15:00',
        isInDiet: true,
      },
      {
        name: 'meal-3',
        description: 'description-3',
        date: '24/07/2023',
        time: '18:00',
        isInDiet: false,
      },
    ]

    const userId = userResponse.body.user.id

    mealsToCreate.map(async (meal) => {
      await request(app.server).post('/meals').send(meal).query({ userId })
    })

    const response = await request(app.server)
      .get('/meals/metrics')
      .query({ userId })
      .expect(200)

    expect(response.body.metricsMeals.metrics).toEqual(
      expect.objectContaining({
        mealTotal: 3,
        mealWithinDiet: 2,
        mealWithoutDiet: 1,
        mealWithinDietPercentage: '66.67',
        bestSequency: 2,
      }),
    )
  })
})
