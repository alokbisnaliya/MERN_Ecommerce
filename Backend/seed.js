const mongoose = require('mongoose');
const productmodel = require('./models/productmodel');
const DB = require('./config/mongoooseConnection');




const Products = [
  // Phones (15 items)
  {
    "title": "iPhone 15 Pro",
    "description": "Latest iPhone with A17 Pro chip and titanium design.",
    "price": 1299,
    "category": "phones",
    "stock": 30,
    "images": ["https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1693009278906"]
  },
  {
    "title": "Samsung Galaxy S24 Ultra",
    "description": "Premium Android phone with 200MP camera and S Pen.",
    "price": 1499,
    "category": "phones",
    "stock": 25,
    "images": ["https://cdn.beebom.com/mobile/samsung-galaxy-s24-ultra/samsung-galaxy-s24-ultra-front-back-7.png"]
  },
  {
    "title": "Google Pixel 8 Pro",
    "description": "AI-powered phone with best-in-class camera software.",
    "price": 899,
    "category": "phones",
    "stock": 35,
    "images": ["https://www.dxomark.com/wp-content/uploads/medias/post-157488/Google-Pixel-8-Pro-2-featured-image-packshot-review-Recovered.jpg"]
  },
  {
    "title": "OnePlus 12",
    "description": "Flagship killer with Snapdragon 8 Gen 3 and 120Hz display.",
    "price": 799,
    "category": "phones",
    "stock": 40,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2DlT7FrzeIlxNn6c7Q7omwrO6EgG67qfJaQ&s"]
  },
  {
    "title": "Xiaomi 14 Pro",
    "description": "Powerful Chinese flagship with Leica camera system.",
    "price": 999,
    "category": "phones",
    "stock": 20,
    "images": ["https://i05.appmifile.com/907_item_uk/06/01/2025/91a114750a1ce3d3bb555301de665b8c.png"]
  },
  {
    "title": "Nothing Phone (2)",
    "description": "Unique transparent design with Glyph interface.",
    "price": 699,
    "category": "phones",
    "stock": 45,
    "images": ["https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1708677619/Croma%20Assets/Communication/Mobiles/Images/301920_0_thffrs.png?tr=w-600"]
  },
  {
    "title": "ASUS ROG Phone 7",
    "description": "Gaming phone with 165Hz AMOLED and AirTrigger controls.",
    "price": 999,
    "category": "phones",
    "stock": 15,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQA4yG5o8sLrchWFous_ZISW1-Z69wDQhTCbg&s"]
  },
  {
    "title": "Motorola Edge 40 Pro",
    "description": "Sleek design with 144Hz display and 125W charging.",
    "price": 799,
    "category": "phones",
    "stock": 30,
    "images": ["https://rukminim2.flixcart.com/image/850/1000/xif0q/mobile/e/s/s/edge-40-neo-payj0005in-motorola-original-imagtkehwcgvttfb.jpeg?q=90&crop=false"]
  },
  {
    "title": "Oppo Find X6 Pro",
    "description": "Innovative camera phone with Hasselblad partnership.",
    "price": 1199,
    "category": "phones",
    "stock": 18,
    "images": ["https://s.alicdn.com/@sc04/kf/H1fcaf33a47ae4349b97d4ad61d2fde209.jpg_720x720q50.jpg"]
  },
  {
    "title": "Vivo X90 Pro+",
    "description": "Photography-focused phone with 1-inch sensor.",
    "price": 1099,
    "category": "phones",
    "stock": 22,
    "images": ["https://fdn.gsmarena.com/imgroot/news/22/11/vivo-x90-pro-plus-official/inline/-1200/gsmarena_001.jpg"]
  },
  {
    "title": "Sony Xperia 1 V",
    "description": "4K OLED display with professional camera controls.",
    "price": 1399,
    "category": "phones",
    "stock": 12,
    "images": ["https://m.media-amazon.com/images/S/aplus-media-library-service-media/b712fb53-0d1d-4c61-95df-23466918fda0.__CR0,0,1200,900_PT0_SX600_V1___.jpg"]
  },
  {
    "title": "Honor Magic5 Pro",
    "description": "Innovative eye-tracking and AI features.",
    "price": 899,
    "category": "phones",
    "stock": 28,
    "images": ["https://akm-img-a-in.tosshub.com/indiatoday/images/story/202302/honor_magic_5_pro-sixteen_nine.jpg?VersionId=7RYEXMd_.LVaFq8oMzWBSoEklh3ADyep&size=690:388"]
  },
  {
    "title": "Realme GT 3",
    "description": "Value flagship with 240W fast charging.",
    "price": 599,
    "category": "phones",
    "stock": 50,
    "images": ["https://media.assettype.com/thequint%2F2023-02%2F335d9f92-393a-40ad-8d76-b9d856485236%2FRealme_GT_3_1.webp"]
  },
  {
    "title": "ZTE Nubia Z50 Ultra",
    "description": "Under-display camera with no notch or punch-hole.",
    "price": 799,
    "category": "phones",
    "stock": 20,
    "images": ["https://fdn.gsmarena.com/imgroot/news/23/03/zte-nubia-z50-ultra-ofic/inline/-1200/gsmarena_003.jpg"]
  },
  {
    "title": "Fairphone 5",
    "description": "Sustainable and repairable ethical smartphone.",
    "price": 699,
    "category": "phones",
    "stock": 35,
    "images": ["https://www.triveniworld.com/cdn/shop/products/fairphone-5-5g-smartphone-256-gb-16-4-cm-6-46-inch-used-triveni-world-2.jpg?v=1736264928"]
  },

  // Watches (15 items)
  {
    "title": "Apple Watch Ultra 2",
    "description": "Rugged smartwatch with advanced fitness tracking.",
    "price": 799,
    "category": "watches",
    "stock": 25,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8geLZOJ_cHOUgMUmLts_m6ODqlAqauyLjuw&s"]
  },
  {
    "title": "Samsung Galaxy Watch6 Classic",
    "description": "Premium Android smartwatch with rotating bezel.",
    "price": 429,
    "category": "watches",
    "stock": 30,
    "images": ["https://images.samsung.com/is/image/samsung/p6pim/us/2307/gallery/us-galaxy-watch6-classic-sm-r960nzsaxar-539393357"]
  },
  {
    "title": "Garmin Fenix 7X Pro",
    "description": "Outdoor adventure watch with solar charging.",
    "price": 899,
    "category": "watches",
    "stock": 15,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyjMU99YBuaGDnRuaJEMo1zDrgLyoMgI44Eg&s"]
  },
  {
    "title": "Rolex Daytona",
    "description": "Iconic luxury chronograph watch.",
    "price": 13500,
    "category": "watches",
    "stock": 3,
    "images": ["https://img.chrono24.com/images/uhren/34072152-25v76n97g04o8afsczwspynn-ExtraLarge.jpg"]
  },
  {
    "title": "Omega Seamaster",
    "description": "James Bond's choice of dive watch.",
    "price": 5600,
    "category": "watches",
    "stock": 8,
    "images": ["https://blog.europeanwatch.com/blog/wp-content/uploads/2023/08/HERO-Omega-Seamaster-300-James-Bond-60th-Anniversary-210.30.42.03.002-scaled.jpg"]
  },
  {
    "title": "Tag Heuer Carrera",
    "description": "Classic racing-inspired chronograph.",
    "price": 4500,
    "category": "watches",
    "stock": 10,
    "images": ["https://cdn1.ethoswatches.com/media/catalog/product/cache/6e5de5bc3d185d8179cdc7258143f41a/t/a/tag-heuer-carrera-cbs2211-fc6545-multiple-6.jpg","https://media.fashionnetwork.com/cdn-cgi/image/fit=contain,width=1000,height=1000,format=auto/m/ee60/c822/d2a2/d874/e005/c0ca/55ca/94a7/bc30/e972/e972.jpg"]
  },
  {
    "title": "Casio G-Shock MR-G",
    "description": "Premium titanium G-Shock with Bluetooth.",
    "price": 2500,
    "category": "watches",
    "stock": 12,
    "images": ["https://img.chrono24.com/images/uhren/37319978-hwg1kn1rw2l0hef765qno9gg-ExtraLarge.jpg"]
  },
  {
    "title": "Breitling Navitimer",
    "description": "Aviation watch with slide rule bezel.",
    "price": 8500,
    "category": "watches",
    "stock": 5,
    "images": ["https://www.pedroluisolivaresjoyero.com/media/catalog/product/cache/55ad6519381e93cd8315fe465564ee1e/a/3/a32310251b1a1-breitling-navitimer-automatic-gmt.jpg"]
  },
  {
    "title": "Tissot PRX",
    "description": "Affordable luxury with integrated bracelet.",
    "price": 675,
    "category": "watches",
    "stock": 40,
    "images": ["https://cdn4.ethoswatches.com/the-watch-guide/wp-content/uploads/2022/03/Tissot-PRX-review-Powermatic-80-Automatic-steel-sport-watch-iconic-archetypal-accessible-luxury-value-money-SP-3.jpg"]
  },
  {
    "title": "Seiko Prospex",
    "description": "Professional dive watch with Spring Drive.",
    "price": 3500,
    "category": "watches",
    "stock": 15,
    "images": ["https://seikowatches.co.in/cdn/shop/products/SPB381J1_1200_x1200_SNS_1_2048x.png?v=1685772749"]
  },
  {
    "title": "Cartier Tank",
    "description": "Elegant rectangular dress watch.",
    "price": 3200,
    "category": "watches",
    "stock": 7,
    "images": ["https://m.media-amazon.com/images/I/81v8fSPjA8L._AC_UF1000,1000_QL80_.jpg"]
  },
  {
    "title": "IWC Portugieser",
    "description": "Sophisticated watch with clean dial design.",
    "price": 7900,
    "category": "watches",
    "stock": 6,
    "images": ["https://images.squarespace-cdn.com/content/v1/5bd09b80a9ab954023c64116/1601429283068-IZF9VOBB6K512G0ZWD1Y/iwc+portugieser+chronograph"]
  },
  {
    "title": "Hublot Big Bang",
    "description": "Modern luxury watch with bold design.",
    "price": 12500,
    "category": "watches",
    "stock": 4,
    "images": ["https://www.kamalwatch.com/cdn/shop/files/big-bang-unico-titanium-ceramic-44-mm-soldier-shot_1.png?v=1738569372"]
  },
  {
    "title": "Patek Philippe Nautilus",
    "description": "Ultra-luxury sports watch.",
    "price": 45000,
    "category": "watches",
    "stock": 2,
    "images": ["https://images-cdn.ubuy.co.in/638765cd7b7720340d659835-patek-philippe-nautilus-mens-watch.jpg"]
  },
  {
    "title": "Fossil Gen 6",
    "description": "Affordable Wear OS smartwatch.",
    "price": 299,
    "category": "watches",
    "stock": 50,
    "images": ["https://img.tatacliq.com/images/i11/658Wx734H/MP000000017667506_658Wx734H_202305242012051.jpeg"]
  },

  // Fruits (15 items)
  {
    "title": "Organic Fuji Apples",
    "description": "Sweet and crisp apples from organic farms.",
    "price": 4.99,
    "category": "fruits",
    "stock": 150,
    "images": ["https://image.made-in-china.com/202f0j00FjfhslUcCaRN/Delicious-Red-FUJI-Apples-Fresh-Organic-Chinese-Apples-Direct-Freshness.jpg"]
  },
  {
    "title": "Banana Bunch",
    "description": "Perfectly ripe bananas, great for smoothies.",
    "price": 2.99,
    "category": "fruits",
    "stock": 200,
    "images": ["https://m.media-amazon.com/images/I/61fZ+YAYGaL._AC_UF1000,1000_QL80_.jpg"]
  },
  {
    "title": "Seedless Watermelon",
    "description": "Juicy summer watermelon without seeds.",
    "price": 7.99,
    "category": "fruits",
    "stock": 80,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRCo9S85JUSk_TJc3pNQxVor2Zeytga8s97g&s"]
  },
  {
    "title": "California Strawberries",
    "description": "Sweet and fragrant strawberries.",
    "price": 5.99,
    "category": "fruits",
    "stock": 120,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ18otY_n2Eb_q5mp_59TVCytseX7V7rI5kpg&s"]
  },
  {
    "title": "Blueberries Pack",
    "description": "Antioxidant-rich blueberries.",
    "price": 4.49,
    "category": "fruits",
    "stock": 90,
    "images": ["https://5.imimg.com/data5/SELLER/Default/2021/12/HD/YA/IL/47860490/blueberries-jumbo-size.jpeg"]
  },
  {
    "title": "Red Grapes",
    "description": "Sweet seedless red grapes.",
    "price": 3.99,
    "category": "fruits",
    "stock": 110,
    "images": ["https://m.media-amazon.com/images/I/51UdTY+PEpL._AC_UF1000,1000_QL80_.jpg"]
  },
  {
    "title": "Pineapple",
    "description": "Tropical pineapple with golden flesh.",
    "price": 6.49,
    "category": "fruits",
    "stock": 60,
    "images": ["https://findfresh.in/attachments/shop_images/pineapple-500x500.webp"]
  },
  {
    "title": "Mangoes",
    "description": "Sweet and juicy Alphonso mangoes.",
    "price": 8.99,
    "category": "fruits",
    "stock": 70,
    "images": ["https://ichef.bbci.co.uk/images/ic/1920x1080/p06hk0h6.jpg"]
  },
  {
    "title": "Kiwi Fruit",
    "description": "Vitamin C packed kiwis.",
    "price": 3.49,
    "category": "fruits",
    "stock": 85,
    "images": ["https://www.sakraworldhospital.com/assets/spl_splimgs/benefits-kiwi-of-fruit.webp"]
  },
  {
    "title": "Peaches",
    "description": "Juicy summer peaches.",
    "price": 4.99,
    "category": "fruits",
    "stock": 75,
    "images": ["https://www.tasteofhome.com/wp-content/uploads/2019/06/peaches-shutterstock_297863489-1.jpg"]
  },
  {
    "title": "Plums",
    "description": "Sweet and tart plums.",
    "price": 3.99,
    "category": "fruits",
    "stock": 65,
    "images": ["https://static.wixstatic.com/media/943d2f_89660ce09524469bbf417c617496e8fc~mv2.jpg/v1/fill/w_980,h_654,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/943d2f_89660ce09524469bbf417c617496e8fc~mv2.jpg"]
  },
  {
    "title": "Pears",
    "description": "Buttery and sweet pears.",
    "price": 4.49,
    "category": "fruits",
    "stock": 80,
    "images": ["https://www.stylecraze.com/wp-content/uploads/2013/07/Benefits-Of-Pears_1200px.jpg.webp"]
  },
  {
    "title": "Cherries",
    "description": "Dark sweet cherries.",
    "price": 8.99,
    "category": "fruits",
    "stock": 50,
    "images": ["https://www.usatoday.com/gcdn/authoring/authoring-images/2024/07/17/PLSJ/74447069007-240717-farmers-market-003-a.JPG?crop=1200,1599,x600,y0"]
  },
  {
    "title": "Raspberries",
    "description": "Delicate and fragrant raspberries.",
    "price": 5.49,
    "category": "fruits",
    "stock": 40,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXmiGufgOpdvfTf32abkKvR7h1MHDIHyTbfQ&s"]
  },
  {
    "title": "Blackberries",
    "description": "Sweet and tart blackberries.",
    "price": 4.99,
    "category": "fruits",
    "stock": 45,
    "images": ["https://www.thespruce.com/thmb/C9AYs-5PAvShdDzSseLF9BRp6Hk=/2500x1985/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-91733539-5c902c4fc9e77c0001ff0b5c.jpg"]
  },

  // Laptops (15 items)
  {
    "title": "MacBook Pro 16-inch M3 Max",
    "description": "Professional laptop with M3 Max chip and Liquid Retina XDR display.",
    "price": 3499,
    "category": "laptops",
    "stock": 15,
    "images": ["https://store.storeimages.cdn-apple.com/1/as-images.apple.com/is/macbook-pro-og-202410?wid=1200&hei=630&fmt=jpeg&qlt=90&.v=1728658184478"]
  },
  {
    "title": "Dell XPS 15",
    "description": "Premium Windows laptop with 4K OLED touchscreen.",
    "price": 2299,
    "category": "laptops",
    "stock": 20,
    "images": ["https://cdn.arstechnica.net/wp-content/uploads/2023/11/IMG_1415.jpeg"]
  },
  {
    "title": "HP Spectre x360",
    "description": "Convertible laptop with 13.5-inch 3K2K OLED display.",
    "price": 1799,
    "category": "laptops",
    "stock": 25,
    "images": ["https://img-cdn.tnwcdn.com/image?fit=1280%2C720&url=https%3A%2F%2Fcdn0.tnwcdn.com%2Fwp-content%2Fblogs.dir%2F1%2Ffiles%2F2021%2F08%2FHP-Spectre-x360-14-1-of-7.jpg&signature=b273734ba382a58d403431a960fd1708"]
  },
  {
    "title": "Lenovo ThinkPad X1 Carbon",
    "description": "Business laptop with legendary ThinkPad keyboard.",
    "price": 1899,
    "category": "laptops",
    "stock": 30,
    "images": ["https://www.notebookcheck.net/typo3temp/_processed_/1/5/csm_case1_02_fd517f2918.jpg"]
  },
  {
    "title": "ASUS ROG Zephyrus G14",
    "description": "Powerful gaming laptop with AMD Ryzen 9 and RTX 4090.",
    "price": 2499,
    "category": "laptops",
    "stock": 12,
    "images": ["https://dlcdnwebimgs.asus.com/gain/D366E1B6-C6E2-41B1-BF53-EF909B21FF09"]
  },
  {
    "title": "Microsoft Surface Laptop Studio",
    "description": "Innovative convertible with dynamic woven hinge.",
    "price": 2099,
    "category": "laptops",
    "stock": 18,
    "images": ["https://www.fredzone.org/wp-content/uploads/2023/02/MICROSOFT-SURFACE-LAPTOP-STUDIO-2021-Credit-Microsoft.png"]
  },
  {
    "title": "Razer Blade 15",
    "description": "Sleek gaming laptop with CNC aluminum chassis.",
    "price": 2699,
    "category": "laptops",
    "stock": 10,
    "images": ["https://www.notebookcheck.org/fileadmin/Notebooks/Razer/Blade_15_RTX_2080_Super_Max-Q/4zu3_Razer_Blade_15_Advanced_Model_2020.jpg"]
  },
  {
    "title": "LG Gram 17",
    "description": "Ultralight 17-inch laptop weighing just 2.98 lbs.",
    "price": 1699,
    "category": "laptops",
    "stock": 22,
    "images": ["https://www.lg.com/us/images/laptops/md08000395/gallery/medium01.jpg"]
  },
  {
    "title": "Acer Swift X",
    "description": "Thin-and-light with RTX graphics for creators.",
    "price": 1299,
    "category": "laptops",
    "stock": 35,
    "images": ["https://cdn.uc.assets.prezly.com/a3893eff-7f9f-4bd2-86d9-fd850843f09b/Swift-X-SFX14-41G_03.jpg"]
  },
  {
    "title": "MSI Creator Z16",
    "description": "Content creation laptop with QHD+ touch display.",
    "price": 2399,
    "category": "laptops",
    "stock": 8,
    "images": ["https://asset.msi.com/resize/image/global/product/product_168974322849bf7421533ef12b1b7cee3e84d780df.png62405b38c58fe0f07fcef2367d8a9ba1/600.png"]
  },
  {
    "title": "Framework Laptop 16",
    "description": "Modular and repairable laptop with upgradeable ports.",
    "price": 1699,
    "category": "laptops",
    "stock": 40,
    "images": ["https://images.prismic.io/frameworkmarketplace/62fa4131-82b2-4cb7-b75f-e1fd63c790a7_Display+-+Blog+Post+%281%29.jpg?auto=compress,format"]
  },
  {
    "title": "Alienware x16",
    "description": "Premium gaming laptop with per-key RGB lighting.",
    "price": 2999,
    "category": "laptops",
    "stock": 6,
    "images": ["https://laptopmedia.com/wp-content/uploads/2023/05/AlienwareX16R1-1.jpg"]
  },
  {
    "title": "Samsung Galaxy Book3 Ultra",
    "description": "OLED laptop with Intel Core i9 and RTX 4070.",
    "price": 2399,
    "category": "laptops",
    "stock": 15,
    "images": ["https://images.samsung.com/is/image/samsung/p6pim/hk_en/feature/164350153/hk-en-feature-galaxy-book3-ultra-16-inch-np960-535404594?$FB_TYPE_A_MO_JPG$"]
  },
  {
    "title": "HP Envy 16",
    "description": "Creator laptop with IMAX Enhanced display.",
    "price": 1899,
    "category": "laptops",
    "stock": 20,
    "images": ["https://www.notebookcheck.net/fileadmin/_processed_/9/7/csm_HP_Envy_16_4_0b063ce8f4.jpg"]
  },
  {
    "title": "Lenovo Yoga 9i",
    "description": "Premium convertible with rotating soundbar hinge.",
    "price": 1599,
    "category": "laptops",
    "stock": 25,
    "images": ["https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6533/6533949cv11d.jpg"]
  },

  // Clothing (15 items)
  {
    "title": "Men's Slim Fit Suit",
    "description": "Modern slim fit suit with premium wool fabric.",
    "price": 299,
    "category": "clothing",
    "stock": 50,
    "images": ["https://shop.mango.com/assets/rcs/pics/static/T8/fotos/S/87030587_56.jpg?imwidth=2048&imdensity=1&ts=1733304861520"]
  },
  {
    "title": "Women's Cashmere Sweater",
    "description": "Luxurious 100% cashmere crewneck sweater.",
    "price": 189,
    "category": "clothing",
    "stock": 60,
    "images": ["https://shopravella.com/cdn/shop/products/Camilla-Acqua_740x.jpg?v=1740870785"]
  },
  {
    "title": "Men's Leather Jacket",
    "description": "Genuine lambskin leather motorcycle jacket.",
    "price": 499,
    "category": "clothing",
    "stock": 30,
    "images": ["https://i.etsystatic.com/32436208/r/il/09c11b/6286679243/il_fullxfull.6286679243_4l8c.jpg"]
  },
  {
    "title": "Women's Silk Blouse",
    "description": "Elegant silk blouse with French cuffs.",
    "price": 129,
    "category": "clothing",
    "stock": 75,
    "images": ["https://www.fabvoguestudio.com/cdn/shop/files/pr-cr-0-ta09559c-110-winter-cool-colour-freezy-leaves-digital-printed-fabric-silk-crepe-1.jpg?v=1687255789&width=1080"]
  },
  {
    "title": "Men's Denim Jeans",
    "description": "Classic straight fit jeans with stretch.",
    "price": 89,
    "category": "clothing",
    "stock": 100,
    "images": ["https://assets.ajio.com/medias/sys_master/root/20230925/Dl2f/6511bcd0ddf77915190022e6/-473Wx593H-469537897-indigo-MODEL.jpg"]
  },
  {
    "title": "Women's Wool Coat",
    "description": "Warm double-breasted wool coat.",
    "price": 249,
    "category": "clothing",
    "stock": 40,
    "images": ["https://m.media-amazon.com/images/I/71WIOhR6JVL._AC_UF1000,1000_QL80_.jpg"]
  },
  {
    "title": "Men's Oxford Shirt",
    "description": "Classic non-iron Oxford button-down shirt.",
    "price": 59,
    "category": "clothing",
    "stock": 120,
    "images": ["https://image.uniqlo.com/UQ/ST3/in/imagesgoods/450259/item/ingoods_50_450259_3x4.jpg?width=494"]
  },
  {
    "title": "Women's Linen Dress",
    "description": "Breathable linen midi dress for summer.",
    "price": 99,
    "category": "clothing",
    "stock": 65,
    "images": ["https://pinkfort.co/cdn/shop/files/MGDR1174PESS_1_800x.jpg?v=1689852497"]
  },
  {
    "title": "Men's Performance Polo",
    "description": "Moisture-wicking golf polo with UV protection.",
    "price": 49,
    "category": "clothing",
    "stock": 150,
    "images": ["https://m.media-amazon.com/images/I/71HpJMjMs2L._AC_UY1100_.jpg"]
  },
  {
    "title": "Women's Yoga Leggings",
    "description": "High-waisted leggings with pocket.",
    "price": 69,
    "category": "clothing",
    "stock": 200,
    "images": ["https://www.jockey.in/cdn/shop/products/AA01_WINPR_0103_S223_JKY_1.webp?v=1700036094&width=560"]
  },
  {
    "title": "Men's Winter Parka",
    "description": "Waterproof down parka for extreme cold.",
    "price": 349,
    "category": "clothing",
    "stock": 25,
    "images": ["https://m.media-amazon.com/images/I/61GtAF5FncL._SX679_.jpg"]
  },
  {
    "title": "Women's Trench Coat",
    "description": "Classic belted trench coat.",
    "price": 199,
    "category": "clothing",
    "stock": 35,
    "images": ["https://m.media-amazon.com/images/I/31mpfAnVPBL.jpg"]
  },
  {
    "title": "Men's Chino Pants",
    "description": "Versatile slim-fit chinos.",
    "price": 79,
    "category": "clothing",
    "stock": 90,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV-VPJhoYRdvxQBOWz7fILYvTacsERZnrzXg&s"]
  },
  {
    "title": "Women's Cashmere Scarf",
    "description": "Luxuriously soft cashmere scarf.",
    "price": 129,
    "category": "clothing",
    "stock": 80,
    "images": ["https://joshuaellis.com/cdn/shop/files/UA-WM0NT51401-S10M01-lifestyle-web_520x.jpg?v=1681297540"]
  },
  {
    "title": "Men's Wool Sweater",
    "description": "Cable-knit merino wool sweater.",
    "price": 149,
    "category": "clothing",
    "stock": 55,
    "images": ["https://cdn11.bigcommerce.com/s-s56em6w72d/images/stencil/700x900/products/3019/18647/A823lead__80612__88268.1532867592.jpg?c=2"]
  },

  // Electronics (15 items)
  {
    "title": "Sony WH-1000XM5 Headphones",
    "description": "Industry-leading noise cancellation with 30-hour battery.",
    "price": 399,
    "category": "electronics",
    "stock": 40,
    "images": ["https://www.sony.co.in/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF"]
  },
  {
    "title": "Apple AirPods Pro (2nd Gen)",
    "description": "Active Noise Cancellation with spatial audio.",
    "price": 249,
    "category": "electronics",
    "stock": 60,
    "images": ["https://www.apple.com/v/airpods-pro/m/images/meta/og__eui2mpgzwyaa_overview.png"]
  },
  {
    "title": "Bose QuietComfort 45",
    "description": "Premium noise-cancelling over-ear headphones.",
    "price": 329,
    "category": "electronics",
    "stock": 35,
    "images": ["https://m.media-amazon.com/images/I/61BN3k+WVaL._AC_UF350,350_QL80_.jpg"]
  },
  {
    "title": "Samsung 85\" QLED 4K Smart TV",
    "description": "Crystal clear 4K resolution with Quantum HDR.",
    "price": 2199,
    "category": "electronics",
    "stock": 12,
    "images": ["https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1747657126/Croma%20Assets/Entertainment/Television/Images/305625_0_dchvzu.png?tr=w-600"]
  },
  {
    "title": "LG OLED C3 Series 77\" TV",
    "description": "Perfect black with infinite contrast ratio.",
    "price": 3499,
    "category": "electronics",
    "stock": 8,
    "images": ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIU5uILStcODZPSlQIPRobhmGkVO7aOv0DdQ&s"]
  },
  {
    "title": "PlayStation 5 Console",
    "description": "Next-gen gaming with ultra-high speed SSD.",
    "price": 499,
    "category": "electronics",
    "stock": 25,
    "images": ["https://m.media-amazon.com/images/I/51ljnEaW0pL.jpg"]
  },
  {
    "title": "Xbox Series X",
    "description": "4K gaming at 120 FPS with quick resume.",
    "price": 499,
    "category": "electronics",
    "stock": 30,
    "images": ["https://media.wired.com/photos/6189e5b0748096a2f3317edd/master/pass/Gear-Xbox-vs-PS5-1230432282.jpg"]
  },
  {
    "title": "Nintendo Switch OLED",
    "description": "Handheld and dockable gaming with vibrant OLED screen.",
    "price": 349,
    "category": "electronics",
    "stock": 45,
    "images": ["https://m.media-amazon.com/images/I/61nqNujSF2L.jpg"]
  },
  {
    "title": "DJI Mavic 3 Pro Drone",
    "description": "Professional aerial photography drone with Hasselblad camera.",
    "price": 2199,
    "category": "electronics",
    "stock": 10,
    "images": ["https://hobitech.in/wp-content/uploads/2023/10/dji-mavic3-pro-rc-combo-img-2.jpg"]
  }]

  // function productBycategory(){
  //    let items = []
  //    Products.forEach((item)=>{
  //       if(item.category === "fruits"){
  //         items.push(item)
  //         console.log(item)
  //       }
  //    })
  //    return items;
  // }

  // console.log(productBycategory());  



const insertData = async () => {
  try {

    // Connect to MongoDB 

    // Insert the products into the database
    await productmodel.insertMany(Products);
    console.log("Products added successfully!");

    // Disconnect after inserting
    mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting products:", error);
    mongoose.disconnect(); // Ensure DB disconnect in case of error
  }
};


const deletedata = async () => {
  await productmodel.deleteMany();
  console.log("deleted successfully")
};





deletedata();
setTimeout(() => {
   insertData();
}, (5000));




// const fetchFakedata = async()=>{
   
//   let res = await fetch('https://fakestoreapi.in/api/products');
//   let data = await res.json();
//   if(res.ok){
//      return data
   
//   }else{
//     console.log("cant get data")
//   }

// }

// let allldata = fetchFakedata();
