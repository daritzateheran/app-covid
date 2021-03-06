const mymap = L.map('CovidMap').setView([10.968638, -74.806644,], 14);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

var negativo = new L.Icon({
    
    iconUrl: '/static/png/coronavirus_verde.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

var tratamiento = new L.Icon({
    
    iconUrl: '/static/png/coronavirus_amarillo.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

var uci = new L.Icon({
    
    iconUrl: '/static/png/coronavirus_naranja.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

var curado = new L.Icon({
    
    iconUrl: '/static/png/coronavirus_rosado.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

var muerto = new L.Icon({
    
    iconUrl: '/static/png/coronavirus_rojo.png',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
});

const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

var cedulas
cedulas = document.getElementsByName("cedulas")
var markers = new Object();



cedulas.forEach((cedula) =>{
        const httpc = new XMLHttpRequest() // metodo de javascript, para hacer peticiones a una url
        httpc.open('GET', "/mapa_general_casos?param1=" + cedula.id)
        httpc.onreadystatechange = function () {
            if (httpc.readyState == 4 && httpc.status == 200) {
                var coords = JSON.parse(httpc.responseText);                
                if (coords[0][2]=="Negativo"){
                    markers[cedula]=L.marker([coords[0][0], coords[0][1]], { icon: negativo }).addTo(mymap).bindPopup(cedula.id+" - Negativo")
                }
                if (coords[0][2]=="Muerte"){
                    markers[cedula]=L.marker([coords[0][0], coords[0][1]], { icon: muerto }).addTo(mymap).bindPopup(cedula.id+" - Fallecido")
                }
                if (coords[0][2]=="Curado"){
                    markers[cedula]=L.marker([coords[0][0], coords[0][1]], { icon: curado }).addTo(mymap).bindPopup(cedula.id+" - Curado")
                }
                if (coords[0][2]=="En UCI"){
                    markers[cedula]=L.marker([coords[0][0], coords[0][1]], { icon: uci }).addTo(mymap).bindPopup(cedula.id+" - En UCI")
                }
                if (coords[0][2]=="En Tratamiento Casa"){
                    markers[cedula]=L.marker([coords[0][0], coords[0][1]], { icon: tratamiento }).addTo(mymap).bindPopup(cedula.id+" - En tratamiento casa")
                }
                if (coords[0][2]=="En tratamiento Hospital"){
                    markers[cedula]=L.marker([coords[0][0], coords[0][1]], { icon: tratamiento }).addTo(mymap).bindPopup(cedula.id+" - En tratamiento Hospital")
                }
                if (coords[0][2]=="Positivo"){
                    markers[cedula]=L.marker([coords[0][0], coords[0][1]], { icon: tratamiento }).addTo(mymap).bindPopup(cedula.id+" - Positivo")
                }
                
            }else {
                console.log("Ready state", httpc.readyState);
                console.log("Ready status", httpc.status);
            }
        }
        httpc.send(null);

    });  