const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];



const seedDB = async () => {
    await Campground.deleteMany({});
        for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;

        const camp = new Campground({
            author: '60fecccaddc13c3c38fd6b6c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit libero maiores id est ex animi eum eos explicabo expedita quisquam inventore, quaerat quis sit repudiandae placeat suscipit rerum nihil ipsum! ',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dasdains3/image/upload/v1627836440/YelpCamp/j5numncrbzqjzrfp915f.jpg',
                    filename: 'YelpCamp/j5numncrbzqjzrfp915f'
                  },
                  {
                    url: 'https://res.cloudinary.com/dasdains3/image/upload/v1627836443/YelpCamp/ebpbajptfobmedbbob0x.jpg',
                    filename: 'YelpCamp/ebpbajptfobmedbbob0x'
                  }

            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});

