import React, { Component } from 'react';
import AuthorProfile from '../AuthorProfile/AuthorProfile';

class Author extends Component {
    render() {
        return (
            <section className="author-area explore-area author-details-area  popular-collections-area">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12 col-md-12">
                            <AuthorProfile />
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Author;