import React, {Component} from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class Rate extends Component{

    constructor(props) {
        super(props)
        this.state = {
            rating: 0
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.props.rateMovie(nextValue)
        this.setState({rating: nextValue});
    }

    render() {
        const { rating } = this.state;
        return (
            <div>
                <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>
        )
    }

}