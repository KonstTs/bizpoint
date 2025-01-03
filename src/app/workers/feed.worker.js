/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
    const options = {
        style:'currency',
        currency:'NOK',
        maximumFractionDigits:0,
        minimumFractionDigits: 0
    }

    let locations=[], salaries=[], employers=[];

    data.forEach(dato => {
        dato.rating = Math.floor(Math.random() * (5)) ;
        const {location, salary, employer } = dato;
        locations.push(location);
        salaries.push(salary);
        employers.push(employer);
        dato.details = w_details(location, salary, options, employer, dato.rating);
    });
    const locationsMapper = w_occurrenceMapper(locations);
    const salariesMapper = w_occurrenceMapper(salaries)
    const employersMapper = w_occurrenceMapper(employers)

    console.log('locationsMapper,',locationsMapper)
    console.log('salariesMapper,',salariesMapper)
    console.log('employersMapper,',employersMapper)

    const reports = {
        locations: Array.from(new Set(locations)), 
        salaries: Array.from(new Set(salaries)), 
        employers: Array.from(new Set(employers))
    }

    postMessage([data,reports]);
});
// locations -> most jobs
// locations -> highest salaries
// employers -> highest salaries
// employers -> highest ratings++++++++

function w_Report([l,s,e]){
    this.map[entity] = undefined;
    this.map = undefined;

    return new function(){
        this.locations = Array.from(new Set(l));
        this.salaries = Array.from(new Set(s));
        this.employers = Array.from(new Set(e));
        this.locationsMapper = w_occurrenceMapper(l);
        this.salariesMapper = w_occurrenceMapper(s);
        this.employersMapper = w_occurrenceMapper(e);
    }

const Engine ={
    gas: undefined,
    list: undefined,
    map: undefined,
    start: (_gas) => {
        Engine.gas = _gas;
        return Engine;
    },
    normalize: (_arr) => {
        Engine.list = Array.from(new Set(arr));
        return Engine;
    },
                    
}
}

function w_occurrenceMapper(arr){
return arr.reduce(function(obj, b) {
    obj[b] = ++obj[b] || 1;
    return obj;
  }, {});
} 


function w_details(l,s,o,e,r){
    return `<h5 class="_sub kt-trim kt-mrgr20 kt-ai-stretch-flex">
        <i class="pi pi-map-marker kt-mrgr5" style="color: #ee7752;"></i>
        <span class="kt-txt-color-gr kt-font-600 kt-trim" style="background: linear-gradient(135deg, #ee7752, #e73c7e);">
            ${l}
        </span>
    </h5>
    <h5 class="_sub kt-trim kt-mrgr20 kt-ai-stretch-flex">
        <i class="pi pi-money-bill kt-mrgr5" style="color: #e73c7e;"></i>
        <span class="kt-txt-color-gr kt-font-600 kt-trim" style="background: linear-gradient(135deg, #e73c7e,#23a6d5);">
            ${
                new Intl.NumberFormat('no-NO', o)
                    .format(s+'000')
                    .replace('NOK', 'kr')
            }
        </span>
    </h5>
    <h5 class="_sub kt-trim kt-ai-stretch-flex ">
        <i class="pi pi-briefcase kt-mrgr5" style="color: #23a6d5;"></i>
        <span class="kt-txt-color-gr kt-font-600 kt-trim" style="background: linear-gradient(135deg, #23a6d5, #23d5ab);">
            ${e}
        </span>
        ${w_rate(r)}
    </h5>`
}

function w_rate(rating){
    let stars = '';
    for(let i=0;i<5;i++) {
        stars += `<i class="pi pi-star-fill kt-mrgl5" style="color:${i<=rating ? '#F39C19' : '#dfdfdf'};font-size:0.9rem"></i>`;
    }
    return stars;
}
