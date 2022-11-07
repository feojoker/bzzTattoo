import React from 'react'

function UserMapLocation({ location, setLocation }) {
  return (
    <button
      className="locate"
      onClick={() => {
        if (!location) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocation({ lat: position.coords.latitude, lng: position.coords.longitude })
            },
            () => null
          );
        } else {
          setLocation(null)
        }
      }}
    >
      <img src="/directions.png" alt="directions" />
    </button>
  );
}

export default UserMapLocation


