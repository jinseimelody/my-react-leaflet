$(".card-jfy-item").map((khoi, khoivalue) => {
    var card = $(khoivalue);
    var nameElm = $($('.card-jfy-title', card).get(0)).get(0);
    var name = nameElm ? nameElm.text() : "";

    var priceElm = $($('.price', card).get(0)).text();
    var price = priceElm ? priceElm.text() : 0;

    var addressElm = $($('.card-jfy-nation', card).get(0)).text();
    var address = addressElm ? addressElm.text() : "";

    // var ratingElm = $($('.card-jfy-rating-layer', card).get(0)).children().length;
    var rating = $($('.card-jfy-rating-layer', card).get(0)).children().length;


    var oldPriceElm = $($('.price', card).get(1)).text()
    var oldPrice = oldPriceElm ? oldPriceElm.text() : 0;

    return {
        name: name,
        price: price,
        oldPrice: oldPrice,
        address: address,
        rating: rating
    };
});

$(".card-jfy-item").map((khoi, khoivalue) => {
    var card = $(khoivalue);
    var name = $($($('.card-jfy-title', card).get(0)).get(0)).text();
    var price = $($($('.price', card).get(0))).text().replace(",", "");
    var address = $($($('.card-jfy-nation', card).get(0))).text();
    var rating = $($($('.card-jfy-rating-layer', card).get(0)).children()).length;
    var oldPrice = $($($('.price', card).get(1))).text().replace(",", "");
    var src = $($('img',$($('.card-jfy-image', card).get(0))).get(0)).attr('src');

    return {
        name: name,
        price: +price,
        oldPrice: +oldPrice,
        address: address,
        rating: rating,
        imageUrl: src
    };
});