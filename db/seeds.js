require('dotenv').config()
const User = require('../db/models/User')
const Gift = require('../db/models/Gift')

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
            giftName: 'Nintendo Switch',
            price: 200,
            for: "Mom",
            photoUrl: 'https://i.imgur.com/0yDZcCV.jpg'
        })

        //nintendoSwitchGift is a new gift with ALL the properties from the GiftSchema
        // the name we set, the other two are there but empty until we add stuff to them

        //This is an info not connected to anything else

        const iphoneX = new Gift({
            giftName: 'Iphone X',
            price: 600,
            for: dad,
            photoUrl: 'https://i.imgur.com/0yDZcCV.jpg'
        })

        fahadZakir.gifts.push(nintendoSwitchGift, iphoneX)

        return fahadZakir.save()
        //.save is built into mongoose for saving everything
        //.then is a promise so the 1st return is a promise

    }).then(() => {
        //has no return because the function before it just saved fahadZakir therefore empty parems
        return User.create({
            firstName: 'Musa',
            lastName: 'Zakir',
            email: 'abumusa1981@hotmail.com',
            photoUrl: 'https://i.imgur.com/zedHEOI.png'
        })

    }).then((musa) => {
        // musa points to the user from the then function before that we created
        const samsungHd = new Gift({
          giftName: "Samsung",
          price: 600,
          for: bro,
          photoUrl: "https://i.imgur.com/0yDZcCV.jpg"
        });

        const macbookPro = new Gift({
          giftName: "MacbookPro",
          price: 900,
          for: wife,
          photoUrl: "https://i.imgur.com/0yDZcCV.jpg"
        });

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