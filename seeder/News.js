const News = require('../models/News')

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/diplom')

const newsCollection = [
  {
    title: 'Открытая лекция',
    body: '26.03.2018 года в 14.00 в ауд. 107 (лаборатория "ЮНИСЕФ") от компании CEO ASPEX состоится открытая лекция на тему "Практическое применение бизнес-аналитики в PowerBI в кейсах в корпоративном и государственном секторах". Суть лекции - показать разные отчеты построенные в PowerBI и как они помогают...',
    fullBody: ' 26.03.2018 года в 14.00 в ауд. 107 (лаборатория \"ЮНИСЕФ\") от компании CEO ASPEX состоится открытая лекция на тему "Практическое применение бизнес-аналитики в PowerBI в кейсах в корпоративном и государственном секторах". Суть лекции - показать разные отчеты построенные в PowerBI и как они помогают принимать решения на управленческом уровне.  Для тех, кто хочет стать бизне-аналитиком компания CEO ASPEX готова предложить практику с дальнейшим трудоустройством. Приглашаются все желающие студенты.',
    date: new Date(),
    images: ['uploads/3a48s-5iGKE.jpg', 'uploads/16-logo.jpg']
  },
  {
    title: 'Расписание обзорных лекций для 4 курса',
    body: 'Уважаемые студенты 4 курса! С 26 марта 2018г. начинаются обзорные лекции по дисциплинам Государственных экзаменов.',
    fullBody: 'Уважаемые студенты 4 курса! С 26 марта 2018г. начинаются обзорные лекции по дисциплинам Государственных экзаменов.',
    date: new Date(),
    images: ['uploads/dribbbleshot4.jpg', 'uploads/16-logo.jpg']
  },
  {
    title: 'Конкурс',
    body: 'Дорогие студенты и сотрудники университета! Библиотека объявляет конкурс на лучшую эмблему для Книжного клуба. Главные критерии отбора – логотип должен быть ярким, креативным, отражать связь книг и IT-университета. Победитель будет награжден одной из мотивационных книг, ...',
    fullBody: 'Дорогие студенты и сотрудники университета! Библиотека объявляет конкурс на лучшую эмблему для Книжного клуба. Главные критерии отбора – логотип должен быть ярким, креативным, отражать связь книг и IT-университета. Победитель будет награжден одной из мотивационных книг, представленных в нашей библиотеке. Работы принимаются до 02.04.2018 Ð ³. Просьба работы высылать на эл. адрес: zh.sarsenbayeva@iitu.kz.',
    date: new Date(),
    images: ['uploads/dribbbleshot4.jpg', 'uploads/16-logo.jpg']
  },
  {
    title: 'Гостевая лекция',
    body: '15 марта 2018 в 12.10-13.00 в 702 ауд. состоится гостевая лекция генерального директора и основателя эксклюзивного селлера онлайн-аудиорекламы в Казахстане - "4P Agency" на тему "Контент-маркетинг как Digital тренд". В лекции нулевой момент истины, процессы покупки в интернете; принцип Zero ...',
    fullBody: '15 марта 2018 в 12.10-13.00 в 702 ауд. состоится гостевая лекция генерального директора и основателя эксклюзивного селлера онлайн-аудиорекламы в Казахстане - "4P Agency" на тему "Контент-маркетинг как Digital тренд". В лекции нулевой момент истины, процессы покупки в интернете; принцип Zero Moment of Trouth ZMOT, представленный сотрудником Google; развитие бизнеса и интернет-предпринимательство.',
    date: new Date(),
    images: ['uploads/MDGroove_список тикетов для клиента.jpg', 'uploads/uYzHSFXTei4.jpg']
  }
]

newsCollection.forEach((news, newsIndex) => {
  News.create(news, (err, n) => {
    if (err) return console.log(err)
    console.log(`News saved: ${n.title}`)
    if (newsIndex + 1 === newsCollection.length) exit()
  })
})

const exit = () => {
  mongoose.disconnect()
}
