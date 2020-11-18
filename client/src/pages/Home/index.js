import React, { Fragment, useEffect } from 'react';
import gsap from 'gsap';
import "animate.css/animate.min.css";
import Navigation from '../../components/Navbar/navbar';
import Typewriter from '../../components/typewriter';
import "./style.css";
let i = 0;
function ToRenderEverything() {
  useEffect(() => {
    i = 0;
    // gsap.from("#cardGreeting", { duration: 1, backgroundPosition: '-200px,0px', scale: 1.5, opacity: 0, ease: "power2.out" });
    gsap.from("#cardImage1", { duration: 2, x: 300, delay: 1, opacity: 0, ease: "power2.out" });
    gsap.from("#cloud", { duration: 2, x: 200, y: 200, opacity: 0, delay: 3, ease: "elastic" });
    gsap.from("#aside1", { duration: 1, opacity: 0, delay: 4, ease: "elastic" });
    var timerIntervalbefore = setInterval(function () {
      var timerInterval = setInterval(function () {
        let element = document.querySelector("span.n");
        if (!element) {
          clearInterval(timerInterval);
          clearInterval(timerIntervalbefore);
          return
        }
        element.className = "";
        element.className = "glow"
        if (i > 0) {
          document.querySelector(".glow").classList.remove("glow");
        }
        i++
        // if (i === 165) {
        //   i = 0;
        //   clearInterval(timerInterval);
        // }
      }, 80);
    }, 4000);
  }, []);
  let top = 0;
  let left = 0;
  top = window.innerHeight / 2;
  left = window.innerWidth / 2;


  var topval = `calc(100%-${top - 200}px)`, leftval = `calc(100%-${left - 150}px)`;

  return (
    <Fragment>
      <Navigation />
      <div className="container" style={{ maxWidth: "1440px", overflow: "hidden" }}>
        <main className="container">
          <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="text-light align-middle">
              <video autoPlay muted loop id="myVideo" className="d-none d-md-block">
                <source src={process.env.PUBLIC_URL + "./imgs/studiovideo.mp4"} type="video/mp4" />
              </video>
              <img
                src={process.env.PUBLIC_URL + "./imgs/dance.jpg"}
                alt="avatar"
                className="d-md-none" id="smScreenBg" width="500"
              />
              {/* <div className="card"  style={{ alignItems: "center", background: "transparent", borderColor: "transparent"}}> */}
              {/* <div className="card"  style={{ background: "transparent", borderColor: "transparent", position:"relative", top: calc("100vh"-"50px"), left: calc("100vh"-"40px") , height: "80%" }}> */}
              <img className={"d-flex flex-column justify-content-center  position-absolute"} id="cardImage1" src={process.env.PUBLIC_URL + "./imgs/logo.gif"}
                alt="Studio Logo" style={{ borderColor: "transparent", top: topval, left: leftval, width: "80%" }} />
              {/* <div className="card-img-overlay"> */}
              <figure id="cloud" style={{ top: "50px", width: "90%" }} className={"d-flex flex-column justify-content-center text-center position-relative"} >

                <p id="anim"><Typewriter text='Hello, ' />
                  <br /> <Typewriter text='Welcome to the home of the Best Time To Dance Studio' />
                  <br /><strong><Typewriter text="We're very happy to see you here" /></strong>
                  <br /><Typewriter text='If you have any questions, please feel free to call us at (123)456-1234. ' />
                </p>
              </figure>
              {/* </div> */}
              {/* </div> */}

            </div>
          </div>

        </main>

      </div>
    </Fragment >
  )
}

export default ToRenderEverything;