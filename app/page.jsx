"use client";
import { useState, useEffect, useCallback } from "react";
import Feed from "@components/Feed";

import Aos from "aos";
import 'aos/dist/aos.css'
const Home = () => {
useEffect(()=>{
  Aos.init({duration:2000});
},[])

  return (
    <section  className="w-full flex-center flex-col" data-aos="fade-up">
      <h1 className="head_text text-center">
        Discover & Share <br className="max-md:hidden" />
        <span className="orange_gradient text-center"> AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center" >
        Promptopia is an open-source AI prompting tool for modern wolrd to
        discover, create and share creative prompts
      </p>
      <Feed />
    </section>
  );
};

export default Home;