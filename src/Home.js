
import React, { useState } from 'react';
import './App.css';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import home1 from './images/home-1.png';
import home2 from './images/home-2.png';
import home3 from './images/home-3.png';
import home4 from './images/home-4.png';
import home5 from './images/home-5.png';

const  SliderData = [
	{
	  image:
		home1
	},
	{
	  image:
	  home2
	},
	{
	  image:
	  home3
	},
	{
	  image:
	  home4
	},
	{
	  image:
	  home5
	}
  ];



const ImageSlider = ({ slides }) => {
	const [current, setCurrent] = useState(0);
	const length = slides.length;
  
	const nextSlide = () => {
	  setCurrent(current === length - 1 ? 0 : current + 1);
	};
  
	const prevSlide = () => {
	  setCurrent(current === 0 ? length - 1 : current - 1);
	};
  
	if (!Array.isArray(slides) || slides.length <= 0) {
	  return null;
	}
  
	return (
	  <section className='slider'>
		<FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
		<FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
		{SliderData.map((slide, index) => {
		  return (
			<div
			  className={index === current ? 'slide active' : 'slide'}
			  key={index}
			>
			  {index === current && (
				<img src={slide.image} alt='travel image' className='image' />
			  )}
			</div>
		  );
		})}
	  </section>
	);
  };





function Home() {
	return <ImageSlider slides={SliderData} />;
}

export default Home;
