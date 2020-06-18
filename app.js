window.addEventListener('load', ()=> {
    let long; let lat;


   // var bodyelem=document.getElementById("main");
    let tempDes= document.querySelector('.temperature-description');
    let tempDeg= document.querySelector('.temperature-degree');
    let locationTimezone= document.querySelector('.location-timezone');
    let tempSec= document.querySelector(".degree-section");
    //let tempspan=document.querySelector(".degree-section span");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
                long= position.coords.longitude;
                lat=position.coords.latitude;
               // console.log(lat);
               const api= `http://api.weatherapi.com/v1/current.json?key=*insertyourkey*q=${lat},${long}`;
               fetch(api)
                    .then(response =>{
                        return response.json();
                    })
                    .then(data =>{
                    console.log(data);
                   const { temp_f , condition, temp_c }= data.current;
                   const txt= condition.text;
                  // ;
                   //set elements
                    if(condition.text == "Partly cloudy")
                        document.body.style.backgroundColor = "grey";
                    else if(condition.text ==="Sunny")
                        document.body.style.backgroundColor = "yellow";
                    else
                        document.body.style.backgroundColor = "pink";
                        
                    
                   tempDeg.textContent=temp_f + "F";
                   tempDes.textContent=condition.text;
                   locationTimezone.textContent=data.location.tz_id;
                       setIcons(txt, document.querySelector('.icon')); 

                        tempSec.addEventListener('click', change=> {
                           if( tempDeg.textContent===temp_f + "F")
                            tempDeg.textContent = temp_c + "C";
                            else
                            tempDeg.textContent = temp_f + "F";
                            

                        });

               });
        });
       
    }

    function setIcons(icon, iconID){
        const skycons= new Skycons({color:"white"});
        const currentIcon=icon.replace(/ /g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);


    }








});
