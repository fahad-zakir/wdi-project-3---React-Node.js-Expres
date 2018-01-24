require('dotenv').config()
const User = require('../db/models/User')
const Gift = require('../db/models/Gift')
const Info = require('../db/models/Info')

const mongoose = require('mongoose')


// connect to database
mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
})

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

        const streetFighter = new Gift({
            title: 'Street Fighter II',
            GiftLink: 'http://emulator.online/snes/street-fighter-2-turbo/'
        })
        const streetFighterInfo = new Info({
            title: 'Street Fighter II',
            genre: 'Fighting',
            yearReleased: 1991,
            system: 'SNES'
        })
        streetFighter.infoList.push(streetFighterInfo)

        const marioKart = new Gift({
            title: 'Super Mario Kart',
            GiftLink: 'http://emulator.online/snes/super-mario-kart/'
        })
        const marioKartInfo = new Info({
            title: 'Super Mario Kart',
            genre: 'Racing',
            yearReleased: 1991,
            system: 'SNES'
        })
        marioKart.infoList.push(marioKartInfo)

        fahadZakir.Gifts.push(streetFighter, marioKart)

        return fahadZakir.save()
    }).then(() => {
        return User.create({
            username: 'musa10',
            email: 'abumusa1981@hotmail.com',
            firstName: 'Musa',
            lastName: 'Zakir',
            photoUrl: 'https://i.imgur.com/zedHEOI.png'
        })
    }).then((musa) => {
        const streetsOfRage = new Gift({
            title: 'Streets of Rage',
            GiftLink: 'http://emulator.online/genesis/streets-of-rage/'
        })

        const starFox = new Gift({
            title: 'Star Fox',
            GiftLink: 'http://emulator.online/snes/star-fox/'
        })

        musa.gifts.push(streetsOfRage, starFox)

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