import React, { useEffect, useState } from 'react';
import StarRatingSelector from '../landing/stars';
import ReviewCard from '../landing/reviewCard';
import { FaStar } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
const Ratings = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    rating: 0,
    comment: '',
    photo: null,
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [average, setAverage] = useState(null);
  const [total, setTotal] = useState(0);

  const fetchReviews = () => {
    fetch('https://budgetbloom-app.onrender.com/api/reviews')
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.reviews.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setReviews(sorted);
        setAverage(data.averageRating);
        setTotal(data.totalReviews);
      })
      .catch(() => {
        alert('Failed to load reviews');
        setError('Failed to load reviews');
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleInput = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData((prev) => ({ ...prev, photo: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setSubmitted(false);

    if (!formData.name || !formData.rating || !formData.comment) {
      alert('Please fill in all fields and select a rating.');
      return;
    }

    setSubmitting(true);

    const body = new FormData();
    body.append('name', formData.name);
    body.append('rating', formData.rating);
    body.append('comment', formData.comment);
    if (formData.photo) {
      body.append('photo', formData.photo);
    }

    fetch('http://localhost:3201/api/reviews', {
      method: 'POST',
      body,
    })
      .then((res) => {
        if (!res.ok) return res.json().then((err) => { throw new Error(err.message); });
        return res.json();
      })
      .then(() => {
        setFormData({ name: '', rating: 0, comment: '', photo: null });
        alert('✅ Review submitted successfully!');
        setSubmitted(true);
        fetchReviews();
        setTimeout(() => setSubmitted(false), 3000);
      })
      .catch((err) => {
        console.error(err);
        alert(`❌ ${err.message}`);
        setError(err.message);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-800 py-16 px-6 md:px-16">
     
<div className="max-w-4xl mx-auto text-center">
  <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">User Reviews</h2>

  {/* ⭐ Average Rating Display */}
  {average !== null && (
    <div className="flex flex-col items-center justify-center mb-6">
      <StarRatings
        rating={parseFloat(average)}
        starRatedColor="#fbbf24"
        numberOfStars={5}
        starDimension="24px"
        starSpacing="3px"
        name="averageRating"
      />
      <p className="mt-2 text-gray-700 dark:text-white">
        <span className="font-semibold">{average}</span> average rating from <span className="font-semibold">{total}</span> reviews
      </p>
    </div>
  )}

  
        {/* Review Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow mb-12 space-y-4"
          encType="multipart/form-data"
        >
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Leave a Review</h3>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {submitted && <p className="text-green-600 text-sm">✅ Thank you! Your review has been posted.</p>}

          <input
            name="name"
            type="text"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInput}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
            required
          />

          <textarea
            name="comment"
            placeholder="Your Review"
            value={formData.comment}
            onChange={handleInput}
            rows={4}
            className="w-full p-2 rounded border dark:bg-gray-800 dark:text-white"
            required
          />
          
<StarRatingSelector
  rating={formData.rating}
  setRating={(rating) => setFormData((prev) => ({ ...prev, rating }))}
/>

          {/* 🖼️ File Upload */}
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleInput}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />

          <button
            type="submit"
            disabled={submitting}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>

        {/* Reviews */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Ratings;
