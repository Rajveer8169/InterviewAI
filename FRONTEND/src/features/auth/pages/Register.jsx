import { useState } from "react";
import { Link, useNavigate } from "react-router";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth.js";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {loading,handleRegister} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
      await handleRegister({
        username,
        email,
        password,
      });
      navigate("/");
  };

    if (loading) {
    return (
      <main>
        <h1>Loading...</h1>
      </main>
    );
  }


  return (
    <StyledWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>

        <p className="message">Create a new account.</p>

        <label>
          <input
            required
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <span>Username</span>
        </label>

        <label>
          <input
            required
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <span>Email</span>
        </label>

        <label>
          <input
            required
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span>Password</span>
        </label>

        <button type="submit" className="submit">
          Register
        </button>

        <p className="signin">
          Already have an account? <Link to="/login">Signin</Link>
        </p>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 450px;
    max-width: 90%;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.25);
  }

  .title {
    font-size: 28px;
    color: royalblue;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0;
    background-color: royalblue;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .message,
  .signin {
    color: rgba(88, 87, 87, 0.822);
    font-size: 14px;
  }

  .signin {
    text-align: center;
  }

  .signin a {
    color: royalblue;
    text-decoration: none;
  }

  .signin a:hover {
    text-decoration: underline;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    width: 100%;
    padding: 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
    box-sizing: border-box;
  }

  .form label .input + span {
    position: absolute;
    left: 10px;
    top: 12px;
    color: grey;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
    background: white;
    padding: 0 4px;
  }

  .form label .input:focus + span,
  .form label .input:not(:placeholder-shown) + span {
    top: -8px;
    font-size: 0.7em;
    font-weight: 600;
    color: royalblue;
  }

  .submit {
    border: none;
    outline: none;
    background-color: royalblue;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      background-color 0.2s ease;
  }

  .submit:hover {
    background-color: rgb(56, 90, 194);
  }

  .submit:active {
    transform: scale(1.05);
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }
`;

export default Register;
