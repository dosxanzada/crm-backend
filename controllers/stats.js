const Tasks = require('../models/Tasks')
const { waterfall } = require('async')

const { setError } = require('../utils')

const computeStats = (req, res, next) => {
  const dateFrom = req.body.dateFrom
  const dateTo = req.body.dateTo
  const query = Tasks.find({ from: req.payload._id })
  query.exec((err, tasks) => {
    if (!tasks || tasks.length === 0) return res.status(200).send({ stats: {}})
    waterfall([
      callback => {
        const filteredTasks = []
        tasks.forEach((task, index) => {
          if (dateFrom && dateTo) {
            if (dateToMidnight(task.createdAt) >= dateToMidnight(dateFrom) && dateToMidnight(task.createdAt) <= dateToMidnight(dateTo)) {
              filteredTasks.push(task)
            }
          } else if (dateFrom && !dateTo) {
            if (dateToMidnight(task.createdAt) === dateToMidnight(dateFrom)) {
              filteredTasks.push(task)
            }
          } else if (!dateFrom && dateTo) {
            if (dateToMidnight(task.createdAt) === dateToMidnight(dateTo)) {
              filteredTasks.push(task)
            }
          }
          if (tasks.length === index + 1) {
            callback(null, filteredTasks)
          }
        })
      },
      (tasks, callback) => {
        const tasksAmount = tasks.length
        let deadlinedTasks = 0
        let successTasks = 0
        let upcomingTasks = 0

        if (tasks.length === 0) return callback(null, { tasksAmount, deadlinedTasks, successTasks, upcomingTasks })

        tasks.forEach((task, index) => {
          if ((task.complete.status && dateToMidnight(task.complete.date) > dateToMidnight(task.deadline)) || (!task.complete.status && dateToMidnight(task.deadline) < dateToMidnight((new Date()).setHours((new Date()).getHours() - 6)))) deadlinedTasks++
          if (task.complete.status && dateToMidnight(task.complete.date) <= dateToMidnight(task.deadline)) successTasks++
          if (!task.complete.status && dateToMidnight(task.deadline) >= dateToMidnight(new Date())) upcomingTasks++
          if (tasks.length === index + 1) {
            callback(null, { tasksAmount, deadlinedTasks, successTasks, upcomingTasks })
          }
        })
      }
    ], (err, result) => {
      if (err) return next(setError(500, err.message, 'stats'))
      res.status(200).send({ stats: result })
    })
  })
}

const dateToMidnight = date => {
  if ((typeof date) === 'string' || (typeof date) === 'number') {
    return (new Date((new Date(+date)).setHours(0, 0, 0, 0))).getTime()
  } else if ((typeof date) === 'object' && date instanceof Date) {
    return (new Date(date.setHours(0, 0, 0, 0))).getTime()
  }
}

module.exports = {
  computeStats
}
