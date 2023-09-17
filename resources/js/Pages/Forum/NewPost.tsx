import React, {useState} from 'react';
import Welcome from '@/Components/Forum/Welcome';
import FCreatePost from '@/Components/Forum/CreatePost';
import ForumLayout from '@/Layouts/ForumLayout';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '/toastify-custom.css'

import { setApiAxiosHeader } from '@/Components/Helper/ApiTokenManager';

export default function Forum() {
  const toastTextColor = '#000000';
  const toastBackgroundColor = '#f3f4f6';

  const [formData, setFormData] = useState({
    post_title: '',
    post_content: ''
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    if(type === "checkbox"){
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked ? 1 : 0,
      }));
    }
    else{
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setApiAxiosHeader();
      const response = await axios.post('/api/posts', formData);

      console.log('Post created:', response);

      setFormData({
        post_title: '',
        post_content: ''
      });

      toast.dark('Post created successfully!', {
        position: toast.POSITION.TOP_CENTER,
        style: {
          color: toastTextColor,
          backgroundColor: toastBackgroundColor,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
        }});
      
    } catch (error) {
      console.log(formData);
      console.error('Error creating post:', error);
    }
  };

  return (
    <ForumLayout
      title="Forum"
    >
      <div className="py-12 mt-10">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-c2 dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <FCreatePost
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </ForumLayout>
    );
  }
