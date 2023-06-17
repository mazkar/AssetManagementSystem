import {View, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import MapboxGL, {Logger} from '@rnmapbox/maps';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';

MapboxGL.setWellKnownTileServer('Mapbox');
MapboxGL.setAccessToken(
  'pk.eyJ1IjoibWF6a2FyMjciLCJhIjoiY2xpeDAxZWsxMDJvajNncXhhM29hNDh2OCJ9.ZklsuopzRiQsKHCO4hW_ug',
);

// Initialize Mapbox Directions client
const directionsClient = MapboxDirectionsFactory({
  accessToken:
    'pk.eyJ1IjoibWF6a2FyMjciLCJhIjoiY2xpeDAxZWsxMDJvajNncXhhM29hNDh2OCJ9.ZklsuopzRiQsKHCO4hW_ug',
});

export default function MapTracker() {
  const [coordinates] = useState([106.816666, -6.2]);
  const [coordinates2] = useState([106.816666, -6.4]);

  Logger.setLogCallback(log => {
    const {message} = log;

    // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
    if (
      message.match('Request failed due to a permanent error: Canceled') ||
      message.match('Request failed due to a permanent error: Socket Closed')
    ) {
      return true;
    }
    return false;
  });
  const [route, setRoute] = useState(null);

  useEffect(() => {
    getDirections();
  }, []);

  const getDirections = async () => {
    try {
      const response = await directionsClient
        .getDirections({
          waypoints: [
            {coordinates: [126.816666, -6.2]},
            {coordinates: [105.916666, -6.4]},
          ],
          profile: 'driving-traffic',
          geometries: 'geojson',
        })
        .send();

      const routeGeometry = response.body.routes[0].geometry;

      // Create a GeoJSON object with the route geometry
      const routeFeature = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [106.816666, -6.2],
            [126.816666, -6.4],
          ],
        },
      };

      // Create a GeoJSON collection with the route feature
      const routeCollection = {
        type: 'FeatureCollection',
        features: [routeFeature],
      };

      setRoute(routeCollection);
    } catch (error) {
      console.log('Error getting directions:', error);
    }
  };
  useEffect(() => {
    // Initialize Mapbox when the component mounts
    MapboxGL.setTelemetryEnabled(false); // Disable anonymous telemetry

    // Optional: Customize Mapbox settings
    MapboxGL.setConnected(true); // Enable network traffic

    // Clean up Mapbox when the component unmounts
    return () => MapboxGL.setAccessToken(null);
  }, []);

  return (
    <View style={styles.page}>
      <View style={StyleSheet.absoluteFill}>
        {/* <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera zoomLevel={6} centerCoordinate={coordinates} />
          <MapboxGL.PointAnnotation id="idn" coordinate={coordinates} />
        </MapboxGL.MapView> */}
        <MapboxGL.MapView style={styles.map}>
          <MapboxGL.Camera zoomLevel={10} centerCoordinate={coordinates} />
          <MapboxGL.PointAnnotation id="idn" coordinate={coordinates} />
          <MapboxGL.PointAnnotation id="idn" coordinate={coordinates2} />
          {route && (
            <MapboxGL.ShapeSource id="routeSource" shape={route}>
              <MapboxGL.LineLayer
                id="routeLayer"
                style={{lineColor: 'red', lineWidth: 5}}
              />
            </MapboxGL.ShapeSource>
          )}
        </MapboxGL.MapView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: 170,
    width: 300,
  },
  map: {
    flex: 1,
  },
});
