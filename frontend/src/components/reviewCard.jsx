import '../styles/reviewCard.css'; // Import custom CSS if needed

const ReviewCard = () => {
    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-lg-12">
                    <div className="mat-card mat-focus-indicator review-container">
                        <div className="customer-info">
                            <div className="profile">
                                <label className="profile-pic">
                                    <img alt="" className="avatar" src="main-img.png" />
                                </label>
                                <div className="profile-details">
                                    <span className="primary">Chris Olson</span>
                                    <div className="neighborhood">
                                        <img alt="city name" src="seatle.png" className="icon" style={{ width: '23px' }} />
                                        <span>Mukilteo</span>
                                    </div>
                                    <div className="neighborhood">
                                        <img alt="neighborhood name" src="home.png" className="icon" style={{ width: '35px' }} />
                                        <span>Fare harbor</span>
                                    </div>
                                    <div className="nextdoorreview">
                                        <p>nextdoor <span>review</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mat-card-content">
                            <div className="rating">
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <i className="fa fa-star" aria-hidden="true"></i>
                                <span className="date">Wed Dec 14 2022</span>
                            </div>
                            <div className="read-more">
                                <p className="read-more__text mb-2">
                                    Luke was very knowledgeable and friendly.
                                    He met expectations and in a timely manner. Prices were reasonable and I'd hire him again.
                                    Thanks, Luke.
                                </p>
                                <div className="readmore-emoji">
                                    <label className="read-more__label ms-2">Read More</label>
                                    <img src="emoji.webp" alt="" />
                                    <img className="sec-emoji" src="heart.png" alt="" />
                                    <sub>2</sub>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
