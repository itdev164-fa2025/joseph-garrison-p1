import * as React from "react"
import { useState } from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import * as styles from "../components/index.module.css"
import { GatsbyImage } from "gatsby-plugin-image"
import styled from "styled-components"

const StyledListItem = styled.li`
  list-style: none;
  text-align: center;
  border: 1px solid #efefef;
  border-radius: 5px;
  padding: 10px;
  width: fit-content;
 
  &:hover {
    background-color: #f5f5f5;
    border-color: #ddd;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
`
 
const StyledLink = styled(Link)`
  text-decoration: none;
`
 
const StyledDiv = styled.div`
  margin-bottom: 10px;
`
 
const TagButton = styled.button`
  background-color: ${({ selected }) => (selected ? `var(--color-primary)` : `var(--color-bg-secondary)`)};
  color: ${({ selected }) => (selected ? `var(--color-text-light)` : `var(--color-text)`)};
  border: none;
  margin: 0 5px 10px;
  padding: 5px 20px;
  border-radius: 15px;
  cursor: pointer;
 
  &:hover {
    opacity: 0.9;
  }
`;

const IndexPage = ({ data }) => {
  const availableTags = data.allContentfulImageGallery.edges
    .flatMap(edge => edge.node.tags)
    .filter(tag => tag !== null)
    const distinctTags = Array.from(new Set(availableTags));
    console.log(distinctTags)
    const [selectedTag, setSelectedTag] = useState(null);
    const filteredImages = selectedTag ? data.allContentfulImageGallery.edges
    .filter(edge =>
        edge.node.tags && edge.node.tags.includes(selectedTag)
      )
      : data.allContentfulImageGallery.edges;
   

  return(
  <Layout>
    <Seo title="Home" />

    {distinctTags.length > 0 && (
        <div>
          <TagButton
            selected={!selectedTag}
            onClick={() => setSelectedTag(null)}
          > All </TagButton>
 
          {distinctTags.map(tag => (
            <TagButton
              key={tag}
              selected={selectedTag === tag}
              onClick={() => setSelectedTag(tag)}
            >
              {tag}
            </TagButton>
          ))}
        </div>
      )
      }
 
      <ul className={styles.list}>
        {
          filteredImages.map(edge => (
            <StyledListItem key={edge.node.title}>
              <StyledLink to={edge.node.slug}>
                <StyledDiv>
                  <GatsbyImage
                    image={edge.node.image.gatsbyImageData}
                  />
                </StyledDiv>
                <span>{edge.node.title}</span>
              </StyledLink>
            </StyledListItem>
          ))
        }
      </ul>

  </Layout>
)}
 
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
        tags
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
 

