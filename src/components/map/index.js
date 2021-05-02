import React from 'react';
import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import {connect} from "react-redux";

// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import styles from "./index.module.css";

mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1IjoibWVobWV0YWxpY3lobm4iLCJhIjoiY2tucndzYWFwMGpkcDJ1cXQ1aWNldW9icSJ9.5Me5o9d5x1DUfGtYSipbiw';

class Map extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lng: 35.6667,
            lat: 39.1667,
            zoom: 5,
        };
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const {lng, lat, zoom} = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom
        });
        console.log("State Takibi : ", this.props.creatable);

        const marker = new mapboxgl.Marker({
            draggable: true
        }).setLngLat([lng, lat])
            .addTo(map);

        map.on('move', () => {
            this.setState({
                lng: map.getCenter().lng.toFixed(4),
                lat: map.getCenter().lat.toFixed(4),
                zoom: map.getZoom().toFixed(2)
            });
        });

        map.on('click', (m) => {
            marker.setLngLat([m.lngLat.lng, m.lngLat.lat])
            console.log(m);
        });
    }


    /*componentWillReceiveProps(nextProps) {
        if (nextProps.creatable) {
            this.setState({isEditable: true});
        }
    }*/

    render() {
        const {lng, lat, zoom} = this.state;
        return (

            <div ref={this.mapContainer} className={styles.mapContainer}/>
        );
    }
}

const mapStateToProps = (state) => ({
    creatable: state.map.creatable,
});

export default connect(mapStateToProps, {})(Map);
