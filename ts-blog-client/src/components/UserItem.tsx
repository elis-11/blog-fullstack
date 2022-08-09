import { useState } from "react";
import { deleteUserApi, updateUserApi } from "../helpers/apiCalls";
import { useDataContext } from "../context/DataProvider";
import { User } from "../types/types";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";

export const UserItem = ({ user }: { user: User }) => {
  // import variable from context and rename to other variable using :
  // => this prevents conflict with prop "user" which has the same name
  const { user: userLoggedIn, users, setUsers } = useDataContext();
  const [userCopy, setUserCopy] = useState(user);
  const [editMode, setEditMode] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log(userCopy);
    console.log(e.target.value);
    // create copy before state update and update in one step
    const updated = { ...userCopy, [e.target.name]: e.target.value };
    setUserCopy(updated);
  };

  const submitUpdate = async () => {
    if (!userLoggedIn) return;

    // send updated user (not saved yet) => to API!
    const userUpdatedApi = await updateUserApi(
      userLoggedIn.token,
      userCopy._id,
      userCopy
    );
    console.log({ userUpdatedApi });

    setEditMode(false);

    // if API saving / updating worked => update user also in Context

    // find user that we updated in our context by id
    // if found => REPLACE by the user from API
    // all other users => dont touch!
    const usersCopy = users.map((_user) => {
      return _user._id === userUpdatedApi._id ? userUpdatedApi : _user;
    });

    setUsers(usersCopy);
  };

  const handleDelete = async () => {
    if (!userLoggedIn) return;

    const response = await deleteUserApi(userLoggedIn.token, user._id);
    console.log("User deleted at API:", response);

    // delete user from frontend state too!
    const usersCopy = users.filter((_user) => {
      return _user._id !== userCopy._id;
    });
    setUsers(usersCopy);
  };

  return (
    <div className="user" key={user._id}>
      {editMode ? (
        // EDIT MODE => input fields + save button
        <div className="edit">
          <input className="name" name="name" value={userCopy.name} onChange={handleChange} />
          <input className="email" name="email" value={userCopy.email} onChange={handleChange} />
          <button className="save" onClick={submitUpdate}>
            Save
          </button>
        </div>
      ) : (
        // view / display mode
        <div className="item">
          <div className="name">{userCopy.name}</div>
          <div className="email">{userCopy.email}</div>
        </div>
      )}
      {/* TOGGLE Edit mode by btton */}
      <div className="icons">
        <AiTwotoneEdit
          className="icon"
          onClick={() => setEditMode(!editMode)}
        />
        <AiFillDelete className="icon" onClick={() => handleDelete()} />
      </div>{" "}
    </div>
  );
};
