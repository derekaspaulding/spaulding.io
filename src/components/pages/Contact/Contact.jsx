import React, { useState } from 'react';
import styles from './contact.module.less';
import MainLayout from '../../layouts/MainLayout'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import * as classnames from 'classnames';

const resizeTextarea = (event) => {
  const element = event.currentTarget;
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
}

function getFieldClasses(hasError) {
  const errorClass = hasError ? styles.hasError : null;
  return classnames(styles.field, errorClass);
}

const encode = (data) => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default () => { 
  const [showSuccess, setSuccess] = useState(false);
  const [showError, setError] = useState(false);

  return (
    <MainLayout title="Contact Me">
      <div className={styles.wrapper}>
        {
          showSuccess && 
          <div className={styles.success}>
            Message sent successfully. I will respond to the email provided as soon as possible. Thank you!
          </div>
        }
        {
          showError && 
          <div className={styles.submitError}>
            Message not sent. Please try again or contact me by email at
            {' '}<a href="mailto:derek@spaulding.io" className={styles.mailLink}>derek@spaulding.io</a>{' '}
          </div>
        }
        <p>
          You can contact me either by email at 
          {' '}<a href="mailto:derek@spaulding.io" className={styles.mailLink}>derek@spaulding.io</a>{' '}
          or by filling out the form below. I will reply as soon as possible.
        </p>

        <Formik
          initialValues={{
            name: '',
            email: '',
            message: '',
          }}
          validationSchema={
            yup.object().shape({
              name: yup.string().required('Required.'),
              email: yup.string().email('Must be a valid email.').required('Required.'),
              message: yup.string().required('Required.'),
            })
          }
          validateOnChange={true}
          onSubmit={
            (values, actions) => {
              fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: encode({ "form-name": "contact", ...values })
              })
              .then(() => {
                setError(false);
                setSuccess(true);
                actions.resetForm()
              })
              .catch(() => {
                setError(true);
                setSuccess(false);
              })
              .finally(() => actions.setSubmitting(false))
            }
          }
        >
          {({ isSubmitting, errors, touched }) => (
          <Form name="contact" data-netlify={true}>
            <div className={styles.formItem}>
              <label htmlFor="name" className={styles.label}>Name</label>
              <ErrorMessage name="name" component="div" className={styles.error}/>
              <Field name="name" id="name" className={getFieldClasses(touched.name && errors.name)}/>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <ErrorMessage name="email" component="div" className={styles.error}/>
              <Field type="email" name="email" id="email" className={getFieldClasses(touched.email && errors.email)}/>
            </div>
            <div className={styles.formItem}>
              <label htmlFor="message" className={styles.label}>Message</label>
              <ErrorMessage name="message" component="div" className={styles.error}/>
              <Field name="message" id="message" component="textarea" className={getFieldClasses(touched.message && errors.message)} rows={4} onInput={resizeTextarea}/>
            </div>
            <button type="submit" disabled={isSubmitting} className={styles.submit}>
              Submit
            </button>
          </Form>
        )}
        </Formik>
      </div>
    </MainLayout>
) }
