import { useState } from "react";
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { MdSaveAlt } from "react-icons/md";
import { useDataContext } from "../../context/DataProvider";
import { deleteUserApi, updateUserApi } from "../../helpers/apiCalls";

export const MemItem = ({ user }) => {
  const { user: userLoggedIn, users, setUsers } = useDataContext(); // import from context & renamed user to other variable -> userLoggedIn
  const [editMode, setEditMode] = useState(false);
  const [userCopy, setUserCopy] = useState(user);

  const handleChange = (e) => {
    // console.log(userCopy);
    // console.log(e.target.value);
    // create Copy before state update & update in one step
    const updated = { ...userCopy, [e.target.name]: e.target.value };
    // console.log(updated);
    setUserCopy(updated);
  };

  const submitUpdate = async () => {
    // send updated user (not saved yet) => to API
    const userUpdatedApi = await updateUserApi(
      userLoggedIn.token,
      userCopy._id,
      userCopy
    );
    console.log(userUpdatedApi);
    setEditMode(false);

    // Save in Browser
    const usersCopy = users.map((_user) => {
      return _user._id === userUpdatedApi._id ? userUpdatedApi : _user;
    });

    setUsers(usersCopy);
  };

  const handleDelete = async () => {
    const response = await deleteUserApi(userLoggedIn.token, userCopy._id);
    // const response = await deleteUserApi(userLoggedIn.token, user._id);
    console.log(response);

    const usersCopy = users.filter((_user) => {
      return _user._id !== userCopy._id;
    });
    setUsers(usersCopy);
  };

  return (
    <div className="user" key={user._id}>
      {editMode ? (
        <div className="edit">
          <div className="avatar">
            <img
              src={userCopy.avatar}
            />
          </div>
          <input
            className="name"
            name="name"
            value={userCopy.name}
            onChange={handleChange}
          />
          <input
            className="email"
            name="email"
            value={userCopy.email}
            onChange={handleChange}
          />
          <MdSaveAlt className="save" onClick={submitUpdate} />
        </div>
      ) : (
        <div className="item">
          <div className="avatar">
            <img
              style={{ width: "30px", borderRadius: "50%" }}
              src={user.avatar}
            />
          </div>
          <div className="name">{userCopy.name}</div>
          <div className="email">{userCopy.email}</div>
          {/* <div className="avatar">{userCopy.avatar}</div> */}
        </div>
      )}
      <div className="icons">
        <AiTwotoneEdit
          className="icon"
          onClick={() => setEditMode(!editMode)}
        />
        <AiFillDelete className="icon" onClick={() => handleDelete()} />
      </div>
    </div>
  );
};
