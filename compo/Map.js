import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MapView, { Marker } from 'react-native-maps';
import tw from 'twrnc';
import { useDispatch, useSelector } from 'react-redux';
import { selectdestination, selectorigin, settravelTimeInformation } from '../slices/navSlice';
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAPS_APIKEY } from '@env';

const Map = () => {
  const origin = useSelector(selectorigin);
  const destination = useSelector(selectdestination);
  GOOGLE_MAPS_APIKEY ="AIzaSyA3qHkRF4bVaLTwJDilbzZKyrfS1RPqBKA" 
  const mapref = useRef(null);
  const dispatch =useDispatch();

  // Ensure that we trigger fit after map and markers are ready
  useEffect(() => {
    if (!origin || !destination || !mapref.current) return;

    // Add a slight delay to allow markers to render before fitting them
    setTimeout(() => {
      mapref.current.fitToSuppliedMarkers(['origin', 'destination'], {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      });
    }, 500); // Delay for 500ms to allow rendering

  }, [origin, destination]);

  useEffect(()=>{
    if(!origin || !destination) return;
    
    const getTravelTime =async()=>{
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?
        units=imperial&origins=${origin.description}&destinations=${destination.description}
        &key=${GOOGLE_MAPS_APIKEY}`
      )
      .then((res)=>res.json())
      .then((data)=>{
        console.log(data)
      dispatch(settravelTimeInformation(data.rows[0].elements[0]));
      
      })

    }
    getTravelTime()

  },[origin,destination,GOOGLE_MAPS_APIKEY])

  return (
    <MapView
      ref={mapref}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin?.location.lat || 37.78825, // Default value if origin is not available
        longitude: origin?.location.lng || -122.4324, // Default value
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
      onMapReady={() => {
        // Optional: Force fit markers once map is ready
        if (origin && destination) {
          mapref.current.fitToSuppliedMarkers(['origin', 'destination'], {
            edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
          });
        }
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={origin.description}
          destination={destination.description}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="black"
        />
      )}

      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}

      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
