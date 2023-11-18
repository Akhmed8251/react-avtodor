import React from "react";
import { YMaps, Map as YMap, Placemark } from "@pbe/react-yandex-maps";

const Map = () => {
  const defaultState = {
    center: [42.982105543873985, 47.46713613558195],
    zoom: 17,
    controls: []
  };

  const placeMarkCoordinate = [42.982105543873985, 47.46713613558195]

  return (
    <section className="map">
      <div className="map__container container">
        <div id="map">
            <YMaps>
                <YMap width={'100%'} height={'100%'} defaultState={defaultState}>
                    <Placemark geometry={placeMarkCoordinate} />
                </YMap>
            </YMaps>
        </div>
      </div>
    </section>
  );
};

export default Map;
