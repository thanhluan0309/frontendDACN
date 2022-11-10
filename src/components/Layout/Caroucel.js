import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./style.css";
import Logomap from "../Dashboard/images/map.png";

const responsive = {
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 3,
    slidesToSlide: 3, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

export const Map = () => {
  return (
    <>
      <Carousel
        className="cssfor-carousel"
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        infinite={true}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        transitionDuration={0}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="padding: 33px 148px;"
        arrows={false}
      >
        <img className="cssforImageMap" src={Logomap} alt="Map1"></img>
        <img className="cssforImageMap" src={Logomap} alt="Map2"></img>
        <img className="cssforImageMap" src={Logomap} alt="Map3"></img>
        <img className="cssforImageMap" src={Logomap} alt="Map4"></img>
        <img className="cssforImageMap" src={Logomap} alt="Map5"></img>
        <img className="cssforImageMap" src={Logomap} alt="Map6"></img>
      </Carousel>
      ;
    </>
  );
};
