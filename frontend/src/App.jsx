import { useEffect, useState } from 'react';

const App = () => {
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    // async function to fetch location data from the API
    const fetchLocations = async () => {
      try {
        const response = await fetch('/api/locations');
        const data = await response.json();
        // update "location" state with fetched data
        setLocations(data.locations);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchLocations();
  }, []);

  return (
    <div>
      <h1>Locations</h1>
      <ul>
        {/* map over the "locations" array and render location names in a list*/}
        {locations.map(location => (
          <li key={location.id}>{location.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
