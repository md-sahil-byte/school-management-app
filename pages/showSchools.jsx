import { useState, useEffect } from 'react';

const ShowSchools = () => {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await fetch('/api/getSchools');
        if (!response.ok) {
          throw new Error('Failed to fetch schools');
        }
        const data = await response.json();
        setSchools(data.schools);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="showSchoolContainer mx-auto px-4 py-8">
      <div className="addSchoolNavBar">
        {/* logo */}
        <img src="" alt="logo" />
        <button className="showSchoolBtn"><a href="/addSchool">Add School</a></button>
      </div>

      <div className="showSchoolContent">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Available Schools</h1>
        <div className="showSchoolCardContainer">
          {schools.map((school) => (
            <div key={school.id} className="showSchoolCard">
              <div className="card-image-wrapper">
                <img
                  src={`${school.image}`}
                  alt={`Image of ${school.name}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  className="rounded-t-xl"
                />
              </div>
              <div className="card-content">
                <h2 className="card-title">{school.name}</h2>
                <span className="card-text">
                  <p>{school.address},</p>
                  <p>{school.city}</p>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ShowSchools;
