import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/profile/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        },
      })
      .then((response) => {
        setProfile(response.data);
        setBio(response.data.bio);
      });
  }, []);

  const updateProfile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('bio', bio);
    if (profilePicture) {
      formData.append('profile_picture', profilePicture);
    }

    axios
      .put('http://localhost:8000/api/profile/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Profile updated successfully', response.data);
      });
  };

  return (
    <form onSubmit={updateProfile}>
      <input
        type="text"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setProfilePicture(e.target.files[0])}
      />
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default Profile;
