import { generateMapJSON } from "../utils/dottedMapGenerator";
import { covilings } from "../contents/mapPins";
import indiaMapJson from "../contents/dottedMaps/india.json"
import globalMapJson from "../contents/dottedMaps/global.json"
import DottedMapWithoutCountries from "dotted-map/without-countries";
import "leaflet/dist/leaflet.css"
import L from "leaflet"     

let leafletMap;
function refreshmap(target){
  if(leafletMap){
    leafletMap.remove()
}
showDottedMapsWithPins(target)
}

document.addEventListener('DOMContentLoaded', () => {
    let target="india"
    refreshmap(target)
    togglingBtns('.toggle-btns-container', (activeBtn, currBtn) => {
      
        target=currBtn.dataset.target
        refreshmap(target)
        if(target==="india"){
          document.querySelector('.canvas-desc').textContent =
          'Pioneering the Future of Experiential Gastronomy in India';
        }else{
          document.querySelector('.canvas-desc').textContent =
          'Globally Recognized Leader in Experiential Gastronomy';
        }
    });



    window.addEventListener('resize',()=>{
      const width=window.innerWidth
      if(width<640){
        refreshmap(target)
      }else if (width < 1024) { 
        refreshmap(target)
      }else if(width<1535){
        refreshmap(target)
      } else { 
        refreshmap(target)
      }
    })
    // dotted map configs
    // generateMapStrings([]);
});

const pinIcon='images/about/footprints/pin.png'

function adjustMaptargetOnScreenResize(type = "india") {
  const width = window.innerWidth;

  if (type === "global") {
    if (width < 640) { 
      return [-22, 50];
    } else if (width < 1024) { 
      return [-20, 50];
    }else if(width<1535){
      return [-20, 0];
    } else { 
      return [0, 0];
    }
  } else { 
    if (width < 640) { 
      return [16, 81.9629];
    } else if (width < 1024) { 
      return [16, 81.5];
    }else if(width<1535){
      return [16, 81.5];
    } else { 
      return [20, 81.9629];
    }
  }
}

function showDottedMapsWithPins(type="india"){
    const mapJson=type==="global"?globalMapJson:indiaMapJson
    const mapTarget=adjustMaptargetOnScreenResize(type)
    const zoomLevel=type==="global"?2.1:5
    const minZoom=type==="global"?2.48:5
    const maxZoom=type==="global"?4:6
    const map=new DottedMapWithoutCountries({map: mapJson});

    const svgMap=map.getSVG({
        radius:0.18,
        color:"#1a1a1a",
        shape:"circle",
        backgroundColor:"#ebebeb"
    })
    const {region}=map.image
    const bounds = [
        [region.lat.min, region.lng.min],
        [region.lat.max, region.lng.max],
      ];
    leafletMap=L.map("map",{
        minZoom:minZoom,
        maxZoom:maxZoom,
        zoomControl:false,
        attributionControl:false,
    }).setView(mapTarget, zoomLevel)
    
    L.imageOverlay(`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`,bounds).addTo(leafletMap)

    const tooltip=document.getElementById("map-tooltip")
    const customPinIcon=L.icon({
        iconUrl:pinIcon,
        iconSize:[24,24],
        iconAnchor:[12,12]
    })

    

    covilings[type].map((coviling)=>{
        const pin=map.getPin({
            lat:coviling.location[0],
            lng:coviling.location[1]
        })
        const marker=L.marker([pin.lat,pin.lng],{
            icon:customPinIcon
        }).addTo(leafletMap)
        
        marker.on("mouseover",(e)=>{
            tooltip.innerHTML = `<div><b class="text-lg text-[var(--golden)] font-semibold">${coviling.country}</b></div>${coviling.cities.length ? coviling.cities.map((city)=> `<span class="text-sm text-[var(--dark-text)]">${city}</span>`).join("<br>") : ""}`;
            tooltip.style.opacity = 1;
            tooltip.style.top = `${e.originalEvent.clientY}px`;
            tooltip.style.left = `${e.originalEvent.clientX + 12}px`;
        })
        marker.on("mouseout",(e)=>{
            tooltip.style.opacity = 0;
        })
    })

    requestAnimationFrame(()=>{
      setTimeout(()=>{
        leafletMap.invalidateSize()
      },50)
    })
}

function generateMapStrings(countries){
    const mapString=generateMapJSON({
        height: 100,
        // width: 90,
        countries:countries, 
        region:null,
        grid:"diagonal"
    })
    console.log(mapString);
}

function clearPins() {
  const mapContainer = document.querySelector('.map-container');
  if (mapContainer) {
    mapContainer.querySelectorAll('.map-pin').forEach(pin => pin.remove());
  }
}

function addPins(pinPositions) {
  const mapContainer = document.querySelector('.map-container');
  if (mapContainer) {
    pinPositions.forEach(pin => {
      const pinElem = document.createElement('img');
      
      pinElem.src = pinIcon;
      pinElem.className = 'map-pin';
      pinElem.style.position = 'absolute';
      pinElem.style.top = pin.top;
      pinElem.style.left = pin.left;
      pinElem.style.transform = 'translate(-50%, -100%)';
      pinElem.title = pin.content || '';
      mapContainer.appendChild(pinElem);
});
}
}

function showIndiaMap() {
  clearPins();
  addPins(indiaPinPositions);
}

function showGlobalMap() {
  clearPins();
  addPins(globalPinPositions);
}

function togglingBtns(toggleBtnsContainerSelector, callback) {
    const toggleBtnsContainer = document.querySelector(
      toggleBtnsContainerSelector
    );
    const toggleBtns =
      toggleBtnsContainer.querySelectorAll('.toggle-btn');
    toggleBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const activeBtn =
          toggleBtnsContainer.querySelector('.toggle-btn-active');

        if (!(activeBtn.textContent === btn.textContent)) {
          if (activeBtn) {
            activeBtn.classList.remove('toggle-btn-active');
          }
          activeBtn.classList.add('toggle-btn-inactive');

          btn.classList.remove('toggle-btn-inactive');
          btn.classList.add('toggle-btn-active');

          callback(activeBtn, btn);
        }
      });
    });
  }

function ourFootPrintHandling() {
    togglingBtns('.toggle-btns-container', (activeBtn, currBtn) => {
      const mapCanvas = document.querySelector('.map-canvas');
      if (currBtn.dataset.target === 'india') {
        mapCanvas.querySelector('img').src =
          'images/about/footprints/India Footprint map.png';
        mapCanvas.querySelector('img').alt = 'Indian footprint map';
        document.querySelector('.canvas-desc').textContent =
          'Pioneering the Future of Experiential Gastronomy in India';
        showDottedMapsWithPins("india");
      } else if (currBtn.dataset.target === 'global') {
        mapCanvas.querySelector('img').src =
          'images/about/footprints/global footprint.png';
        mapCanvas.querySelector('img').alt = 'Global footprint map';
        document.querySelector('.canvas-desc').textContent =
          'Globally Recognized Leader in Experiential Gastronomy';
        showDottedMapsWithPins("global");
      }
    });
  }


