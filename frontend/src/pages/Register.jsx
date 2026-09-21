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
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound
} from "lucide-react";

import API_BASE_URL from "../api";


function Register() {

  const navigate =
    useNavigate();


  const [form, setForm] =
    useState({
      username: "",
      email: "",
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


  const passwordLength =
    form.password.length;


  const passwordStrength =
    passwordLength >= 10
      ? "Strong"
      : passwordLength >= 6
      ? "Medium"
      : "Weak";


  const passwordWidth =
    passwordLength >= 10
      ? "100%"
      : passwordLength >= 6
      ? "65%"
      : passwordLength > 0
      ? "30%"
      : "0%";


  const handleSubmit =
    async (event) => {

      event.preventDefault();

      setLoading(true);
      setError("");
      setMessage("");


      try {

        const response =
          await fetch(
            `${API_BASE_URL}/auth/register`,
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
            "Registration failed."
          );

        }


        setMessage(
          "Account created successfully. Redirecting..."
        );


        setTimeout(() => {
          navigate("/login");
        }, 900);


      } catch (err) {

        console.error(err);

        setError(
          err.message ||
          "Unable to register."
        );

      } finally {

        setLoading(false);

      }

    };


  return (
    <div className="auth-page">

      <div className="auth-shell">

        {/* VISUAL PANEL */}

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
                DISCOVER BETTER
              </span>

              <strong>
                Tech that fits you
              </strong>

            </div>

          </div>


          <div className="auth-visual-content">

            <div className="visual-pill">

              <Sparkles size={14} />

              WELCOME TO TECHCOMPARE

            </div>


            <h2>
              Your next gadget
              starts here.
            </h2>


            <p>
              Explore products, compare important
              metrics and discover options suited
              to the way you use technology.
            </p>


            <div className="visual-benefits">

              <div>
                <CheckCircle2 size={17} />
                <span>
                  Explore the product catalog
                </span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                <span>
                  Compare products side by side
                </span>
              </div>

              <div>
                <CheckCircle2 size={17} />
                <span>
                  Get personalized recommendations
                </span>
              </div>

            </div>

          </div>

        </section>


        {/* FORM PANEL */}

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
                GET STARTED
              </span>

              <h1>
                Create your account
              </h1>

              <p>
                Join TechCompare and start exploring
                smarter gadget choices.
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
                    placeholder="Choose a username"
                    autoComplete="username"
                    required
                  />

                </div>

              </label>


              {/* EMAIL */}

              <label className="auth-field">

                <span className="auth-field-label">
                  Email address
                </span>

                <div className="auth-input-wrapper">

                  <Mail
                    size={17}
                    className="auth-input-icon"
                  />

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
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
                    placeholder="Create a password"
                    autoComplete="new-password"
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
                  >

                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}

                  </button>

                </div>


                {form.password && (

                  <div className="password-strength">

                    <div className="password-strength-top">

                      <span>
                        Password strength
                      </span>

                      <strong>
                        {passwordStrength}
                      </strong>

                    </div>


                    <div className="password-strength-track">

                      <div
                        className="password-strength-fill"
                        style={{
                          width:
                            passwordWidth
                        }}
                      />

                    </div>

                  </div>

                )}

              </label>


              <button
                type="submit"
                className="premium-login-button"
                disabled={loading}
              >

                {loading ? (
                  <>
                    <span className="button-spinner" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
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
                Already have an account?
              </span>

              <Link to="/login">

                Sign in

                <ArrowRight size={14} />

              </Link>

            </div>


            <div className="auth-trust">

              <ShieldCheck size={16} />

              <div>

                <strong>
                  Create your account
                </strong>

                <span>
                  Use your TechCompare account to
                  access the platform.
                </span>

              </div>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}


export default Register;