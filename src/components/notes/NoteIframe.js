import React, {useEffect} from 'react'

const NoteIframe = ({html}) => {

  useEffect(() => {
    console.log(html);
  }, []);

  return <>
    <iframe className="NOTE-iframe" srcDoc={html} />
  </>
}

export default NoteIframe
