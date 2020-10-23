function initMap() {


    var options = {
        zoom: 6,
        center: { lat: 31, lng: -100 },
    }

    var map = new google.maps.Map(document.getElementById('map'), options);

    // const locations = [];
    const window = [];
    $.ajax({
        url: "/api/brewery",
        method: "GET"
    }).then(function (data) {
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            let lat = parseFloat(data[i].lat);
            let long = parseFloat(data[i].long);
            // let locObj = { lat: lat, lng: long };
            // locations.push(locObj);

            let name = data[i].name;
            let address = data[i].address;
            let city = data[i].city;
            let phonenumber = data[i].phonenumber;
            let brewerytype = data[i].brewerytype;
            let winObj = { name: name, address: address, city: city, phonenumber: phonenumber, brewerytype: brewerytype , lat: lat, lng: long};
            window.push(winObj);
        }
        return window;

    }).then(function () {
        let markers = [];
        window.map((location) => {
            let position = {lat: location.lat, lng: location.lng}
            let contentString = 
            (` 
            <div class="siteNotice"></div>
            <h1 class="firstHeading">${location.name}</h1>
            <div class="bodyContent">
            <p><b>Address: </b>${location.address}<BR>
            <b>City: </b>${location.city}<BR>
            <b>Phone: </b>${location.phonenumber}</p>
            <b>Brewery Type: </b>${location.brewerytype}</p>
            </div>
            </div>
            `);
        
           const marker = new google.maps.Marker({
                position: position, 
                map: map,
                icon: {
                    url: "./images/beericon.png",
                    scaledSize: new google.maps.Size(40, 40)
                },

            });

            const infowindow = new google.maps.InfoWindow({
                content: contentString
            });


            marker.addListener("click", () => {
                infowindow.open(map, marker);
            });

            markers.push(marker);
    
        });
        const path = "./images";
        new MarkerClusterer(map, markers, { imagePath: `${path}/m` });

        // let brewWindow = brewInfo[1];
        // let contentString
    //     for (let i = 0; i < brewWindow.length; i++) {
    //     contentString =

    //     }

        

    });


    // $.ajax({
    //     url:"/api/brewery",  
    //     method: "GET"
    // }).then(function(data){
    //     console.log(data)
    // for(let i = 0; i < data.length; i++){
    //     let contentString = 
    //     (` 
    //     <div class="siteNotice"></div>
    //     <h1 class="firstHeading">${data[i].name}</h1>
    //     <div class="bodyContent">
    //     <p><b>Address: </b>${data[i].address}<BR>
    //     <b>City: </b>${data[i].city}<BR>
    //     <b>Phone: </b>${data[i].phonenumber}</p>
    //     <b>Brewery Type: </b>${data[i].brewerytype}</p>
    //     </div>
    //     </div>
    //     `);

    // };
    // });

}