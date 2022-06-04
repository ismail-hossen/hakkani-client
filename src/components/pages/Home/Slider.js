import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import './Slider.css'

const Slider = (props) => {
  return (
    <AliceCarousel
      touchTracking
      disableButtonsControls
      mouseTracking
      items={props.children}
    />
  );
};

export default Slider;
