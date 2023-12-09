const Campground = require('../models/campground');
const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./seedHelpers');
mongoose.connect('mongodb://localhost:27017/yelp-camp',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        console.log('mongo connected!');
    })
    .catch((err) => {
        console.log('mongo error!', err);
    });

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            author: '629a128357fb737b1115e933',
            geometry:
            {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/aanand/image/upload/v1654583100/YelpCamp/rrezcvsm6zjodpzpaedk.jpg',
                    filename: 'YelpCamp/rrezcvsm6zjodpzpaedk'
                },
                {
                    url: 'https://res.cloudinary.com/aanand/image/upload/v1654583100/YelpCamp/qoheapjtfgtpjupuzspt.jpg',
                    filename: 'YelpCamp/qoheapjtfgtpjupuzspt'
                }
            ]

            ,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati consectetur dolores aspernatur, accusantium est velit atque facere, voluptas eaque et, repudiandae optio harum eius quasi dolore officiis. Soluta, voluptatum expedita?",
            price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
    console.log('seeded');
})