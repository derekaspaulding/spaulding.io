import React from 'react';
import styles from './mainLayout.module.less';
import { Helmet } from 'react-helmet'
import { Link } from 'gatsby'
import '../../../shared-styles/global.css'
import PartialMatchLink from '../../shared/PartialMatchLink';
import './prismjs-theme.css';


const MainLayout = ({ children, title }) => (
  <div className={styles.wrapper}>
    <Helmet htmlAttributes={{"lang": "en"}}>
      <title>{title ? `${title} - Derek Spaulding` : 'Derek Spaulding'}</title>
    </Helmet>

    <header className={styles.header}>
      <h1 className={styles.name}><span className={styles.nameAccent}>D</span>erek <span className={styles.nameAccent}>S</span>paulding</h1>
    </header>
    <nav className={styles.navContainer}>
      <Link className={styles.navLink} activeClassName={styles.active} to="/">About</Link>
      <PartialMatchLink className={styles.navLink} activeClassName={styles.active} to="/blog">Blog</PartialMatchLink>
      <PartialMatchLink className={styles.navLink} activeClassName={styles.active} to="/contact">Contact</PartialMatchLink>
    </nav>
    <main className={styles.content}>
      {children}
    </main>
  </div>
)

export default MainLayout;