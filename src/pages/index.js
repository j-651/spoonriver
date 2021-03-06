import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import styles from "./index.module.sass"

export default class IndexPage extends Component {
  state = {
    query: "",
    name: "",
    altName: "",
    description: "",
    imageSource: "",
    relations: "",
  }

  queryCallbackFunction = (childData) => {
    this.setState({ query: childData })
  }

  handleClick = (name, alt_name, description, image_url, relations) =>
    this.setState({
      name: [name],
      altName: [alt_name],
      description: [description],
      imageSource: [image_url],
      relations: [relations],
    })

  render() {
    return (
      <Layout
        parentQueryCallback={this.queryCallbackFunction}
        hasDrawer={
          this.state.name.toString() && this.state.description.toString()
            ? "true"
            : "false"
        }
        drawerTitle={this.state.name.toString()}
        drawerAltName={this.state.altName.toString()}
        drawerBody={this.state.description.toString()}
        drawerImageSource={this.state.imageSource.toString()}
        drawerRelations={this.state.relations}
      >
        <SEO title="Home" />
        <StaticQuery
          query={graphql`
            query CurrentDataQuery {
              allCurrentDataJson {
                edges {
                  node {
                    id
                    name
                    alt_name
                    description
                    image_url
                    relations
                  }
                }
              }
            }
          `}
          render={(data) =>
            data.allCurrentDataJson &&
            data.allCurrentDataJson.edges.map(
              ({ node }, index) =>
                (node.name
                  .toLowerCase()
                  .includes(this.state.query.toLowerCase()) ||
                  node.alt_name
                    .toLowerCase()
                    .includes(this.state.query.toLowerCase()) ||
                  node.description
                    .toLowerCase()
                    .includes(this.state.query.toLowerCase())) && (
                  <div
                    key={index}
                    className={["slide", styles.slide, styles.entry].join(" ")}
                    onClick={this.handleClick.bind(
                      null,
                      node.name,
                      node.alt_name,
                      node.description,
                      node.image_url,
                      node.relations
                    )}
                  >
                    <div className={styles.inner}>
                      <h2>
                        {node.name}
                        <span>&rarr;</span>
                      </h2>
                    </div>
                  </div>
                )
            )
          }
        />
      </Layout>
    )
  }
}
