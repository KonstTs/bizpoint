/// <reference lib="webworker" />

// addEventListener('message', ({ data: { imgs: { photos }, ads } }) => {
addEventListener('message', (data) => {
    console.log('data:',data)
    const _data = JSON.parse(data.data)
    
    postMessage(_data);
});


// `<h5 class="_sub kt-trim kt-mrgr30 kt-ai-stretch-flex">
//     <i class="pi pi-map-marker kt-mrgr5" style="color: #F39C19;"></i>
//     <span class="kt-txt-color-gr kt-font-600" style="background: linear-gradient(135deg, #F39C19, #C0382B);">
//         {{config?.location}}
//     </span>
// </h5>
// <h5 class="_sub kt-trim kt-mrgr30 kt-ai-stretch-flex">
//     <i class="pi pi-money-bill kt-mrgr5" style="color: #42d392;"></i>
//     <span class="kt-txt-color-gr kt-font-600" style="background: linear-gradient(135deg, #42d392,rgb(2, 99, 34));">
//         {{config?.salary}}
//     </span>
// </h5>
// <h5 class="_sub kt-trim kt-mrgr30 kt-ai-stretch-flex ">
//     <i class="pi pi-building-columns kt-mrgr5" style="color: rgb(248, 41, 172);"></i>
//     <span class="kt-txt-color-gr kt-font-600" style="background: linear-gradient(135deg,rgb(248, 41, 172),rgb(82, 10, 141));">
//         {{config?.employer}}
//     </span>
//     <i class="pi pi-star-fill kt-txt-color-light-grey kt-mrgl10"></i>
// </h5>`