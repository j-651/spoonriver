import React, { Component } from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import PropTypes from "prop-types"

import styles from "./layout.module.sass"

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = { query: "" }
    this.handleQuery = this.handleQuery.bind(this)
  }

  handleQuery(event) {
    this.setState({ query: event.target.value })
    this.props.parentCallback(event.target.value)
  }

  render() {
    return (
      <header className={styles.header}>
        <h4>
          <Link to="/about">About</Link>
          &nbsp;
          <a href="//spoonriver-web.netlify.com" rel="nofollow noreferrer">
            Interactive Web
          </a>
        </h4>
        <StaticQuery
          query={graphql`
            query SiteTitleQuery {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={(data) => (
            <h1>
              <Link to="/">{data.site.siteMetadata.title}</Link>
            </h1>
          )}
        />
        <input
          type="text"
          placeholder="Search"
          name="query"
          onChange={this.handleQuery}
        />
      </header>
    )
  }
}

Header.propTypes = {
  parentCallback: PropTypes.any,
}
