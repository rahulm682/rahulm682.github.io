let stateObj, districtObj;

// State Dropdown and District Dropdown
let stateSelection = document.getElementById("stateSelector");
let districtSelection = document.getElementById("districtSelector");
// let dataDisplay = document.getElementById('data');

// Respective Buttons for fetching results
let submitDistrict = document.getElementById('submitDistrict');
let submitPincode = document.getElementById('submitPincode');

// The tabs 
let districtFinder = document.getElementById('district');
let pincodeFinder = document.getElementById('pincode');
// console.log(stateSelection);

// Error section
let noData = document.getElementById('noData');

stateSelection.addEventListener('change', districtFetcher);
submitDistrict.addEventListener('click', getDetails);
submitPincode.addEventListener('click', getResult);


stateFetcher();

districtFinder.addEventListener('click', ()=>{
    districtFinder.classList.add('active');
    pincodeFinder.classList.remove('active');
    let d = document.getElementById('getByDistrict');
    let p = document.getElementById('getByPincode');
    p.classList.add('hide');
    d.classList.remove('hide');
});

pincodeFinder.addEventListener('click', ()=>{
    pincodeFinder.classList.add('active');
    districtFinder.classList.remove('active');
    let d = document.getElementById('getByDistrict');
    let p = document.getElementById('getByPincode');
    d.classList.add('hide');
    p.classList.remove('hide');
});


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
        noData.innerHTML = "Some Error occured. Error code: " + response.status;
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
        noData.innerHTML = "Some Error occured. Error code: " + response.status;
    }
} 

async function getDetails() {
    let result = document.getElementById('resultDistrict');
    let d1 = document.getElementById('dateSelectorDistrict').value;
    let date = new Date(d1);
    let dateStr = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    // console.log(date);
    // console.log(dateStr);

    let id = districtSelection.options[districtSelection.selectedIndex].value;
    let detailsUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${id}&date=${dateStr}`;
    // console.log(detailsUrl);

    let response = await fetch(detailsUrl);

    if(response.status==200) {
        let data = await response.json();
        // if(data.size>=0) 
        if(data.sessions.length>0) {
            card(data, result);
        } else {
            setTimeout(()=>{
                result.innerHTML = "No Slots Found!!!!!";
            }, 0);
        }
        // console.log(data);
    } else {
        noData.innerHTML = "Some Error occured. Error code: " + response.status;
    }
}



let pincodeInput = document.getElementById('pincodeInput');
pincodeInput.addEventListener('input', (e)=> {
    if(pincodeInput.value.length>6) {
        let pinErr = document.getElementById('pinErr');
        pinErr.innerHTML = "Please enter valid pincode of six numbers";
        pinErr.style = 'color: red';
    } else {
        pinErr.innerHTML = "";
    }
});


async function getResult() {
    let result = document.getElementById('resultPincode');
    let pincode = document.getElementById('pincodeInput').value;
    let d1 = document.getElementById('dateSelectorPincode').value;
    let date = new Date(d1);
    let dateStr = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    
    let pincodeUrl = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${dateStr}`;
    
    let response = await fetch(pincodeUrl);
    
    if(response.status == 200) {
        let data = await response.json();
        if(data.sessions.length>0) {
            card(data, result);
        } else {
            setTimeout(()=>{
                result.innerHTML = "No Slots Found!!!!!";
            }, 0);
        }
    } else {
        noData.innerHTML = "Some Error occured. Error code: " + response.status;
    }
}


function card(obj, result) {
    // let result = document.getElementById('result');
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