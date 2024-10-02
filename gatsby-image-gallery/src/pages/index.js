import * as React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import { GatsbyImage } from "gatsby-plugin-image"

const IndexPage = ({ data }) => (
  <Layout>
    <Seo title="Home" />
    <ul className={styles.list}>
      {
        data.allContentfulImageGallery.edges.map(edge => (
          <li key={edge.node.title}>
            <Link to={edge.node.slug}>{edge.node.title}</Link>
            <div>
              <GatsbyImage
                image={edge.node.image.gatsbyImageData}
              />
            </div>
          </li>
        ))
      }
    </ul>
  </Layout>
  )
 
/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />
 
export default IndexPage
 
export const query = graphql`
{
  allContentfulImageGallery {
    edges {
      node {
        title
        slug
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: BLURRED
            width: 300
          )
        }
      }
    }
  }
}`
 

