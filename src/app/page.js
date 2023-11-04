"use client"
import { useEffect, useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    contactType: '',
    contact: '',
    languageOfPair: '',
    domain: '',
    projectType: '',
    messages: '',
    files: [],
  });

  const [file, setFile] = useState([]);
  const formDataToSend = new FormData();


  const [fileError, setFileError] = useState('');

  const [ccode, setCcode] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/ccode');
        if (response.ok) {
          const data = await response.json();
          setCcode(data);
        }
      } catch (error) {
        console.error('Error fetching form data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const selectedFiles = Array.from(files);
      if (selectedFiles.length > 3) {
        setFileError('You can select up to 3 files.');
      } else {
        setFile(() => (selectedFiles))
        setFileError('');
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    if (!formData.companyName || !formData.fullName || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }


    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);
      }
    } catch (error) {
      console.log(error);
    }
    // Object.keys(formData).forEach((key) => {
    //   if (key === 'files') {
    //     formData.files.forEach((file, index) => {
    //       formDataToSend.append(`file${index + 1}`, file);
    //     });
    //   }
    // });
    file.forEach((file, index) => {
      formDataToSend.append(`filedd${index + 1}`, file);
    });
    formDataToSend.append('upload_preset', 'my-uploads')
    // formDataToSend.append('cloud_name', 'muizz')

    fetch("https://api.cloudinary.com/v1_1/muizz/image/upload", {
      method: "post",
      body: formDataToSend
    }).then(res => console.log('Cloudinary Response:', res)
    )


  };


  return (
    <div className="max-w-lg mx-auto p-4 bg-gray-200 rounded-md">
      <input
        name="companyName"
        placeholder="Company Name"
        type="text"
        value={formData.companyName}
        onChange={handleChange}
        className="w-full p-2 mb-2 border-b border-black bg-transparent"
      />
      <input
        name="fullName"
        placeholder="Full Name"
        type="text"
        value={formData.fullName}
        onChange={handleChange}
        className="w-full p-2 mb-2 border-b border-black bg-transparent"
      />
      <input
        name="email"
        placeholder="Email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 mb-2 border-b border-black bg-transparent"
      />
      <div className="flex gap-2">
        <select
          name="contactType"
          value={formData.contactType}
          onChange={handleChange}
          className="w-1/2 p-2 border-b border-black bg-transparent"
        >
          <option disabled selected>Select Country Code</option>
          {ccode.map((code) => (
            <option key={code.code}>{code.name} {" "} {code.dial_code}</option>

          ))
          }
        </select>
        <input
          name="contact"
          placeholder="Contact"
          type="tel"
          value={formData.contact}
          onChange={handleChange}
          className="w-1/2 p-2 border-b border-black bg-transparent"
        />
      </div>
      <input
        name="languageOfPair"
        placeholder="Language of pair"
        type="text"
        value={formData.languageOfPair}
        onChange={handleChange}
        className="w-full p-2 mb-2 border-b border-black bg-transparent"
      />
      <input
        name="domain"
        placeholder="Domain or Occupation"
        type="text"
        value={formData.domain}
        onChange={handleChange}
        className="w-full p-2 mb-2 border-b border-black bg-transparent"
      />
      <input
        name="projectType"
        placeholder="Types of Project"
        type="text"
        value={formData.projectType}
        onChange={handleChange}
        className="w-full p-2 mb-2 border-b border-black bg-transparent"
      />
      <h3>Attach Sample*</h3>
      <div className="flex justify-between">
        <input type="file" onChange={handleChange} multiple className="w-1/2" />
        <p>Upload up to 3 files, each less than 5MB.</p>
      </div>
      {fileError && <p className="text-red-600">{fileError}</p>}
      <textarea
        name="messages"
        placeholder="Messages"
        value={formData.messages}
        onChange={handleChange}
        className="w-full p-2 mb-2 border-b border-black bg-transparent"
      />
      <button onClick={handleSubmit} className="w-full p-2 bg-blue-500 text-white rounded-md">
        Submit
      </button>
    </div>
  );
}
