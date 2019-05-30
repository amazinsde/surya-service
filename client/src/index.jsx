import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import Slide from './Components/slide.jsx';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 95%;
  height: 280px;
  display: inline-block;
  margin: auto
`;

function CarNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", content: `url('https://s3.amazonaws.com/fec.amazin/Forward.png')` }}
      onClick={onClick}
    />
  );
}

function CarPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", content: `url('https://s3.amazonaws.com/fec.amazin/Back.png')` }}
      onClick={onClick}
    />
  );
}

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			carData: [],
		};
	}
	componentDidMount() {
    let uuid = props.uuid;
		axios
			.get('http://carousel.us-east-1.elasticbeanstalk.com/api/carousel', {
        params: {
          _id: uuid
        }
      })
			.then(prodData => {
				this.setState({
					carData: prodData.data,
				});
			})
			.catch(err => {
				console.log(err);
			});
	}
	render() {
		const settings = {
			dots: false,
			infinite: false,
			speed: 500,
			slidesToShow: 7,
			slidesToScroll: 7,
      arrows: true,
      nextArrow: <CarNextArrow />,
      prevArrow: <CarPrevArrow />
		};
		if (this.state.carData.length !== 0) {
			return (
				<Wrapper>
					<Slider {...settings}>
						{this.state.carData.map((prod) => (
							<Slide key={prod._id} image={prod.image} price={prod.price} name={prod.prodName}/>
						))}
					</Slider>
				</Wrapper>
			);
		} else {
			return <>Placeholder</>;
		}
	}
}

window.Carousel = Carousel;
// ReactDOM.render(<Carousel />, document.getElementsByClassName('carousel')[0]);
