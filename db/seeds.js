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

        //This is a gift all by itself
        const nintendoSwitchGift = new Gift({
            giftName: 'Nintendo Switch'
        })

        //nintendoSwitchGift is a new gift with ALL the properties from the GiftSchema
        // the name we set, the other two are there but empty until we add stuff to them

        //This is an info not connected to anything else
        const nintendoSwitchInfo = new Info({
            giftName: 'Nintendo Switch',
            for: 'Dawud',
            price: 300
        })

        nintendoSwitchGift.infoList.push(nintendoSwitchInfo)
        //nintendSwitch is a gift
        //infoList is a list inside the nintendoSwitch
        // so we have a nintendSwitch with infoList or nintendSwitch.infoList
        // then we have an info nintendoSwitchInfo
        // and we want the info to be inside the switch
        // so we push the info into the infoList in the switch
        // which is how we get the above line
        // push is just a function to push something into a list or array
        // nintendoSwitchInfo is pushed into the info list array.

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
        //.save is built into mongoose for saving everything
        //.then is a promise so the 1st return is a promise

    }).then(() => {
        //has no return because the function before it just saved fahadZakir therefore empty parens
        return User.create({
            firstName: 'Musa',
            lastName: 'Zakir',
            email: 'abumusa1981@hotmail.com',
            photoUrl: 'https://i.imgur.com/zedHEOI.png'
        })
    }).then((musa) => {
        // musa points to the user from the then function before that we created
        const samsungHd = new Gift({
            title: 'Samasung HD'
        })

        const macbookPro = new Gift({
            title: 'Macbook Pro'
        })

        musa.gifts.push(samsungHd, macbookPro)
        // musa's function is done differently but will do the exact same as the above fahad function
        // they are two different way's of doing it
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