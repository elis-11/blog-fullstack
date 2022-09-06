import { useRef, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../../context/DataProvider";
import { createPostApi } from "../../helpers/apiCalls";
import { IPostCreate } from "../../types/post.types";
import { User } from "../../types/user.types"


export const AddPost = () => {
  const { user, posts, setPosts, errors, setErrors } = useDataContext();
  const [newPost, setNewPost] = useState({});
  const [imagePreview, setImagePreview] = useState(
    "https://res.cloudinary.com/dngl4djva/image/upload/v1661715464/xtp7qdyvie9dnb8sz3hp.png"
  );

  const { id } = useParams();
  const refTitle = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const onPostCreate: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log("Creating new post...");

    if (!user || !newPost || !refTitle.current || !refDescription.current)
      return setErrors("Something went wrong! Please try again later...");

    const postNew: IPostCreate = {
      author: user._id,
      title: refTitle.current.value,
      description: refDescription.current.value,
      image: imagePreview,
    };
    console.log(postNew);
    const newPostApi = await createPostApi(user.token, postNew);
    console.log(newPostApi);
    setPosts([...posts, newPostApi]);
    navigate("/posts");
    refTitle.current.value = "";
    refDescription.current.value = "";
  };

  //! post-image
  const handleChangePostImage: React.ChangeEventHandler<HTMLInputElement>= (e) => {
    console.log(e.target.files);
    if (!e.target.files) return;
    let fileSelected = e.target.files[0];

    if (!fileSelected) return;

    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileSelected);
    fileReader.onloadend = (ev) => {
      setImagePreview(fileReader.result as string);
    };
  };

  return (
    <div className="Add">
      <div className="create">
        <form onSubmit={onPostCreate}>
          <label htmlFor="image-preview">
            <img src={imagePreview} alt="" />
          </label>
          <div>
            <input
              autoFocus
              type="text"
              ref={refTitle}
              placeholder="Title..."
            />
          </div>
          <div>
            <input
              type="text"
              ref={refDescription}
              placeholder="Description..."
            />
          </div>
          <button type="submit">Create</button>
          <NavLink className="back" to="/posts">
            Back
          </NavLink>
          {/* select image-button click handler */}
          <input
            style={{ display: "none" }}
            id="image-preview"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChangePostImage}
          />
        </form>
      </div>
    </div>
  );
};
