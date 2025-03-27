export const generateRating = (min: number = 1, max: number = 5) => {
  return parseFloat((randomNumber(min, max)).toFixed(2))
}

export const generateRatingCount = (min: number = 1, max: number = 1000) => {
  return Math.floor(randomNumber(min, max))
}

const randomNumber = (min: number, max: number) => {
  return Math.random() * (max - min + 1) + min
}