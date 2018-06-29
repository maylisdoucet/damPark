import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Route, Switch } from 'react-router-dom';
import Loading from './components/Loading';
import BottomNavigation from './components/BottomNavigation';
import AttractionCard from './components/AttractionCard';

const demoFancyMapStyles = require('./style.json');


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activites: [],
      value: 'recents',
      load: false,
    };
  }

  componentDidMount() {
    setTimeout(() => { this.fetchMyFetch() ;}, 3000);
  }

  fetchMyFetch() {
    fetch('/api/theme')
      .then(res => res.json())
      .then(data => this.setState({ data, load: true }));
  }

  componentDidUpdate() {
    console.log(this.state.data);
    const icons = {
      love: {
        icon: './images/smokegreen.svg',
      },
      eat: {
        icon: '',
      },
      culture: {
        icon: '',
      },
    };
    const map = new window.google.maps.Map(document.getElementById('map'), {

      center: { lat: 52.37186039999999, lng: 4.895860999999968 },
      zoom: 14,
      styles: demoFancyMapStyles,
      options: {
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: false,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false,
        minZoom: 11,
        maxZoom: 18,
      },
    });
    this.state.data.forEach((activites) => {
      console.log(activites.LAT);
      console.log(activites.LNG);
      console.log(activites.NOM);
      const markers = activites;
      const logo = './images/markers/DamParklogo.svg';
      const contentString = ReactDOMServer.renderToString(<AttractionCard 
        image={activites.IMAGE}
        nom={activites.NOM}
        descriptif={activites.DESCRIPTIF}
        ouverture={activites.OUVERTURE}
        fermeture={activites.FERMETURE}
        age={activites.AGE}
        accessibilite={activites.ACCESSIBILITE}
        
         />);
      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });
      const marker = new window.google.maps.Marker({
        position: { lat: activites.LAT, lng: activites.LNG },
        icon: {
          url: activites.pointeur,
          // This marker is 20 pixels wide by 32 pixels high.
          scaledSize: new window.google.maps.Size(80, 80),

        },
        map,
      });
      marker.addListener('click', () => {
        infowindow.open(map, marker, contentString);
      });
    });
  }

  render() {
    return (
      <div>
        {(this.state.load === false)
          ? <Loading />
          : (
            <div>
              <div id="map" style={{ height: '90vh', width: '100vw' }} />
              <BottomNavigation />       
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
