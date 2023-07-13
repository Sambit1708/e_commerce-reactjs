class Products {
    categories = [
        {title:'Grocery', imgPath: require('../assets/images/Category/grocery.png')},
        {title:'Mobiles', imgPath: require('../assets/images/Category/mobiles.png')},
        {title:'Fashion', imgPath: require('../assets/images/Category/fashion.png')},
        {title:'Electronics', imgPath: require('../assets/images/Category/electronice.png')},
        {title:'Furniture', imgPath: require('../assets/images/Category/Furniture.png')},
        {title:'Toys', imgPath: require('../assets/images/Category/toys.png')},
        {title:'Two Wheelers', imgPath: require('../assets/images/Category/twowheeler.png')}
    ];
    electronics = [
        {title:'Headphones', imgPath: require('../assets/images/Electronics/RUNMUS_K8_headphone.png')},
        {title:'Best of Trimmers', imgPath: require('../assets/images/Electronics/PHILIPS BT3102_25.png')},
        {title:'Cameras', imgPath: require('../assets/images/Electronics/Canon_EOS_3000D.png')},
        {title:'Monitors', imgPath: require('../assets/images/Electronics/Samsung.png')},
        {title:'Electric Kettle', imgPath: require('../assets/images/Electronics/Kettle_Bottle.png')},
        {title:'Irons', imgPath: require('../assets/images/Electronics/Nova_Plus_Amaze_Iron.png')}
    ];
    toys = [
        {title:'House Buildings', imgPath: require('../assets/images/Toys/House_building.png')},
        {title:'Games', imgPath: require('../assets/images/Toys/toy_arrow.png')},
        {title:'Teddy Bears', imgPath: require('../assets/images/Toys/teddy.png')},
        {title:'Baybleds', imgPath: require('../assets/images/Toys/baybled.png')},
        {title:'Cars', imgPath: require('../assets/images/Toys/toy_car.png')},
        {title:'Transformers', imgPath: require('../assets/images/Toys/transform.png')}
    ];
    fashions = [
        {title:'Men t-shirt', imgPath: require('../assets/images/Fashions/t-shirt-1.png')},
        {title:'Men Shirt', imgPath: require('../assets/images/Fashions/shirt.png')},
        {title:'Women Dress', imgPath: require('../assets/images/Fashions/wDress.png')},
        {title:'Womwn Top', imgPath: require('../assets/images/Fashions/wTop.png')}
    ];

    Mobiles = [
        {   title:'APPLE iPhone 13 (Starlight, 128 GB)', 
            brand: 'Apple',
            rating: '4.7', 
            Price: '69,900', 
            discount:'12', 
            highlight: '128 GB ROM\n15.49 cm (6.1 inch) Super Retina XDR Display\n12MP + 12MP | 12MP Front Camera\nA15 Bionic Chip Processor', 
            description: 'iPhone 13. boasts an advanced dual-camera system that allows you to click mesmerising pictures with immaculate clarity. Furthermore, the lightning-fast A15 Bionic chip allows for seamless multitasking, elevating your performance to a new dimension. A big leap in battery life, a durable design, and a bright Super Retina XDR display facilitate boosting your user experience.',
            imgPath: require('../assets/images/Products/Mobile/iPhone13.png') 
        },
        {   title:`APPLE iPhone 14 Pro Max (Deep Purple, 128 GB)`, 
            brand: 'Apple',
            rating: `4.6`, 
            Price: `1,39,900`, 
            discount:`8`, 
            highlight: `8 GB RAM | 256 GB ROM\n17.02 cm (6.7 inch) Super Retina XDR Display\n48MP + 12MP + 12MP | 12MP Front Camera\nA16 Bionic Chip, 6 Core Processor Processor`, 
            description: `NA`, 
            imgPath: require('../assets/images/Products/Mobile/iPhone14.png') 
        },
        {   title:'realme GT NEO 3 (150W) (Sprint White, 256 GB)  (12 GB RAM)',
            brand: 'Realme',
            rating: '4.4', 
            Price: '45,999', 
            discount:'19', 
            highlight: '12 GB RAM | 256 GB ROM\n17.02 cm (6.7 inch) Full HD+ Display\n50MP + 8MP + 2MP | 16MP Front Camera\n4500 mAh Lithium Ion Battery\nMediatek Dimensity 8100 Processor', 
            description: `Unleash the suppressed gamer in you and enjoy a top-notch user interface with the Realme GT NEO 3 smartphone. This phone is designed in such a way that it attracts the onlookers and performs so well that you can’t keep it down for a minute. This phone features an exquisite Dimensity 8100 5G processor that facilitates a silky smooth operation and delivers elevated performance. Additionally, the 50 MP Wide-angle Triple Camera of this phone enables you to take stunning photos and videos that last long in your cherished memories. Furthermore, the monstrous 4500 mAh battery and 150 W UltraDart Charge technology powers your phone in a short period of time and backs you up for an extended time.`, 
            imgPath: require('../assets/images/Products/Mobile/realmeGtNeo3.png') 
        },
        {   title:'realme 11 Pro+ 5G (Oasis Green, 256 GB)  (8 GB RAM)',
            brand: 'Realme',
            rating: '4.3', 
            Price: '29,999', 
            discount:'6', 
            highlight: '8 GB RAM | 256 GB ROM\n17.02 cm (6.7 inch) Full HD+ Display\n200MP (OIS) + 8MP + 2MP | 32MP Front Camera\n5000 mAh Battery\nDimensity 7050 Processor', 
            description: `You can capture your memories using the 200 MO OIS SuperZoom camera featured in the realme 11 Pro+ 5G smartphone. The 120 Hz of curved vision display enables you with top-notch viewing experience. Equipped with a 100 W SUPERVOOC charger, this phone charges your phone in about 26 minutes. Powered by the Dimensity 7050 5G chipset, this smartphone offers smooth and efficient performance. Thanks to the 5000 mAh battery, you can go all day long without having to recharge your phone over and over again. This smartphone comes with 12 GB of RAM with an extra 12 GB of dynamic RAM for fast and smooth operations. With the 256 GB of storage, you can store all your data in this smartphone easily.`, 
            imgPath: require('../assets/images/Products/Mobile/realme11Pro.png') 
        },
        {   title:'Mi 10 (Coral Green, 256 GB)  (8 GB RAM)', 
            brand: 'Redmi',
            rating: '4.1', 
            Price: '59,999', 
            discount:'0', 
            highlight: '8 GB RAM | 256 GB ROM\n16.94 cm (6.67 inch) Display\n108MP + 13MP + 2MP + 2MP | 20MP Front Camera\n4780 mAh Battery\nQualcomm Snapdragon 865 Processor\nFull HD+ 3D Curved E3 AMOLED HDR 10+ Display\n30 W Charging', 
            description: `With the Mi 10 Mobile Phone in your hands, you can enjoy taking splendid pictures and videos that will look as good as the work of professionals. With Qualcomm Snapdragon 865, you can enjoy seamless connectivity, efficient multitasking, and smooth gaming. This mobile phone supports 30 W Wireless Charging + 10 W Reverse Charging to give you hassle-free and fast charging. Thanks to the 16.94 cm (6.67) 3D Curved E3 AMOLED Display, your eyes will be treated to bright and clear visuals while streaming content or gaming. Gamers will be delighted with the 90 Hz refresh rate along with up to 180 Hz touch sampling for smooth and disturbance-free gameplay.`, 
            imgPath: require('../assets/images/Products/Mobile/Mi10.png') 
        },
        {   title:'Xiaomi 12 Pro 5G (Opera Mauve, 256 GB)  (8 GB RAM)', 
            brand: 'Redmi',
            rating: '4.1', 
            Price: '79,999', 
            discount:'47', 
            highlight: '12 GB RAM | 256 GB ROM\n19.3 cm (7.6 inch) QXGA+ Display\n12MP + 12MP + 12MP | 10MP Front Camera\n4400 mAh Lithium-ion Battery\nQualcomm Snapdragon 888 Octa-Core Processor',
            description: 'Treat your inner tech geek with this Xiaomi 12 Pro 5G mobile that surprises you with its flawless performance. With a 120 Hz, 10-bit 2K+, and AMOLED Display setup, you can show off your flair wherever you go. Your entertainment experience is upgraded with an AMOLED display that makes every image come to life. The quad speaker with sound by Harman/Kardon exhilarates you with its sound clarity. The flagship camera setup of this phone, with 50 MP + 50 MP + 50 MP, complements your photography skills. With the Pro Focus AI tracking technology, you can easily take clear pictures of moving objects. With the liquid cooling technology, your phone’s heat can be controlled even when you are multitasking. Unbeatable performance is achieved with the powerful Snapdragon 8 Gen 1 processor. Supported by a massive 4600 mAh battery and Surge P1 technology, you can witness an exceptional charging speed on this Xiaomi 12 Pro mobile.', 
            imgPath: require('../assets/images/Products/Mobile/mi12Pro.png') 
        },
        {   title:'SAMSUNG Galaxy Z Fold3 5G (Phantom Silver, 256 GB)  (12 GB RAM)',
            brand: 'SAMSUNG',
            rating: '4.1', 
            Price: '1,69,999', 
            discount:'0', 
            highlight: '128 GB ROM\n15.49 cm (6.1 inch) Super Retina XDR Display\n12MP + 12MP | 12MP Front Camera\nA15 Bionic Chip Processor', 
            description: `Unfold an immersive experience as you keep watching movies, working and playing on the Samsung Galaxy Z Fold3 5G. This mobile phone features a Infinity Flex Display with an Under Display Camera so that you can enjoy using the mobile according to your convenience. And, enjoy taking a call on the top half and building ideas on the lower half, as this smartphone comes with a hands-free Flex mode that allows you to split the phone into two parts. Also, thanks to the built-in 256 GB of storage capacity to store your files, and 12 GB of RAM, you can enjoy the blazing-fast performance and smooth mobile computing on this mobile phone.`, 
            imgPath: require('../assets/images/Products/Mobile/samsungZFold3.png') 
        },
        {   title:'SAMSUNG Galaxy Z Flip3 5G (Phantom Black, 128 GB)  (8 GB RAM)',
            brand: 'SAMSUNG',             
            rating: '4.3', 
            Price: '95,999', 
            discount:'53', 
            highlight: '8 GB RAM | 128 GB ROM\n17.02 cm (6.7 inch) Full HD+ Display\n12MP + 12MP | 10MP Front Camera\n3300 mAh Lithium-ion Battery\nQualcomm Snapdragon 888 Octa-Core Processor', 
            description: `Whether you want to fold it into your pocket, put it into your purse, or slip it into your jeans this Samsung Galaxy Z Flip 3 5G lets you do all of it with ease. This smartphone comes with a 10.72 cm (4.2) display so that you can not only enjoy immersive visuals on a widescreen but also can conveniently fit it in your pocket. Also, you can check your messages, click photos, play music and do more without opening your phone, thanks to the 4.82 cm (1.9) Cover Screen display. Moreover, this smartphone comes with a Flex Mode Camera so that you can capture hands-free selfies on the cover screen. All you have to do is, adjust the angle and wait for hands-free selfies. Thanks to the waterproof design, you don't have to worry about spills and splashes damaging your phone. Lastly, you can enjoy storing photos and videos as this phone comes with up to 128 GB of storage, thus ensuring plenty of space.`, 
            imgPath: require('../assets/images/Products/Mobile/samsungZFlip3.png') 
        },
        {   title:'ASUS ROG (Black, 128 GB)  (8 GB RAM)',
            brand: 'ROG',
            rating: '4.2', 
            Price: '83,999', 
            discount:'0', 
            highlight: '8 GB RAM | 128 GB ROM\n15.24 cm (6 inch) Full HD+ Display\n12MP + 8MP | 8MP Front Camera\n4000 mAh Battery\nQualcomm Speed-binned Snapdragon 845 Processor', 
            description: 'Take mobile gaming to the next level with the ASUS ROG phone. It features a design that gears you up for your virtual battles, while giving you the comfort you need. Powered by the speed-binned 2.96 GHz Qualcomm Snapdragon 845 Mobile Platform and the Adreno 630 GPU, this phone handles taxing and intensive gaming sessions seamlessly. The ROG GameCool system keeps the phone cool while you are sweating it out on the battlefield. With the 4000 mAh and ASUS HyperCharge, you can be assured that this phone stays powered up throughout your gaming sessions.', 
            imgPath: require('../assets/images/Products/Mobile/AsusRog.png') 
        },
        {   title:'ASUS ROG 5s (Phantom Black, 256 GB)  (12 GB RAM)',
            brand: 'ROG',
            rating: '4.2', 
            Price: '63,999', 
            discount:'9', 
            highlight: '12 GB RAM | 256 GB ROM\n17.22 cm (6.78 inch) Full HD+ Display\n64MP + 13MP + 5MP | 24MP Front Camera\n6000 mAh Lithium Polymer Battery\nQualcomm Snapdragon 888 Plus (SM8350) Processor', 
            description: 'NA', 
            imgPath: require('../assets/images/Products/Mobile/AsusRog5s.png') 
        },
    ];

    Generals = [
        { title: "In The Box", value: "Handset, Adapter, USB Cable, Important Info Booklet with Warranty Card, Quick Guide, Sim Card Tool, Screen Protect Film, Case" },
        { title: "Model Number", value: "RMX3563" },
        { title: "Model Name", value: "GT NEO 3 (150W)" },
        { title: "Color", value: "Sprint White" },
        { title: "Browse Type", value: "Smartphones" },
        { title: "SIM Type", value: "Dual Sim" },
        { title: "Hybrid Sim Slot", value: "No" },
        { title: "Touchscreen", value: "Yes" },
        { title: "OTG Compatible", value: "No" }
    ];

    DisplayFeatures = [
        { title: "Display Size", value: "17.02 cm (6.7 inch)" },
        { title: "Resolution", value: "2412 x 1080 Pixel" },
        { title: "Resolution Type", value: "Full HD+" },
        { title: "GPU", value: "ARM Mali-G610 MC6" },
        { title: "Display Type", value: "Full HD+ OLED Display" },
        { title: "Display Colors", value: "1.07B" },
        { title: "Other Display Features", value: "Refresh Rate: 120 Hz, Aspect Ratio: 20.1:9, Screen-to-Body Ratio: 94.20%, Screen Contrast: 5000000:1, Brightness: 500nit, Color Saturation: DCI-P3 100%, Sunlight Screen Support" }
    ]
    
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Products();