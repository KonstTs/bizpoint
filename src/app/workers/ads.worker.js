/// <reference lib="webworker" />

addEventListener('message', ({ data: { imgs: { photos }, ads } }) => {
    const arrayRandom = (arr) => (arr[Math.floor(Math.random() * arr.length)]);
    const floatRandom = (_ceil,_floor) => (Math.random() * (_ceil - _floor) + _floor).toPrecision(2);
    
    const ph = photos?.map(({ src: { tiny } }) => tiny);
    
    // USE OF ITERATOR HERE INSTEAD OF LOOP IS FUNDAMENTALLY WRONG, BUT YOLO!
    const rows = ads?.map(
        ({_feed_entry:{
            status:_s, uuid:_i, title:_t, businessName:_b, municipal:_m
        }={}}) => 
        (_s?.toLowerCase() === 'active' && {
            id:_i, title:_t, employer:_b, location:_m, img:arrayRandom(ph), salary:floatRandom(80,100)
        })).filter(Boolean)

    postMessage(rows);
});