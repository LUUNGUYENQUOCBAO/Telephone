import { Image } from 'antd';
import React from 'react-slick'
import Slider from 'react-slick';
import { WrapperSlider, WrapperSliderStyle } from './style';

const SliderComponent = ({arrImages}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed:3000
    };
    return (
       <WrapperSliderStyle {...settings}>
            {arrImages.map((image)=>{
                return (
                    <Image key={image} src={image} alt='slider' preview={true} width="100%" height="350px"/>
                )
            })}
            
       </WrapperSliderStyle>
    )
}

export default SliderComponent