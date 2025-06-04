import { useState } from "react";
import { useAuth } from "../useAuth";
import { AuthFormInterface } from "../typage/interfaces/authFormI";

export default function Profile() {
  const { getUser, logout, editUser, isLoading, error } = useAuth();

  const user = getUser();

  const [userData, setUserData] = useState<AuthFormInterface>({
    email: user.email,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname,
  });

  const [message, setMessage] = useState("");

  const editUserInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await editUser(userData);
    if (result === "success") {
      setMessage("Succefully edit!");
    }
  };


  if (isLoading) {
    return <h2> Loading...</h2>;
  }

  return (
    <>
      <div className="wrapperProfile">
        <div>
          <h2> Your Profile </h2>
          {message && <h5>{message}</h5>}
          <div className="profileContent">
            <div className="profileInfos">
              <h5>Your Infos</h5>
              <form className="login-form" onSubmit={editUserInfo}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  required
                />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  required
                />

                <input
                  type="string"
                  name="firstname"
                  placeholder="First Name"
                  value={userData.firstname}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      firstname: e.target.value,
                    })
                  }
                  required
                />

                <input
                  type="string"
                  name="lastname"
                  placeholder="Last Name"
                  value={userData.lastname}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      lastname: e.target.value,
                    })
                  }
                  required
                />

                {error && <div className="error-message">{error}</div>}
              </form>
            </div>
            <button className="editButton">Edit</button>
            <button onClick={() => logout()}>logout</button>
          </div>
        </div>
      </div>
    </>
  );
}
