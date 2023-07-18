
class Helper {
    getDiscountPrice = (price, discount) => {
        var oPrice = price.replaceAll(",","");
        var discPrice = oPrice;
        if( discount === '0' ) {
            return price;
        }
        if( discount !== '0' ) {
            discPrice = discPrice * discount
            discPrice /= 100
        }
        discPrice = oPrice - discPrice
        var x= Math.floor(discPrice);
        x=x.toString();
        var lastThree = x.substring(x.length-3);
        var otherNumbers = x.substring(0,x.length-3);
        if(otherNumbers !== '')
            lastThree = ',' + lastThree;
        var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return res;
    }

    getDiscountAmount = (price, discount) => {
        var oPrice = price.replaceAll(",","");
        var discPrice = oPrice;
        if( discount === '0' ) {
            return 0;
        }
        if( discount !== '0' ) {
            discPrice = discPrice * discount
            discPrice /= 100
        }
        return discPrice
    }

    scrollRight = (event) => {
        var classes = event.target.classList;
        classes.forEach(element => {
           if(element === 'electronics') {
                var eleRight = document.querySelector(".electronics-scroll");
                eleRight.scrollBy(350, 0)
           }
           if(element === 'toys') {
                var toyRight = document.querySelector(".toys-scroll");
                toyRight.scrollBy(350, 0)
            }
         });
    }

    scrollLeft = (event) => {
        var classes = event.target.classList;
        classes.forEach(element => {
           if(element === 'electronics') {
                var eleLeft = document.querySelector(".electronics-scroll");
                eleLeft.scrollBy(-350, 0)
           }
           if(element === 'toys') {
                var toyLeft = document.querySelector(".toys-scroll");
                toyLeft.scrollBy(-350, 0)
            }
         });
    }
}
// eslint-disable-next-line import/no-anonymous-default-export
export default new Helper();
