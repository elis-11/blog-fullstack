import { useEffect, useRef, useState } from "react";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdCancel, MdSaveAlt } from "react-icons/md";
import { NavLink, useLocation, useParams } from "react-router-dom";
import { ImagePicker } from "../components/ImagePicker";
import { useDataContext } from "../context/DataProvider"; // --- version 1
import { BsSkipBackwardFill } from "react-icons/bs";
import {
  createPostCommentApi,
  deletePostCommentApi,
  getPostOneApi,
  updatePostCommentDislikes,
  updatePostApi,
  updatePostCommentLikes,
  updatePostLikes,
  updatePostDislikes,
} from "../helpers/apiCalls";
import { ICommentCreate } from "../types/comment.types";
import { IPost, IPostDetails, IPostUpdate } from "../types/post.types";

export const PostDetails = () => {
  const { user, posts, setPosts } = useDataContext();
  const [editMode, setEditMode] = useState(false);
  const [post, setPost] = useState<IPostDetails>();
  const [image, setImage] = useState<string>();

  const { id } = useParams();

  const refPostTitle = useRef<HTMLInputElement>(null);
  const refPostDescription = useRef<HTMLTextAreaElement>(null);

  const refCommentNew = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id) return;

    const fetchPostData = async () => {
      const postApi: IPostDetails = await getPostOneApi(id);
      console.log(postApi.comments);
      setPost(postApi);
      setImage(postApi.image); // change image
    };
    fetchPostData();
  }, []);

    //! update post
    const onPostUpdate = async () => {
      // if neither title or description updated => return
      if (!user || !post || !refPostTitle.current || !refPostDescription.current)
        return;
  
      // update object for sending to API
      const postUpdate: IPostUpdate = {
        title: refPostTitle.current.value,
        description: refPostDescription.current.value,
      };
  
      // image update => if user picked a new image => place it inside update
      if (image) postUpdate.image = image;
  
      // send update data to API (backend)
      const postUpdated = await updatePostApi(user.token, post._id, postUpdate);
      console.log(postUpdated);
  
      // update post in list of posts using map!
      const postsUpdated = posts.map((_post) => {
        return _post._id === post._id ? postUpdated : _post;
      });
      setPosts(postsUpdated); // put copy in to state => overwrite posts
      setPost(postUpdated); // update post in current page
      setEditMode(false); //
    };
  
    //! ***post-liles/dislikes***
    const onPostLike = async (postId: string) => {
      console.log(postId);
      if (!user || !post) return;
  
      // 1.step => update likes at API
      const postUpdatedLikes = await updatePostLikes(user.token, postId);
      console.log(postUpdatedLikes);
      // 2.step => update likes in state
      const postsUpdatedLikes = posts.map((post) => {
        return post._id === postId ? {...post, ...postUpdatedLikes} : post;
      });
      // overwrite post in post array
      setPosts(postsUpdatedLikes);
      setPost({ ...post, ...postUpdatedLikes });
      console.log(postsUpdatedLikes);
    };
    
    const onPostDislike= async (postId:string) => {
      console.log(postId);
      if(!user || !post) return;
  
      const postUpdatedDislikes= await updatePostDislikes(user.token, postId);
      console.log(postUpdatedDislikes);
  
      const postsUpdatedDislikes=posts.map(post => {
        return post._id === postId ? {...post, ...postUpdatedDislikes} : post
      })
  setPosts(postsUpdatedDislikes)    
  setPost({...post, ...postUpdatedDislikes})
      console.log(postsUpdatedDislikes);
      
    }  

    //! comment-create
  const onCommentCreate = async () => {
    console.log("Creating new comment...");

    if (!post || !user || !refCommentNew.current) return;
    // create new comment
    const commentNew: ICommentCreate = {
      post: post._id,
      author: user._id,
      description: refCommentNew.current.value,
    };
    //send new comment to backend
    const commentNewApi = await createPostCommentApi(user.token, commentNew);

    // create new comment Array
    // copy all old comments and new comment created
    let commentsNew = [...post.comments, commentNewApi];

    // update comments in post
    setPost({ ...post, comments: commentsNew });

    // clear refInput in post
    refCommentNew.current.value = "";
  };

  //! *****postComment-likes-dislikes*****

  const onCommentLike = async (commentId: string) => {
    if (!user || !post) return;

    // 1. step => update at API
    const commentUpdated = await updatePostCommentLikes(user.token, commentId);

    // 2. step => update in state
    const commentsUpdated = post.comments.map((comment) => {
      return comment._id === commentId ? commentUpdated : comment;
    });

    // overwrite comments in post
    setPost({ ...post, comments: commentsUpdated });
  };

  const onCommentDislike = async (commentId: string) => {
    if (!user || !post) return;

    // 1.step => update dislikes at API
    const commentUpdated = await updatePostCommentDislikes(
      user.token,
      commentId
    );

    // 2.step => update dislikes in state
    const commentsUpdated = post.comments.map((comment) => {
      return comment._id === commentId ? commentUpdated : comment;
    });
    setPost({ ...post, comments: commentsUpdated });
  };

  // delete comment
  const onCommentDelete = async (commentId: string) => {
    if (!user || !post) return;

    // 1.step => delete comment at API
    const commentDeleted = await deletePostCommentApi(user.token, commentId);
    console.log(commentDeleted);

    // 2. delete comment in nested comment array of post state
    // overwrite old comment array with new one
    const commentsCopy = post.comments.filter(
      (comment) => comment._id !== commentId
    );
    console.log(commentsCopy);

    setPost({ ...post, comments: commentsCopy });
  };

  // if not post loaded => show at least something to the user
  if (!post) return <div>Post loading...</div>;

  return (
    <div className="Details">
      <div className="post-details">
        <div>
          {/* <img src={post.image} /> */}
          {image && (
            <ImagePicker
              image={image}
              setImage={setImage}
              className="post-image"
            />
          )}
        </div>

        {editMode ? (
          // show edit files
          <div className="post-edit">
            <input defaultValue={post.title} type="text" ref={refPostTitle} />
            <textarea
              defaultValue={post.description}
              ref={refPostDescription}
            ></textarea>
            <div className="edit-icons">
              <MdSaveAlt className="save" onClick={onPostUpdate} />
              <MdCancel className="cancel" onClick={() => setEditMode(false)} />
            </div>
          </div>
        ) : (
          // show readonly post info
          <>
            <div className="title">{post.title}</div>
            <div className="author">
              <img src={post.author.avatar} className="avatar" />
              {post.author.name}: {post.createdAt.slice(0, 10)}
              {/* {post.createdAt.slice(0, 10)} by {post.author.name} */}
            </div>
            <div>{post.description}</div>
          </>
        )}
        <div className="post-icons">
          <div className="likes">
            <span>
              <AiFillLike
                className="like"
                onClick={() => onPostLike(post._id)}
              /> {post.likes?.length || 0}
            </span>
            <span>
              <AiFillDislike
                className="dislike"
                onClick={() => onPostDislike(post._id)}
              /> {post.dislikes?.length || 0}
            </span>
          </div>
          <FaEdit className="edit" onClick={() => setEditMode(!editMode)} />
          <NavLink to="/posts">
            <BsSkipBackwardFill />
          </NavLink>
        </div>
      </div>

      {/* create new comment */}
      <div className="add-comment">
        <input
          autoFocus
          ref={refCommentNew}
          type="text"
          placeholder="Add comment..."
        />
        <button onClick={onCommentCreate}>Add</button>
      </div>

      <div className="comments">
        {/* {([...post.comments] || []).reverse().map((comment) => ( */}
        {post.comments?.map((comment) => (
          <div key={comment._id} className="comment">
            <span>
              <img src={comment.author?.avatar} className="icon-avatar" />
            </span>
            <span className="name">{comment.author?.name} </span>
            <span className="description"> {comment.description}</span>
            <div className="stats">
              <span>
                <AiFillLike
                  className="icon"
                  onClick={() => onCommentLike(comment._id)}
                />
                {comment.likes.length}
              </span>
              <span>
                <AiFillDislike onClick={() => onCommentDislike(comment._id)} />
                {comment.dislikes.length}
              </span>
            </div>
            <FaTrashAlt
              className="delete"
              onClick={() => onCommentDelete(comment._id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
