import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    // Replace with your actual MySQL connection details
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'school_management',
    });

    // Query the 'schools' table to get all data
    const [rows] = await connection.execute('SELECT id, name, address, city, image FROM schools');

    await connection.end();

    res.status(200).json({ schools: rows });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Failed to fetch schools', error: error.message });
  }
}
