/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
    let locations=[], salaries=[], employers=[];

    data.forEach(dato => {
        dato.rating = Math.floor(Math.random() * (5)) ;
        const {location, salary, employer } = dato;

        locations.push(location);
        salaries.push(salary);
        employers.push(employer);
        dato.details = w_details(location, salary, employer, dato.rating);
    });
    const stats = {locations: Array.from(new Set(locations)), salaries: Array.from(new Set(salaries)), employers: Array.from(new Set(employers))}
    postMessage([data,stats]);
});


function w_details(l,s,e,r){
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
                new Intl.NumberFormat('no-NO', { style: 'currency', currency: 'NOK'  })
                    .format(s)
                    .replace('NOK', '000 kr')
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
