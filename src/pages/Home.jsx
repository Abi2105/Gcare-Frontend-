import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'bootstrap/js/dist/carousel';
import { Header } from '../components/Navbar.jsx';
import ContactForm from '../components/ContactForm.jsx';
import VideoModal from '../components/VideoModal.jsx';
import { about, desktopSlides, mobileSlides, partners, videos } from '../data/site.js';

function BannerCarousel({ id, className, slides }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = Carousel.getOrCreateInstance(ref.current, { interval: 5000, ride: 'carousel' });
    c.cycle();
    return () => {
      // Bootstrap 5.1.3's dispose() leaves the autoplay interval running, so pause first.
      c.pause();
      c.dispose();
    };
  }, []);
  return (
    <div id={id} ref={ref} className={`carousel slide ${className}`} data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((src, i) => (
          <div className={`carousel-item${i === 0 ? ' active' : ''}`} data-bs-interval="5000" key={src}>
            <img src={src} className="d-block w-100" alt="..." />
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target={`#${id}`} data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target={`#${id}`} data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default function Home() {
  const [video, setVideo] = useState(null);
  const play = (v) => (e) => {
    e.preventDefault();
    setVideo(v.id);
  };

  return (
    <>
      <Header id="banner">
        <BannerCarousel id="carouselExampleInterval" className="d-none d-sm-none d-none d-md-block" slides={desktopSlides} />
        <BannerCarousel id="carouselMobileInterval" className="d-sm-block d-md-none" slides={mobileSlides} />
        <div className="overlap-wrapper d-flex  justify-content-center">
          <div className="center-overlap-wrapper row align-items-center">
            <div className="content-wrap col-lg-4 col-md-4">
              <label>LAND LINE NO. </label>
              <p>044-4358 1373 </p>
              <hr className="d-block d-sm-none" />
              <hr className="d-none d-sm-block d-md-none" />
            </div>
            <div className=" toll-no content-wrap col-lg-4 col-md-4">
              <label>TOLL FREE NO. </label>
              <p>1800 2032 685 </p>
              <hr className="d-block d-sm-none" />
              <hr className="d-none d-sm-block d-md-none" />
            </div>
            <div className="content-wrap col-lg-4 col-md-4">
              <label>WHATSAPP NO. </label>
              <p>73059 11160</p>
            </div>
          </div>
        </div>
      </Header>

      <section id="about-us">
        <div className="container about-us-wrapper">
          <div className="title">
            <h1>About Us</h1>
          </div>
          <div className="card-wrapper row col-12 justify-content-around align-items-baseline">
            {about.map((a) => (
              <div className="card col-4" key={a.title}>
                <div className="card-body text-center">
                  <h5 className="card-title ">
                    <img src={a.img} alt="man" />
                  </h5>
                  <h6 className="card-subtitle mb-2 ">{a.title}</h6>
                  <p className="card-text">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="partners">
        <div className="container">
          <div className="row">
            <h1>Our Associates / Partners</h1>
          </div>
          <marquee behavior="scroll" direction="left" className="row flex-wrap justify-content-center align-items-center d-block d-sm-none">
            {partners.slice(0, 10).map((p) => (
              <img key={p.src} src={p.src} alt={p.alt} />
            ))}
            <br />
            {partners.slice(10).map((p) => (
              <img key={p.src} src={p.src} alt={p.alt} />
            ))}
          </marquee>
          <div className=" d-none d-sm-none   d-md-block ">
            <div className="row flex-wrap justify-content-center align-items-center">
              {partners.map((p) => (
                <img key={p.src} src={p.src} alt={p.alt} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="gallery">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="left-content">
                <span className="">Gallery</span>
                <p>Our best moments of Gcare </p>
                <div className="d-none d-sm-block">
                  <button className="btn btn-primary d-md-none d-lg-block">
                    <Link to="/gallery">View More</Link>
                  </button>
                </div>
              </div>
            </div>
            <div className=" right-content col-12 col-lg-7">
              <div className="row">
                <div className="lift-img col-7">
                  <div className="big-img">
                    <img src="/assets/image4.png" alt="" />
                  </div>
                </div>
                <div className="right-img col-5 col-lg-5">
                  <div className="wrap-img">
                    <img src="/assets/Pondicherry_images/p5.jpg" alt="" />
                    <img src="/assets/image5.png" alt="" />
                    <img src="/assets/Rectangle3.png" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <button className="d-block d-sm-none d-lg-none d-md-block btn btn-primary m-auto mobile-btn">
                <Link to="/gallery">View More</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="demo-video">
        <div className="container">
          <div className="row video-wrapper">
            <div className="col-lg-6 lift-content d-flex flex-column justify-content-center">
              <span>Demo on our G-Care (ATM)</span>
              <p>
                Largest network of the world’s finest and brightest medical experts who provide compassionate care using
                outstanding expertise and advanced technology.
              </p>
            </div>
            <div className="col-lg-6 right-content" />
          </div>
          <div className="row link-section">
            <div className="english-link col-lg-3 ">
              <span>English</span>
              <br />
              <a href="#" className="english-video" data-video-id={videos.english.id} onClick={play(videos.english)}>
                {videos.english.url}
              </a>
            </div>
            <div className="tamil-link col-lg-9">
              <span>தமிழ்</span>
              <br />
              <a href="#" className="tamil-video" data-video-id={videos.tamil.id} onClick={play(videos.tamil)}>
                {videos.tamil.url}
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactForm />
      <VideoModal videoId={video} onClose={() => setVideo(null)} />
    </>
  );
}
