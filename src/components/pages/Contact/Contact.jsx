import React from 'react';
import styles from './contact.module.less';
import MainLayout from '../../layouts/MainLayout'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import * as classnames from 'classnames';

function getFieldClasses(hasError) {
  const errorClass = hasError ? styles.hasError : null;
  return classnames(styles.field, errorClass);
}

export default ({ showSuccess }) => (
  <MainLayout title="Contact Me">
    <div className={styles.wrapper}>
      {
        showSuccess && 
        <div className={styles.success}>
          Message sent successfully. I will respond to the email provided as soon as possible. Thank you!
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
      >
        {({ isSubmitting, errors, touched }) => (
        <Form method="POST" name="contact" data-netlify={true} action="/contact/success">
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
)

const resizeTextarea = (event) => {
  const element = event.currentTarget;
  console.log(element.scrollHeight)
  element.style.height = 'auto';
  element.style.height = `${element.scrollHeight}px`;
  console.log(element.style)
}