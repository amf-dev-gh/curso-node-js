const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be string',
    required_error: 'Movie title is required'
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(3),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(z.enum(['Drama','Action','Adventure','Fantasy','Sci-Fi','Romance','Animation','Biography','Crime','Thriller']),
    {
      required_error: 'Genre is required',
      invalid_type_error: 'Genre must be an array of enum Genre'
    })
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validateParcialMovie(object){
  // El partial() hace que todas los atributos sean opcionales. Pero si se los pasa los valida
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateParcialMovie,
  validateMovie
}