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
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Products();