const mongoose = require('mongoose');
const productmodel = require('./models/productmodel'); 
require('./config/mongoooseConnection'); // Make sure this connects DB correctly

const { ObjectId } = mongoose.Types;

const itemsArray = [
    { _id: new ObjectId('6884db917d071b42449e310a'), title: 'Apple Watch Ultra 2' },
    { _id: new ObjectId('6884db917d071b42449e310b'), title: 'Samsung Galaxy Watch6 Classic' },
    { _id: new ObjectId('6884db917d071b42449e30fb'), title: 'iPhone 15 Pro' },
    { _id: new ObjectId('6884db917d071b42449e30fc'), title: 'Samsung Galaxy S24 Ultra' }
];

const imageArray = [
    { title: 'Apple Watch Ultra 2', newurl: "https://pngimages.com/images/high/yellow-smartwatch-weather-display-qucjiumwd6rxwph4.webp" },
    { title: 'Samsung Galaxy Watch6 Classic', newurl: "https://pngimages.com/images/high/modern-smartwatchwith-milanese-loop-band-5gwt0f6aynzwiuoz.webp" },
    { title: 'iPhone 15 Pro', newurl: "https://purepng.com/public/uploads/large/smartphone-iphone-11-pro-max-silver-san.png" }
];

const updateWatchImages = async () => {
    try {
        for (const item of itemsArray) {
            const imgItem = imageArray.find(img => img.title === item.title);
            if (imgItem) {
                const updated = await productmodel.findOneAndUpdate(
                    { _id: item._id },
                    { $set: { images: [imgItem.newurl] } }, // assuming "images" is an array
                    { new: true }
                );
                console.log(`✅ Updated: ${updated.title}`);
            } else {
                console.log(`⚠️ No image found for: ${item.title}`);
            }
        }
    } catch (err) {
        console.error("❌ Error updating", err);
    }
};

updateWatchImages();
