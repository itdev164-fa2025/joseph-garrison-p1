import React from "react";
import { graphql } from "gatsby";
import Layout from '../components/layout';
import styled from "styled-components";
import { GatsbyImage } from "gatsby-plugin-image";
 
 
const StyledTag = styled.li`
    background-color: var(--color-bg-secondary);
    padding: 5px 20px;
    border-radius: 15px;
    width: fit-content;
`
const StyledHeading = styled.h1`
    margin-bottom: 10px;
`
 
const StyledContainer = styled.div`
    display: flex;
 
    & ul {
        margin-left: 0;
        margin-top: 30px;
    }
 
    & li {
        list-style: none;
        margin-bottom: 15px;
    }
 
    .image-details {
        padding-left: 35px;
    }
`

 
const ImageDetails = ({ data }) => {
    const imageDetails = data.contentfulImageGallery;
    const formattedDate = new Date(imageDetails.publishDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
 
    return (
        <Layout>
          <StyledContainer>
                <div>
                    <GatsbyImage
                        image={imageDetails.image.gatsbyImageData}
                    />
                </div>
                <div className="image-details">
                    <StyledHeading>{imageDetails.title}</StyledHeading>
                    <small>{formattedDate}</small>
                    {imageDetails.tags && (
                        <ul>
                            {
                                    imageDetails.tags.map(tag => (
                                        <StyledTag>{tag}</StyledTag>
                                    ))
                                }
                        </ul>
                    )}
 
                </div>
            </StyledContainer>


        </Layout>
    )
}
 
export default ImageDetails;
 
export const pageQuery = graphql`
    query imageGalleryQuery($slug: String!) {
        contentfulImageGallery(slug: {eq: $slug}) {
            title
            tags
            publishDate
            image {
                gatsbyImageData(
                    layout: CONSTRAINED
                    placeholder: BLURRED
                    width: 500
                )
            }
        }
    }
`

