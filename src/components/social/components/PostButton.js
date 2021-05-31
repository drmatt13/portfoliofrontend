import React, { useState, lazy, Suspense } from 'react';
import AppendPosts from './AppendPosts';
import MiniAvatar from './MiniAvatar';
import ContainerPortal from '../../ui/ContainerPortal';

// lazy
const CreatePost = lazy(() => import('./CreatePost'));

const PostButton = ({ user, profile, news }) => {

  const [containerPortal, showContainerPortal] = useState(false);
  const [appendedPosts, setAppendedPosts] = useState([]);

  const appendPost = (post) => {
    setAppendedPosts([post, ...appendedPosts]);
  }

  const onClickHandler = () => {
    showContainerPortal(true);
  }

  return (
    <>
      <div className="SOCIAL-create-post-button-container f m-b-15 p-y-15 p-l-10 box-shadow-1">
        <MiniAvatar user={user} name={false} />
        <div className="SOCIAL-create-post-button f-1 m-y-10 b-r-20 p-l-15 m-r-10 bg-white-200 f f-a-center box-shadow-1 pointer" onClick={onClickHandler}>CreatePost</div>
      </div>
      <Suspense fallback={<></>}>
        {containerPortal && <ContainerPortal showContainerPortal={showContainerPortal}>
          <CreatePost showContainerPortal={showContainerPortal} user={user} profile={profile} appendPost={appendPost} news={news} />
        </ContainerPortal>}
      </Suspense>
      <AppendPosts appendedPosts={appendedPosts} />
    </>
  )
}

export default PostButton
