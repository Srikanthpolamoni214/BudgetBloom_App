// ReceiptUploader.jsx
import React, { useState } from 'react';
import axios from 'axios';

const ReceiptUploader = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('receipt', file);

    try {
      setUploading(true);
      const response = await axios.post('https://budgetbloom-app.onrender.com/receipts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setMessage('Upload successful');
      if (response.data.message == "File uploaded successfully"){
        alert("File uploaded successfully");
      }
    } catch (err) {
      console.error('Upload failed:', err);
      setMessage('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Receipt</h2>
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default ReceiptUploader;