import React, { useState, useEffect } from 'react'
import axios from 'axios'

// utilities
import { getCookie } from '../../../utilities/cookies';

const UploadImage = ({id, showContainerPortal, imageUrl, setImageUrl}) => {

  const [selectedState, setSelectedState] = useState();

  const onSubmit = async e => {
    e.preventDefault();
    
    if (selectedState) {
      const formData = new FormData();
      formData.append('avatar', selectedState, selectedState.name);
      let res = await axios({
        method: 'post',
        url: `${process.env.REACT_APP_BACKEND}/image/${id}`,
        data: formData,
        headers: {'bearer': getCookie('bearer')}
      });
      console.log(res.data);
      if (res.data.success) showContainerPortal(false);
      setSelectedState(undefined);
      setImageUrl(undefined);
    }
  }

  const onFileChange = e => {
    setSelectedState(e.target.files[0]);
  }

  useEffect(() => {
    if (selectedState) {
      console.log(selectedState);
      setImageUrl(URL.createObjectURL(selectedState));
    }
  }, [selectedState])

  return (
    <>
      <form onSubmit={onSubmit} method="post" encType="multipart/form-data">
        <input type="file" name="file" accept="image/png, image/jpeg" onChange={onFileChange} />
        <input type="submit" value="Submit" />
      </form>

      {!!imageUrl && <img style={{width: '100px', height: '100px', marginLeft: '25px'}} src={imageUrl} />}
    </>
  )
}

export default UploadImage
