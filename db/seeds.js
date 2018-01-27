require('dotenv').config()
const User = require('../db/models/User')
const Gift = require('../db/models/Gift')
const Info = require('../db/models/Info')

const mongoose = require('mongoose')


// connect to database
mongoose.connect('mongodb://localhost/project-3')

mongoose.connection.once('open', () => {
    console.log(`Mongoose has connected to MongoDB`)
})

mongoose.connection.on('error', (error) => {
    console.error(`
    MongoDB connection error!!! 
    ${error}
  `)
    process.exit(-1)
})

// Delete all users, then add some fake ones
User.remove({})
    .then(() => {
        const fahadZakir = new User({
            username: 'fahad81',
            email: 'fahadzakir81@gmail.com',
            firstName: 'Fahad',
            lastName: 'Zakir',
        })

        const nintendoSwitch = new Gift({
            giftName: 'Nintendo Switch'
        })
        const nintendoSwitchInfo = new Info({
            giftName: 'Nintendo Switch',
            for: 'Dawud',
            price: 300
        })
        nintendoSwitch.infoList.push(nintendoSwitchInfo)

        const iphoneX = new Gift({
            giftName: 'Iphone X'
        })
        const iphoneXInfo = new Info({
            giftName: 'Iphone X',
            for: 'Sarah',
            price: 1000
        })
        iphoneX.infoList.push(iphoneXInfo)

        fahadZakir.gifts.push(nintendoSwitch, iphoneX)

        return fahadZakir.save()
    }).then(() => {
        return User.create({
            username: 'musa10',
            email: 'abumusa1981@hotmail.com',
            firstName: 'Musa',
            lastName: 'Zakir'
        })
    }).then((musa) => {
        const samsungHd = new Gift({
            title: 'Samasung HD'
        })

        const macbookPro = new Gift({
            title: 'Macbook Pro'
        })

        musa.gifts.push(samsungHd, macbookPro)

        return musa.save()
    }).catch((error) => {
        console.log('!!!!! ERROR SAVING SEEDED DATA !!!!!')
        console.log(error)
    }).then(() => {
        mongoose.connection.close()
        console.log(`
      Finished seeding database...
      
      Disconnected from MongoDB
    `)
    })