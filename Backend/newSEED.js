const mongoose = require('mongoose');
const productmodel = require('./models/productmodel');
require('./config/mongoooseConnection'); // DB connection file

const { ObjectId } = mongoose.Types;

const itemsArray = [
  {
    _id: new ObjectId('68861cab6925ea010cdcca7c'),
    title: 'Apple Watch Ultra 2'
  },
  {
    _id: new ObjectId('68861cab6925ea010cdcca7d'),
    title: 'Samsung Galaxy Watch6 Classic'
  },
  {
    _id: new ObjectId('68861cab6925ea010cdcca6d'),
    title: 'iPhone 15 Pro'
  },
  {
    _id: new ObjectId('68861cab6925ea010cdcca6e'),
    title: 'Samsung Galaxy S24 Ultra'
  }
]













const imageArray = [
    { title: 'Apple Watch Ultra 2', newurl: "https://pngimages.com/images/high/yellow-smartwatch-weather-display-qucjiumwd6rxwph4.webp" },
    { title: 'Samsung Galaxy Watch6 Classic', newurl: "https://pngimages.com/images/high/modern-smartwatchwith-milanese-loop-band-5gwt0f6aynzwiuoz.webp" },
    { title: 'iPhone 15 Pro', newurl: "https://purepng.com/public/uploads/large/smartphone-iphone-11-pro-max-silver-san.png" }
];

const updateWatchImages = async () => {
    try {
        for (const item of itemsArray) {
            const imgItem = imageArray.find(img => img.title === item.title);

            if (!imgItem) {
                console.log(`⚠️ No image found for: ${item.title}`);
                continue;
            }

            const updated = await productmodel.findOneAndUpdate(
                { _id: item._id },
                { $set: { images: [imgItem.newurl] } },
                { new: true }
            );

            if (updated) {
                console.log(`✅ Updated: ${updated.title}`);
            } else {
                console.log(`❌ No product found with ID: ${item._id}`);
            }
        }
    } catch (err) {
        console.error("❌ Error updating products:", err.message);
    } finally {
        mongoose.disconnect();
    }
};

updateWatchImages();
