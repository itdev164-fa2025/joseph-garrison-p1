import React from "react";
import { graphql } from "gatsby";
import Layout from '../components/layout';
 
const ImageDetails = ({ data }) => {
    const { title } = data.contentfulImageGallery;
 
    return (
        <Layout>
            <h1>{title}</h1>
        </Layout>
    )
}
 
export default ImageDetails;
 
export const pageQuery = graphql`
    query imageGalleryQuery($slug: String!) {
        contentfulImageGallery(slug: {eq: $slug}) {
            title
        }
    }
`

