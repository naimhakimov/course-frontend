import Quiz from '../schema/Quiz.js'
import Result from '../schema/Result.js'

export const getQuiz = async (req, res, next) => {
  try {
    const allQuiz = await Quiz.find()
    res.send(allQuiz)
  } catch (err) {
    next(err)
  }
}

export const createQuiz = async (req, res, next) => {
  try {
    const quiz = new Quiz(req.body)
    const result = await quiz.save()
    res.status(201).send(result)
  } catch (err) {
    next(err)
  }
}

export const checkQuiz = async (req, res, next) => {
  try {
    if (!Array.isArray(req.body)) {
      return res.status(400)
    }
    const quizData = await Quiz.find()
    const bodyData = req.body.map((quiz) => {
      const findItem = JSON.parse(JSON.stringify(quizData)).find(q => q._id === quiz._id)
      return {
        ...findItem,
        correct: quiz.options.filter(item => item.answer)[0]?.uid === findItem.answer,
        uid: quiz.options.filter(item => item.answer)[0]?.uid
      }
    })
    const quizLength = quizData.length
    const quizLengthCorrect = bodyData.filter(quiz => quiz.correct).length
    const result = new Result({ user: req.user._id, result: `${quizLength}/${quizLengthCorrect}`, quiz: bodyData })
    const resultUser = await result.save()

    res.send({ ...JSON.parse(JSON.stringify(resultUser)), quiz: bodyData })
  } catch (err) {
    next(err)
  }
}

export const getQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select('+answer')
    res.send(quiz)
  } catch (err) {
    next(err)
  }
}

export const updateQuizById = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.send(quiz)
  } catch (err) {
    next(err)
  }
}

export const removeQuizById = async (req, res, next) => {
  try {
    await Quiz.findByIdAndDelete(req.params.id)
    res.send({ message: 'Successfully removed' })
  } catch (err) {
    next(err)
  }
}
