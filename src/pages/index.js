import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"

const IndexPage = () => {
  const { allWordpressPage } = useStaticQuery(
    graphql`
    {
      allWordpressPage{
        edges{
          node{
            title
            content
          }
        }
      }
    }`
  )
  return (
    <Layout>
      {allWordpressPage.edges.map(page => <div key={page.node.id}>
        <h1>{page.node.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.node.content }}></div>
      </div>)}
    </Layout>
  )
}

export default IndexPage
