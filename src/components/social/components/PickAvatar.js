import React, {useState, useEffect, useRef} from 'react';

// images
import img1 from '../../images/profile images/1.jpg';
import img2 from '../../images/profile images/2.jpg';
import img3 from '../../images/profile images/3.jpg';
import img4 from '../../images/profile images/4.jpg';
import img5 from '../../images/profile images/5.jpg';
import img6 from '../../images/profile images/6.jpg';
import img7 from '../../images/profile images/7.jpg';
import img8 from '../../images/profile images/8.jpg';
import img9 from '../../images/profile images/9.png';
import img10 from '../../images/profile images/10.png';
import img11 from '../../images/profile images/11.jpg';
import img12 from '../../images/profile images/12.png';
import img13 from '../../images/profile images/13.png';
import img14 from '../../images/profile images/14.jpg';
import img15 from '../../images/profile images/15.jpg';
import img16 from '../../images/profile images/16.jpg';
import img17 from '../../images/profile images/17.jpg';
import img18 from '../../images/profile images/18.jpg';

const PickAvatar = ({prevSelection, setPrevSelection}) => {

  const gridRef = useRef();

  const [imgArray, setImgArray] = useState([]);

  useEffect(() => {
    const imgArray = document.querySelectorAll(".SOCIAL-avatar-selection-img-container");
    imgArray[prevSelection].classList.add("SOCIAL-avatar-selection-img-container-selected");
    setImgArray(imgArray);
  }, []);

  const toggleSelection = e => {
    const selection = +e.target.getAttribute("alt")-1;
    imgArray[prevSelection].classList.remove("SOCIAL-avatar-selection-img-container-selected");
    imgArray[selection].classList.add("SOCIAL-avatar-selection-img-container-selected");
    console.log(imgArray[selection].firstChild.src);
    setPrevSelection(selection);
  }

  return (
    <div className="SOCIAL-avatar-selection-container f f-d-column fade-in">
    <div ref={gridRef} className="SOCIAL-avatar-selection-grid-container f-1 g p-l-25 p-r-5 m-r-10 of-y-auto">
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img1} alt="1"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img2} alt="2"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img3} alt="3"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img4} alt="4"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img5} alt="5"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img6} alt="6"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img7} alt="7"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img8} alt="8"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img9} alt="9"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img10} alt="10"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img11} alt="11"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img12} alt="12"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img13} alt="13"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img14} alt="14"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img15} alt="15"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img16} alt="16"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img17} alt="17"/></div>
      <div onClick={toggleSelection} className="SOCIAL-avatar-selection-img-container"><img src={img18} alt="18"/></div>
      <div>‎</div>
    </div>
    <div className="SOCIAL-avatar-selection-submit no-select">Submit</div>
    </div>
  )
}

export default PickAvatar
