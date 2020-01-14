import React from 'react'
import { graphql, useStaticQuery, Link } from 'gatsby'
import styled from 'styled-components'

const PortofolioItemWrapper = styled.div`
  display:flex;
  justify-content:center;
`

const PortofolioItem = styled.div`
  width:300px;
  border: 1px solid #efefef;
  padding: 16px;
  margin: 16px;
`
const PortofolioImage = styled.img`
  max-width: 100%;
`
export default () => {
  const { allWordpressWpPortofolio: { edges } } = useStaticQuery(graphql`
  {
    allWordpressWpPortofolio{
      edges{
        node{
          id
          slug
          title
          excerpt
          featured_media {
            source_url
          }
        }
      }
    }
  }
 `)
  return (
    <PortofolioItemWrapper>
      {edges.map(item => (
        <PortofolioItem key={item.node.id}>
          <h2>{item.node.title}</h2>
          <PortofolioImage src={item.node.featured_media.source_url} alt='thumbnail'></PortofolioImage>
          <div dangerouslySetInnerHTML={{ __html: item.node.excerpt }}></div>
          <Link to={`/portofolio/${item.node.slug}`}>
            Read more
          </Link>
        </PortofolioItem>
      ))}
    </PortofolioItemWrapper>
  );
}