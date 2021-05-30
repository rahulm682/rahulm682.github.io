let stateObj, districtObj;

let stateSelection = document.getElementById("stateSelector");
let districtSelection = document.getElementById("districtSelector");
let dataDisplay = document.getElementById('data');
let submit = document.getElementById('submit');

// console.log(stateSelection);

stateFetcher();
stateSelection.addEventListener('change', districtFetcher);
submit.addEventListener('click', getDetails);

async function stateFetcher() {
    let stateUrl = 'https://cdn-api.co-vin.in/api/v2/admin/location/states';
    const response = await fetch(stateUrl);

    if(response.status == 200) {
        stateObj = await response.json();

        stateObj.states.forEach(state => {
            let option = new Option(state.state_name, state.state_id);
            // stateSelection.options[state.state_id] = new Option(state.state_name, state.state_id);
            stateSelection.add(option);
        });
    } else {
        console.log("Error" + response.status);
    }
} 


async function districtFetcher() {
    districtSelection.options.length = 0;
    districtSelection.add(new Option(`---Select District---`, `---Select District---`));
    let id = stateSelection.options[stateSelection.selectedIndex].value;
    let districtUrl = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`;
       
    const response = await fetch(districtUrl);

    if(response.status==200) {
        districtObj = await response.json();
        // console.log(districtObj);
        districtObj.districts.forEach(district => {
            let option = new Option(district.district_name, district.district_id);
            districtSelection.add(option);
        });
    } else {
        console.log("Error" + response.status);
    }
} 

async function getDetails() {
    let d1 = document.getElementById('dateSelector').value;
    let date = new Date(d1);
    console.log(date);
    let id = districtSelection.options[districtSelection.selectedIndex].value;

    let dateStr = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    console.log(dateStr);
    let detailsUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${dateStr}`;
    console.log(detailsUrl);

    let response = await fetch(detailsUrl);

    if(response.status==200) {
        let data = await response.json();
        // if(data.size>=0) 
        if(data.sessions.length>0) {
            card(data);
        } else {
            setTimeout(()=>{
                result.innerHTML = "No Slots Found!!!!!";
            }, 0);
        }
        console.log(data);
    } else {
        console.log("Error" + response.status);
    }
}


function card(obj) {
    let result = document.getElementById('result');
    setTimeout(()=>{
        result.innerHTML = "";
    }, 0);

    obj.sessions.forEach(session => {
        console.log(session.slots);
        
        let res = `<div class="card mx-4 my-4" style="width: 18rem;">
                        <div class="card-header">
                    ${session.name}
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Address: ${session.address}</li>
                    <li class="list-group-item">Block: ${session.block_name}</li>
                    <li class="list-group-item">Pincode: ${session.pincode}</li>
                    <li class="list-group-item">Start: ${session.from}</li>
                    <li class="list-group-item">End: ${session.to}</li>
                    <li class="list-group-item">Fee: ${session.fee_type}</li>
                    <li class="list-group-item">Date: ${session.date}</li>
                    <li class="list-group-item">Dose 1: ${session.available_capacity_dose1}</li>
                    <li class="list-group-item">Dose 2: ${session.available_capacity_dose2}</li>
                    <li class="list-group-item">Available: ${session.available_capacity}</li>
                    <li class="list-group-item">Min Age: ${session.min_age_limit}</li>
                    <li class="list-group-item">Vaccine: ${session.vaccine}</li>
                    <li class="list-group-item">Slots: ${session.slots}</li>
                </ul>
                </div>`;

        setTimeout(()=>{
            result.innerHTML += res;
        }, 0);
    });
}


                