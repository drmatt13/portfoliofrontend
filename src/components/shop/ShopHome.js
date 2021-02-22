import { useEffect } from 'react';
import { logoTransparent } from '../../actions/globalActions';

const ShopHome = () => {

  useEffect(() => {
    logoTransparent(true);
  }, []);


return (
    <div>
      shop home
    </div>
  )
}

export default ShopHome
