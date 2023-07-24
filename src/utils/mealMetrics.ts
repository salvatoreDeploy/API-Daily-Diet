interface IMeal {
  id: string
  user_id?: string
  name: string
  description: string
  date: string
  time: string
  isInDiet: boolean
  created_at: string
  updated_at: string
}

interface IMealMetricData {
  metrics: {
    mealTotal: number
    mealWithinDiet: number
    mealWithoutDiet: number
    mealWithinDietPercentage: string
    bestSequency: number
    allMeals: IMeal[]
  }
}

export function mealsMetrics(meals: IMeal[]): IMealMetricData {
  const metrics = meals.reduce(
    (acc, meal) => {
      acc.mealTotal += 1

      if (!meal.isInDiet === true) {
        acc.mealWithoutDiet += 1
        acc.actualSequency = 0
        console.log('Henrique')
      } else {
        acc.mealWithinDiet += 1
        acc.actualSequency += 1
        console.log('Araujo')

        if (acc.actualSequency > acc.bestSequency) {
          acc.bestSequency = acc.actualSequency
        }
      }

      return acc
    },
    {
      bestSequency: 0,
      actualSequency: 0,
      mealTotal: 0,
      mealWithinDiet: 0,
      mealWithoutDiet: 0,
    },
  )

  const porcentageInDiet = (
    (metrics.mealWithinDiet / metrics.mealTotal) *
    100
  ).toFixed(2)

  return {
    metrics: {
      mealTotal: metrics.mealTotal,
      mealWithinDiet: metrics.mealWithinDiet,
      mealWithoutDiet: metrics.mealWithoutDiet,
      mealWithinDietPercentage: porcentageInDiet,
      bestSequency: metrics.bestSequency,
      allMeals: meals,
    },
  }
}
