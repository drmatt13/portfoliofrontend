import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// css
import '../css/Home.css';

// redux
import { logoTransparent } from '../../actions/globalActions';

const Home = () => {

  const profileImage = useRef(null);
  const smallImagesContainer = useRef(null);

  useEffect(() => {
    document.title = "Home";
    logoTransparent(false);
    window.scrollTo({top: 0, behavior: 'smooth'}); 
    for (let imageNode of smallImagesContainer.current.children) {
      imageNode.addEventListener('mouseover', () => {
        profileImage.current.src = imageNode.firstChild.src;
        for (let node of smallImagesContainer.current.children) {
          node.classList.remove("REACT-box-shadow1");
        }
        imageNode.classList.add("REACT-box-shadow1");
      })
    }
  }, []);

  return (
    <div className="HOME-master-container">



      <div className="HOME-container1">
        <div className="HOME-profile-image-container">
          <img src="/images/home/home_profile_pic2.jpg" className="REACT-box-shadow1" alt="main-image" ref={profileImage}/>
        </div>
        <div className="HOME-small-images-container" ref={smallImagesContainer}>
          <div className="HOME-small-image-container">
            <img src="/images/home/home_profile_pic2.jpg" className="REACT-box-shadow1" alt="main-image"/>
          </div>
          <div className="HOME-small-image-container">
            <img src="/images/home/union1.jpg" alt="main-image"/>
          </div>
          <div className="HOME-small-image-container">
            <img src="/images/home/home_profile_pic.jpg" alt="main-image"/>
          </div>
          <div className="HOME-small-image-container">
            <img src="/images/home/money1.jpg" alt="main-image"/>
          </div>
          <div className="HOME-small-image-container">
            <img src="/images/home/baby1.jpg" alt="main-image"/>
          </div>
        </div>


        <div className="HOME-mini-bio">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti id ex mollitia sequi quasi laboriosam quia, ad voluptate quisquam minus aliquid, veritatis ducimus cumque officiis? Iure blanditiis sit quidem eum eos nobis doloremque fugiat! Beatae sequi molestias voluptas eligendi id commodi eos dicta eaque adipisci quia, rerum doloribus eum vero ipsum asperiores, totam possimus! Veritatis ducimus aliquid repellat! Modi aliquid doloremque cupiditate molestias odit nam eum praesentium tenetur nobis, nihil necessitatibus vero reiciendis animi ab voluptates minima reprehenderit accusantium adipisci optio nulla quibusdam aspernatur quisquam officia. Explicabo, provident. Numquam repudiandae facere expedita sit dignissimos iusto libero iste quis molestiae! Exercitationem?</p>
        </div>
        <div className="HOME-mini-links">
          <a href="#">link1</a>
          <a href="#">link2</a>
        </div>
      </div>



      <div className="HOME-container2 Home-container2-padding">
        <div className="HOME-header-container">
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga eligendi fugit necessitatibus delectus provident odio minima voluptate, ipsa sint consectetur, quam a aut vitae minus at quos repudiandae hic sapiente.</h1>
        </div>
        <div className="HOME-mini-bio">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi alias assumenda maxime est laboriosam, magnam ea. Optio dolor quasi reiciendis et, excepturi magni voluptatem quis cupiditate id illo fugiat maiores hic esse est debitis animi doloremque pariatur modi at. Odio.</p>
        </div>
        <div className="HOME-footer-container">
          <h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque praesentium veritatis possimus laborum, nisi maiores rerum perferendis et hic. Maxime qui ea minus atque cupiditate, ipsam impedit dolor? Ut, maxime.</h2>
        </div>
      </div>



    </div>
  )
}

export default Home;
