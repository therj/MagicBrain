import React from 'react'

const Register = ({ onRouteChange }) => {
  return (
    <article className="br3 ba shadow-5 b--black-10 mv4 w-100 w-60-m w-40-l center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 fw6 ph0 mh0"> Register Now </legend>

            <div className="mt3">
              <label className="db fw6 lh-copy f6" for="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
              />
            </div>

            <div className="mt3">
              <label className="db fw6 lh-copy f6" for="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" for="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input
              onClick={() => onRouteChange('home')}
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
          <div className="lh-copy mt3">
            <p
              onClick={() => onRouteChange('signin')}
              className="f6 link dim black db pointer"
            >
              Have an account? Sign In
            </p>
          </div>
        </div>
      </main>
    </article>
  )
}

export default Register
