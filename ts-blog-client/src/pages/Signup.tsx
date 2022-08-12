import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { signupApi } from "../helpers/apiCalls";

export const Signup = () => {
  const { errors, setErrors } = useDataContext();

  // handle INPUT fields with refs
  // const refName = useRef();   // - JS
  const refName = useRef<HTMLInputElement>(null);   // <HTMLInputElement>(null) - is TS
  const refEmail = useRef<HTMLInputElement>(null);
  const refPassword = useRef<HTMLInputElement>(null);
  // store avatar changes in state
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/dngl4djva/image/upload/v1659703451/default_mwdlea.png"
  );

  const navigate = useNavigate();

  const onSignupSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    // grab input values from refs on submit
    const name = refName?.current?.value;
    const email = refEmail?.current?.value;
    const password = refPassword?.current?.value;
    const avatar = avatarPreview;

    // has user provided all data in form?
    if (!name || !email || !password) {
      console.log("Missing fields...");
      return setErrors("Bitte Username, Email und Password angeben! DANKE!");
    }

    // perform signup against API
    const result = await signupApi({ name, email, password, avatar });

    console.log(result);

    // error on signup? missing fields? wrong formats? show it!
    if (result.error) {
      return setErrors(result.error);
    }

    // put logged in user into state
    setErrors(""); // clear previous errors
    navigate("/"); // go to dashboard on successful login
  };

  const handleAvatarChange: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (!e.target.files) {
      // connected with "let fileSelected = e.target.files[0]" for TS
      return;
    }
    // grab selected file (binary / BLOB)
    let fileSelected = e.target.files[0];

    if (!fileSelected) return;

    // convert BLOB to string
    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileSelected); // concert to base64 encoded string
    // wait until file is fully loaded / converted to base64
    // (once file fully loaded the "onloadedend" event below fires)
    fileReader.onloadend = (ev) => {
      // store the file in state
      // => this will trigger the update of the image / preview
      setAvatarPreview(fileReader.result as string);    // as string - is TS
    };
  };

  return (
    <div className="Signup">
      <h2>Signup</h2>
      <form onSubmit={onSignupSubmit}>
        {/* AVATAR PREVIEW 
          Show default avatar or if avatar user selected on click
        */}
        <label htmlFor="avatar-preview">
          <img src={avatarPreview} />
        </label>

        {/* TEXT FIELDS */}
        <div>
          <input ref={refName} type="text" placeholder="Name.." />
        </div>
        <div>
          <input ref={refEmail} type="text" placeholder="Email.." />
        </div>
        <div>
          <input ref={refPassword} type="password" placeholder="Password..." />
        </div>
        <button type="submit">Signup</button>

        {/* secret avatar image input handler 
          is not shown because it is ugly :) 
          But we need it to open the avatar dialog window
        */}
        <input
          style={{ display: "none" }}
          id="avatar-preview"
          type="file"
          accept="image/*"
          onChange={handleAvatarChange}
        />
      </form>
      <div className="errors">{errors}</div>
    </div>
  );
};
