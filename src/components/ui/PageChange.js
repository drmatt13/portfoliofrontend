import {useEffect} from 'react'

const PageChange = ({title}) => {

  useEffect(() => {
    if (title) document.title = title;
    document.getElementById("app-master-container").scrollTo({top: 0, behavior: 'smooth'}); 
  }, []);

  return <></>;
}

export default PageChange
