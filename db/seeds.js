require('dotenv').config()
const User = require('../db/models/User')
const Gift = require('../db/models/Gift')
const Info = require('../db/models/Info')

const mongoose = require('mongoose')


// connect to database mongoDB
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
// The seeds is what is going to fill in the Schema key values
// Functions below are for when you seed the db, so everytime you seed it, this runs!

// Delete all users, then add some fake ones using the info from the one's below
User.remove({})
    .then(() => {
        const fahadZakir = new User({
            firstName: 'Fahad',
            lastName: 'Zakir',
            email: 'fahadzakir11@gmail.com',
            photoUrl: 'https://i.imgur.com/0yDZcCV.jpg'
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
        // figure this one out

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
            firstName: 'Musa',
            lastName: 'Zakir',
            email: 'abumusa1981@hotmail.com',
            photoUrl: 'https://i.imgur.com/zedHEOI.png'
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