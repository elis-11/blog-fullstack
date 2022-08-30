import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { signupApi } from "../helpers/apiCalls";
import "../styles/Auth.scss";

export const Signup = () => {
  const { errors, setErrors } = useDataContext();

  const refName = useRef();
  const refEmail = useRef();
  const refPassword = useRef();
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/dngl4djva/image/upload/v1659703451/default_mwdlea.png"
    // 'https://res.cloudinary.com/dngl4djva/image/upload/v1661546536/qeusp7zptbc6w57nebsc.png'
  );
  const navigate = useNavigate();

  const onSignupSubmit = async (e) => {
    e.preventDefault();

    const name = refName.current.value;
    const email = refEmail.current.value;
    const password = refPassword.current.value;
    const avatar= avatarPreview

    if (!name || !email || !password) {
      return setErrors("Something went wrong! Try again!");
    }

    // const result = await signupApi(name, email, password); // without AVATAR
    const result = await signupApi(name, email, password, avatar); // with AVATAR
    console.log(result);

    if (result.error) {
      return setErrors(result.error);
    }
    setErrors("");
    navigate("/");
    // console.log("Login at API");
  };

  //! AVATAR
  const handleChangeAvatar = (e) => {
    console.log(e.target.files);
    let fileSelected = e.target.files[0];

    if (!fileSelected) return;

    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileSelected);
    fileReader.onloadend = (ev) => {
      setAvatarPreview(fileReader.result);
    };
  };

  return (
    <div className="Signup">
      <h2>Signup</h2>
      <form onSubmit={onSignupSubmit}>
        <label htmlFor="avatar-preview">
          <img src={avatarPreview} alt="" />
        </label>
        <div>
          <input
            type="text"
            ref={refName}
            // defaultValue={"elis"}
            placeholder="Name"
          />
        </div>
        <div>
          <input
            type="text"
            ref={refEmail}
            // defaultValue={"elis@gmail.com"}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            ref={refPassword}
            // defaultValue="elis"
            placeholder="Password"
          />
        </div>
        <button type="submit">Signup</button>

        {/* secret avatar-button image click-handler! */}
        <input
          style={{ display: "none" }}
          id="avatar-preview"
          name="avatar"
          type="file"
          accept="image/*"
          onChange={handleChangeAvatar}
        />
      </form>
      <div className="errors">{errors}</div>
    </div>
  );
};
