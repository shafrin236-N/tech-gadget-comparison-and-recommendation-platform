import React, {
  useState
} from "react";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  UserRound
} from "lucide-react";

import API_BASE_URL from "../api";


function Login() {

  const navigate =
    useNavigate();


  const [form, setForm] =
    useState({
      username: "",
      password: ""
    });


  const [showPassword, setShowPassword] =
    useState(false);


  const [loading, setLoading] =
    useState(false);


  const [message, setMessage] =
    useState("");


  const [error, setError] =
    useState("");


  const handleChange =
    (event) => {

      setForm({
        ...form,
        [event.target.name]:
          event.target.value
      });

    };


  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setLoading(true);
      setError("");
      setMessage("");


      try {

        const response =
          await fetch(
            `${API_BASE_URL}/auth/login`,
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json"
              },

              body:
                JSON.stringify(form)
            }
          );


        const data =
          await response.json();


        if (!response.ok) {

          throw new Error(
            data.detail ||
            "Login failed. Please check your credentials."
          );

        }


        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );


        setMessage(
          "Login successful. Redirecting..."
        );


        setTimeout(() => {
          navigate("/");
        }, 700);


      } catch (err) {

        console.error(err);

        setError(
          err.message ||
          "Unable to login."
        );

      } finally {

        setLoading(false);

      }

    };


  return (
    <div className="auth-page">

      <div className="auth-shell">

        {/* LEFT VISUAL PANEL */}

        <section className="auth-visual">

          <img
            src="/images/tech-products.jpg"
            alt="Modern technology products"
            className="auth-visual-image"
          />


          <div className="auth-visual-overlay" />


          <div className="visual-brand">

            <span className="brand-mark">
              T
            </span>

            <strong>
              TechCompare
            </strong>

          </div>


          <div className="visual-floating-card">

            <div className="floating-card-icon">
              <Sparkles size={17} />
            </div>

            <div>

              <span>
                SMART MATCH
              </span>

              <strong>
                Personalized picks
              </strong>

            </div>

          </div>


          <div className="auth-visual-content">

            <div className="visual-pill">

              <Sparkles size={14} />

              SMART TECH DISCOVERY

            </div>


            <h2>
              Make better
              tech decisions.
            </h2>


            <p>
              Compare products, discover better-fit
              gadgets and understand why each
              recommendation matches your needs.
            </p>


            <div className="visual-benefits">

              <div>

                <CheckCircle2 size={17} />

                <span>
                  Smart product comparison
                </span>

              </div>


              <div>

                <CheckCircle2 size={17} />

                <span>
                  Personalized recommendations
                </span>

              </div>


              <div>

                <CheckCircle2 size={17} />

                <span>
                  Transparent score breakdown
                </span>

              </div>

            </div>

          </div>


          <div className="visual-corner-note">

            <ShieldCheck size={15} />

            <span>
              Better decisions start with better information.
            </span>

          </div>

        </section>


        {/* RIGHT LOGIN PANEL */}

        <section className="auth-content">

          <div className="auth-content-inner">

            <div className="mobile-auth-brand">

              <span className="brand-mark">
                T
              </span>

              <strong>
                TechCompare
              </strong>

            </div>


            <div className="auth-heading">

              <span className="eyebrow">
                WELCOME BACK
              </span>

              <h1>
                Sign in to continue
              </h1>

              <p>
                Access your comparisons,
                recommendations and account.
              </p>

            </div>


            <form
              className="premium-auth-form"
              onSubmit={handleSubmit}
            >

              {/* USERNAME */}

              <label className="auth-field">

                <span className="auth-field-label">
                  Username
                </span>

                <div className="auth-input-wrapper">

                  <UserRound
                    size={17}
                    className="auth-input-icon"
                  />

                  <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Enter your username"
                    autoComplete="username"
                    required
                  />

                </div>

              </label>


              {/* PASSWORD */}

              <label className="auth-field">

                <span className="auth-field-label">
                  Password
                </span>

                <div className="auth-input-wrapper">

                  <LockKeyhole
                    size={17}
                    className="auth-input-icon"
                  />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                  />


                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}

                  </button>

                </div>

              </label>


              <div className="auth-options">

                <label className="remember-option">

                  <input
                    type="checkbox"
                  />

                  <span>
                    Keep me signed in
                  </span>

                </label>


                <button
                  type="button"
                  className="forgot-button"
                >
                  Forgot password?
                </button>

              </div>


              <button
                type="submit"
                className="premium-login-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="button-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={17} />
                  </>
                )}

              </button>


              {message && (
                <div className="auth-success">

                  <CheckCircle2 size={16} />

                  <span>
                    {message}
                  </span>

                </div>
              )}


              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

            </form>


            <div className="auth-register-prompt">

              <span>
                Don't have an account?
              </span>

              <Link to="/register">

                Create an account

                <ArrowRight size={14} />

              </Link>

            </div>


            <div className="auth-trust">

              <ShieldCheck size={16} />

              <div>

                <strong>
                  Account access
                </strong>

                <span>
                  Your sign-in is processed through
                  the TechCompare authentication system.
                </span>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}


export default Login;