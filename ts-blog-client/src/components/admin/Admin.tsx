import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import "./Admin.scss";
import { Members } from "./Members";
import { Projects } from "./Projects";

export const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="Admin">
      <div className="links">
        <div>
          <NavLink to="" end>
            Members
          </NavLink>
        </div>
        <div>
          <NavLink to="projects">Projects</NavLink>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Members />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );

  //   const { user, users, setUsers, errors, setErrors } = useDataContext();

  //   useEffect(() => {
  //     if (!user) {
  //       return navigate("/login");
  //     }
  //     const loadData = async () => {
  //       console.log(user);
  //       const result = await getUsersApi(user.token);

  //       if (result.error) {
  //         return setErrors(result.error);
  //       }
  //       setErrors("");
  //       setUsers(result);
  //     };
  //     console.log(user);

  //     loadData();
  //   }, [user]);

  //   return (
  //     <div className="Admin">
  //       <h2>Admin</h2>
  //         <UsersList />
  //       <div className="errors">{errors}</div>
  //     </div>
  //   );
};
