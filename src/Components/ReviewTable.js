import React, {Component} from 'react';
import Review from "./Review";
import ReviewCard from "./ReviewCard"

export default class ReviewTable extends Component {

    render() {
        return (
            <div className="table-responsive">
                {
                    this.props.reviews.map((review, index) =>
                        <ReviewCard review={review}
                                    inProfile={this.props.inProfile}
                                    key={index}
                        />)
                }
            </div>
        )
    }
}