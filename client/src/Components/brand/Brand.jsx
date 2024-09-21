import React, { useEffect } from 'react'
import './brand.css'
import {google,slack,atlassian,dropbox,shopify} from './imports';
import Aos from 'aos';
import 'aos/dist/aos.css'
export default function Brand() {
  useEffect(()=>
  {
    Aos .init({duration:2000})
  },[])
  return (
      < div className="gpt3__brand section__padding" data-aos="fade-down">
       <div>
        <img src={google} alt="google"/>
        </div>
        <div>
        <img src={slack} alt="slack"/>
        </div>
        <div>
        <img src={atlassian} alt="atlasian"/>
        </div>
        <div>
        <img src={dropbox} alt="dropbox"/>
        </div>
        <div>
        <img src={shopify} alt="shopify"/>
        </div>
    

    </div>
  )
}
