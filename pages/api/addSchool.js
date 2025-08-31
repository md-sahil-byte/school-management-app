import formidable from 'formidable';
import path from 'path';
import mysql from 'mysql2/promise'; // Use the promise-based version for async/await

// Disable the default Next.js body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');
  const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB limit
  });

  try {
    const [fields, files] = await form.parse(req);
    const { name, address, city, state, contact, email_id } = fields;
    const imageFile = files.image ? files.image[0] : null;

    if (!imageFile) {
        return res.status(400).json({ message: 'Image file is missing.' });
    }

    // Replace with your actual MySQL connection details
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'school_management',
    });

    const imageUrl = `/schoolImages/${imageFile.newFilename}`;

    // Insert data into the 'schools' table
    const [result] = await connection.execute(
      'INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name[0], address[0], city[0], state[0], contact[0], email_id[0], imageUrl]
    );

    await connection.end();

    res.status(200).json({ message: 'School added successfully', schoolId: result.insertId });

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Failed to add school', error: error.message });
  }
}
