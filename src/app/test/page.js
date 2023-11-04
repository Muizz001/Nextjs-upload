"use client"
import { useEffect, useState } from 'react';

const FormDataPage = () => {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/getData');
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Form Data</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {formData.map((item) => (
          <div key={item._id} className="bg-white p-4 shadow-md rounded-md">
            <h2 className="text-xl font-semibold">Company Name: {item.companyName}</h2>
            <p className="mt-2">Full Name: {item.fullName}</p>
            <p className="mt-2">Email: {item.email}</p>
            <p className="mt-2">Contact: {item.number}</p>
            <p className="mt-2">Project Type: {item.projectType}</p>
            <p className="mt-2">Domain: {item.domain}</p>
            <p className="mt-2">Messages: {item.messages}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormDataPage;
