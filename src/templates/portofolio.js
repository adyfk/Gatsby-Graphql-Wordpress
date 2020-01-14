import React from 'react'
import Layout from '../components/layout'
import styled from 'styled-components'

const FeaturedImage = styled.img`
  max-width: 300px;
  margin: 10px 0;
  
`

export default ({ pageContext }) => (
  <Layout>
    <h1 dangerouslySetInnerHTML={{ __html: pageContext.title }} />
    <FeaturedImage src={pageContext.featured_media.source_url} ></FeaturedImage>
    <div dangerouslySetInnerHTML={{ __html: pageContext.content }}></div>
  </Layout>
)