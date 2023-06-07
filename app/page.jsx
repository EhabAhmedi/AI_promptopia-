import React from 'react'
import Feed from "@components/Feed"
const Home = () => {
  return (
  <section className="w-full flex-center flex-col">
    <h1 className="head_text text-center">
      Discover and Share
      <br className="max-md:hidden" />
      &nbsp;
      <span className="orange_gradient">AI-Powered Prompts</span>
    </h1>
    <p>Promptopia is an open source AI prompting tool for the modern world. Discover, create, and share creative AI prompts.</p>
    <Feed />
  </section>
  )
}

export default Home;
