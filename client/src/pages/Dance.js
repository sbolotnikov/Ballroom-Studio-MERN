import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';

function DanceInspire(){
    useEffect( () => {
        console.log("on-load");
    }, []);

    return (
        <Fragment>
          
            <header className="masthead bg-light text-white text-center">
                <div className="container d-flex align-items-center flex-column">
                    <img className="masthead-avatar mb-5 rounded-circle" src="assets/img/me.jpg" alt="myself"/>
                    
                    <h1 className="masthead-heading mb-0 text-dark">We are continously inspired by Excellence in the field of 
                    danc. Here you can find links for  some of our colloaborators and biggest inspirations in the "World of Dance."</h1>
                </div>
            </header>

            <section className="page-section portfolio" id="portfolio">
                <div className="container">
                    <div className="text-center">
                        <h2 className="page-section-heading text-secondary mb-0 d-inline-block"></h2>
                    </div>
                    <div className="divider-custom">
                        <div className="divider-custom-line"></div>
                        <div className="divider-custom-icon"><i className="fas fa-book-open"></i></div>
                        <div className="divider-custom-line"></div>
                    </div>

                    <div className="row justify-content-center">
                        
                    <div className="col-md-6 col-lg-4 mb-5">
                            <div className="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal2">
                                <Link to="/pwr" className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                    <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                                </Link>
                                <img className="img-fluid" src="assets/img/portfolio/powernine.png" alt="Card Trading App"/>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal2">
                                <Link to="/rt" className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                    <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                                </Link>
                                <img className="img-fluid" src="assets/img/portfolio/repairtracker.png" alt="repairTracker"/>
                            </div>
                        </div>

                        <div className="col-md-6 col-lg-4 mb-5">
                            <div className="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal2">
                                <Link to="/fsf" className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                                    <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                                </Link>
                                <img className="img-fluid" src="assets/img/portfolio/fsfitness.png" alt="Fitness App"/>
                            </div>
                        </div>

                       
                    </div>
                </div>
            </section>

          
        </Fragment>
    )
}

export default DanceInspire;