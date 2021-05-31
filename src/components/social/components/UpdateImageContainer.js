import React, { useState, useEffect, useRef } from 'react'

import PickAvatar from './PickAvatar';
import UploadImage from './UploadImage';

// css
import '../../css/SocialUpdateImage.css';

const UpdateImageContainer = ({ id, showContainerPortal }) => {

  const avatarRef = useRef();
  const uploadRef = useRef();

  const [menuState, setMenuState] = useState(1);
  const [prevSelection, setPrevSelection] = useState(0);
  const [imageUrl, setImageUrl] = useState();

  const toggleMenu = e => {
    if (+e.target.getAttribute("value") === 1) {
      avatarRef.current.classList.add("bg-blue-100");
      avatarRef.current.classList.remove("t-black");
      uploadRef.current.classList.remove("bg-blue-100");
      uploadRef.current.classList.add("t-black");
      setMenuState(1);
    } else {
      avatarRef.current.classList.remove("bg-blue-100");
      avatarRef.current.classList.add("t-black");
      uploadRef.current.classList.add("bg-blue-100");
      uploadRef.current.classList.remove("t-black");
      setMenuState(2);
    }
  }

  return (
    <div className="SOCIAL-update-image-master-container bg-gray-100 b-r-20 fade-in">
      <div className="SOCIAL-update-image-master-container-header f t-lg m-b-10 t-white no-select">
        <div ref={avatarRef} onClick={toggleMenu} value="1" className="f-1 f f-j-center f-a-center p-15 pointer bg-blue-100">Pick Avatar</div>
        <div ref={uploadRef} onClick={toggleMenu} value="2" className="f-1 f f-j-center f-a-center p-15 pointer t-black">Upload Image</div>
      </div>
      <div className="SOCIAL-update-image-content-container">
      {+menuState === 1 && <PickAvatar id={id} prevSelection={prevSelection} setPrevSelection={setPrevSelection} />}
      {+menuState === 2 && <UploadImage id={id} imageUrl={imageUrl} setImageUrl={setImageUrl} showContainerPortal={showContainerPortal}/>}
      </div>
    </div>
  )
}

export default UpdateImageContainer;