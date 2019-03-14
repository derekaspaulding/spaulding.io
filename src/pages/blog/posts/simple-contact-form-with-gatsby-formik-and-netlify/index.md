---
title: Simple Contact Form with Gatsby, Formik and Netlify
description: How to build and deploy a simple contact form using GatsbyJS to bootstrap the project, Formik to make forms in React easy and Netlify for painless deployment.
date: '2019-03-13'
---

<hr />

**Note:** This post assumes you are comfortable working with the command line, have some intermediate knowledge of React, including the render props pattern, and have node, npm, and git installed. In order to follow this guide exactly, you will also need a [GitHub](https://github.com/) account and a [Netlify](https://www.netlify.com/) account. These are both free services.

<hr />

As a React developer, one of the trickiest common problems is forms. When redesigning this site, I wanted to find an easy way to handle some of the more tedious parts of the contact form. This search led me to [Formik](https://github.com/jaredpalmer/formik). Formik makes handling the form state, validation and submission seamless. In addition, [Netlify](https://www.netlify.com/) takes almost all the work out of deploying and handling the form submissions. Best of all, it's all free up to 100 submissions per month. Finally, we will use [GatsbyJS](https://www.gatsbyjs.org/) to get everything up and running easily. Now lets get started!

## Setup Gatsby Project

Gatsby is a static site generator that lets us use React to build a static site, such as this blog, without thinking about all the build setup. It also provides a lot of other useful and powerful features through its extensive plugin system, though we won't be using any of those for this project. 

The first step will be to get a Gatsby project up and running. The easiest way to do this is to use one of their [starter projects](https://www.gatsbyjs.org/starters/?v=2). In our case, we are going to use the `gatsby-starter-hello-world` starter. This is the most basic starter, without any extra plugins or other things we won't need and will only make things more confusing. 

To get started run: 
```
npx gatsby new contact-form-example https://github.com/gatsbyjs/gatsby-starter-hello-world
```

This command will pull down Gatsby if you don't have it, then run the Gatsby CLI to create a new `contact-form-example` directory which will be setup by cloning the gatsby starter at the repo specified in the URL. 

Now change into the directory with the new project and run:
```
npm run develop
```

This will start the gatsby development server which will watch for changes and recompile your project and reload the page in your browser when a change is detected. Now navigate to `http://localhost:8000` and you should see a blank page with the classic "Hello World!" greeting.

If you open the file at `src/pages/index.js`, you will see a very familiar, albeit simple, react component. It is a functional component which simply renders the "Hello World!" in a div. Gatsby takes any component you put in the `pages` directory and creates a static page from them at run time. Since this project will just be a single page with a contact form, we will be making all of our changes in this `index.js` file.

This barely scratches the surface of Gatsby, but is all that we need for now. If you want to explore more about what Gatsby can do, I encourage you to explore more of the documentation and community.

## Create the Form with Formik

Next, we will build out the contact form using the Formik library. To get started, we need to install it with npm:
```
npm install --save formik
```

Now, in the `src/pages/index.js` file, we will import Formik and setup the skeleton of our contact form:

```jsx
import React from "react"
import { Formik, Form, Field } from 'formik'

export default () => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      message: '',
    }}
    onSubmit={(values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }}
  >
  {() => (
    <Form>
      <label htmlFor="name">Name: </label>
      <Field name="name" />

      <label htmlFor="email">Email: </label>
      <Field name="email" />

      <label htmlFor="message">Message: </label>
      <Field name="message" component="textarea"/>

      <button type="submit">Send</button>
    </Form>
  )}
  </Formik>
)
```

There is quite a bit going on here, but a lot of it is pretty straightforward. We imported three components from Formik: the `Formik` parent component along with the `Form` and `Field` helper components. 

The `Formik` component is where we do all of our configuration. In this case, we set the initial values to be empty and add a dummy submit handler which alerts with the values entered in the form. The `Formik` component also sets up a context provider which lets the `Form` and `Field` helper components connect to the `Formik` component without any extra setup. 

The `Form` will render an HTML form element which handles calling the `onSubmit` handler that we setup in the `Formik` parent. The `Field` components will automatically update the form value based on the `name` property you give it. By default, they render as HTML inputs, but you can change that with the `component` prop. In our case we want the "message" field to be a textarea instead, so we pass `component="textarea"` to the last `Field` element. Finally, we just use plain HTML `label` elements and a standard submit `button` to finish the form skeleton. 

Now that we have the basic form functionality set up, lets take this a step further by adding some error validation:

```jsx
import { 
  Formik, 
  Form, 
  Field,
  // highlight-next-line
  ErrorMessage
} from 'formik'

export default () => (
  <Formik
    initialValues={{
      name: '',
      email: '',
      message: '',
    }}
    onSubmit={(values, actions) => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }}
    //highlight-start
    validate={values => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const errors = {};
      if(!values.name) {
        errors.name = 'Name Required'
      }
      if(!values.email || !emailRegex.test(values.email)) {
        errors.email = 'Valid Email Required'
      }
      if(!values.message) {
        errors.message = 'Message Required'
      }
      return errors;
    }}
    // highlight-end
  >
  {() => (
    <Form>
      <label htmlFor="name">Name: </label>
      <Field name="name" />
      // highlight-next-line
      <ErrorMessage name="name" />

      <label htmlFor="email">Email: </label>
      <Field name="email" />
      // highlight-next-line
      <ErrorMessage name="email" />

      <label htmlFor="message">Message: </label>
      <Field name="message" component="textarea"/>
      // highlight-next-line
      <ErrorMessage name="message" />

      <button type="submit">Send</button>
    </Form>
  )}
  </Formik>
)
```

The highlighted parts of code show all the changes we needed to make to implement some basic form validation. Now, if the user tries to submit without filling out all the fields, or if the email isn't a valid format, they will see a helpful error message and the `onSubmit` handler won't be called.

To do this, we imported another helper component called `ErrorMessage` from Formik and defined the validator function and passed it to the `validate` prop in the `Formik` parent component. This function is run on every value change. Note that we are validating all the fields on every run, not just the field that changed. You might expect that this would cause the error messages to display on all the fields after the first change to any field. This doesn't happen because the `Field` helper keeps track of whether the field has been touched or not. The `ErrorMessage` component then uses both the validation state and the 'touched' state to determine if the message should be shown. So we will only see the error if the field is invalid **and** been touched. Thanks to Formik though, we don't have to think about all of these special cases and keep all this state in sync. This is what makes Formik so useful

Now that we have a basic contact form with validation working, lets move on to deploying our app to Netlify. Once we have done that, we will come back to this component and fill in the onSubmit function to allow Netlify to also handle our form submission. 

## Deploy with Netlify

Deploying a Gatsby site to Netlify is incredibly easy. To start, create a new [GitHub](https://github.com) repository and commit what we have so far to the master branch. Then, head to [Netlify](https://www.netlify.com) and either log in or sign up. Once you are logged in, you should see a button that says "New site from Git". This will have you connect Netlify to your github account and you will be able to follow their instructions to setup a site being deployed from the master branch of the repo we just created. 

Once you connect Netlify to your GitHub repo, you should see a url that follows the pattern `https://${some-adjective}-${some-scientist's-last-name}-${commit-hash}.netlify.com`. Your app should be available at that URL. There is also a section called "Production Deploys", which will show you if there are new deploys running from a new commit and also the output of all other builds from previous commits. 

## Handle Form Submission

Now that we have the app being deployed, we can take advantage of Netlify form submission handling. Back in our `src/pages/index.js` file, we will fill in the `onSubmit` prop on the `Formik` parent component. 

Unfortunately we can't do exactly as is shown in Netlify's documentation by simply adding `method="POST"` and `data-netlify=true` to the form element. This won't work for us because we aren't using a standard html form element, we are using the form wrapper provided by Formik. The problem is that Formik prevents the default action and instead calls the `onSubmit` function in the `Formik` parent component. So, we will need to fill in the `onSubmit` function with a call to get Netlify to handle the submission.

First we need a helper function to encode the form the way Netlify expects it:
```js
const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}
```

This function simply takes an object such as 
```js
{
  firstKey: 'firstValue',
  secondKey: 'secondValue'
}
```

and turns it into a query string like string such as: `firstKey=firstValue&secondKey=secondValue`.

Next, we need to change our `onSubmit` function to send the form data to Netlify. 

```jsx
<Formik
    initialValues={{
      name: '',
      email: '',
      message: '',
    }}
    onSubmit={
      // highlight-start
      (values, actions) => {
        fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode({ "form-name": "contact-demo", ...values })
        })
        .then(() => {
          alert('Success');
          actions.resetForm()
        })
        .catch(() => {
          alert('Error');
        })
        .finally(() => actions.setSubmitting(false))
      }
      // highlight-end
    }
    validate={values => {
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const errors = {};
      if(!values.name) {
        errors.name = 'Name Required'
      }
      if(!values.email || !emailRegex.test(values.email)) {
        errors.email = 'Valid Email Required'
      }
      if(!values.message) {
        errors.message = 'Message Required'
      }
      return errors;
    }}
  >
    // highlight-next-line
    <Form name="contact-demo" data-netlify={true}>
    ...Form Components
    </Form>
  </Formik>
```

Here we did two things, we added `data-netlify={true}` to the `Form` component and added a fetch call to the `onSubmit` function. Formik's `Form` component will pass any `data-*` properties on to the underlying html `form` element for us. The `data-netlify` property is there to tell Netlify that we want it to handle this form. Once that is there, we can submit the form by posting it to the base url of our site.  

The `onSubmit` sends a POST request to Netlify to process the form. We give it the `Content-Type` header to tell it that we will be URL encoding the form data, then use our `encode` function to do that URL encoding which we then put in the body of the request. We also add the form's name in the body of the request before encoding it. 

If our request is successful, we alert with a success message and clear the form. Otherwise we alert with an error message and leave the form values as is. In either case, we make sure that we set the `submitting` state to false.

That's all the code we have to write to get the form submission all set up. You can now see any submissions in the "Forms" tab in the Netlify Dashboard for your site. Netlify also lets you set up notifications that will send you an email whenever there is a new submission. 

## Conclusion

I hope that this shows how simple creating a static site with a form can be easy in React. With Gatsby, Formik and Netlify, we can stop thinking too much about application bootstrapping, tedious form state, deployment and backend form handling. With all of that taken care of, we can focus on building our site while still keeping all the advantages of the great developer experience of React.