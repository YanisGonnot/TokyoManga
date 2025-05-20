import { useState } from "react";
import { AuthFormInterface } from "../typage/interfaces/authFormI";
import { useAuth } from "../useAuth";

import "./loginGiacamo.css";
import "./registerGiacomo.css";


const AuthByGiacomo = () => {
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState<AuthFormInterface>({
        email: "",
        password: "",
        firstname: "",
        lastname: "",
      });

    const [displayLogin, setDisplayLogin] = useState(true);

    const { signInUser, signUpUser, isLoading, error } = useAuth();


    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signUpUser(formData);
        if (result === "success") {
            setDisplayLogin(true)
            setMessage("Succefully registered!");
        }
    };



    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signInUser(formData);
    };


    if (isLoading) {
        return <h2> Loading...</h2>;
    }

return (
    <>
      {displayLogin && (
        <div className="login-container">
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <h2>Login</h2>
            {message && <h5>{message}</h5>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
            <button type="submit">Sign In</button>
            <p style={{ color: "black" }} onClick={() => setDisplayLogin(false)}>
              You don't have an account yet? Sign Up
            </p>
          </form>
        </div>
      )}
      {!displayLogin && (
        <div className="signup-container">
          <form className="signup-form" onSubmit={handleRegisterSubmit}>
            <h2>Sign Up</h2>
            {message && <h5>{message}</h5>}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />

            <input
              type="string"
              name="firstname"
              placeholder="First Name"
              value={formData.firstname}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  firstname: e.target.value,
                })
              }
              required
            />

            <input
              type="string"
              name="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  lastname: e.target.value,
                })
              }
              required
            />

            {error && <div className="error-message">{error}</div>}
            <button type="submit">Create Account</button>
            <p style={{ color: "black" }} onClick={() => setDisplayLogin(true)}>
              You already have an account? Sign In
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default AuthByGiacomo