import React from 'react';
import styles from './home.module.less';
import MainLayout from '../../components/layouts/MainLayout';
import headshot from './assets/headshot-circle.png';
import { Link } from 'gatsby'

export default () => (
  <MainLayout>
    <img className={styles.headshot} src={headshot} alt="" />
    <article className={styles.about}>
      <p>
        I am a software engineer at Code42 in Minneapolis, Minnesota. Day to day
        I work with a great team to build tools to help keep our customer's data
        safe. I earned a Bachelor's Degree in Computer Science with a minor in
        Mathematics from the University of Minnesota in 2017. I have been
        developing software professionally since 2016.
      </p>
      <p>
        My primary focus has been in frontend development, specifically in the
        React ecosystem with TypeScript. I also have professional experience
        working with Amazon Web Services. I have interests in many areas of
        software and technology. Check out my{" "}
        <a
          href="https://github.com/derekaspaulding"
          className={styles.bioLink}
        >
          Github profile
        </a>{" "}
        for examples of projects I have worked on. I also occasionally{" "}
        <Link className={styles.bioLink} to="/blog">
          write about my interests
        </Link>
        .
      </p>
    </article>
  </MainLayout>
);