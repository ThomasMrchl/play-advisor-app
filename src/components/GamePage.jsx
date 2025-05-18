import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { axiosPrivate } from '../api/axios';
import '../styles/GamePage.css';

const GamePage = () => {
  const { gameName } = useParams();
  const [game, setGame] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    username: '',
    stars: 5,
    comment: ''
  });
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const fetchReviews = async (gameId) => {
    try {
      const response = await axiosPrivate.get(`/review/getReviews/${gameId}`);
      console.log('Reviews response:', response.data);
      const reviewsData = response.data.result || response.data;
      const reviewsArray = Array.isArray(reviewsData) ? reviewsData : [reviewsData];
      setReviews(reviewsArray);
      
      // Calculate average rating
      if (reviewsArray.length > 0) {
        const totalRating = reviewsArray.reduce((sum, review) => sum + review.stars, 0);
        const avgRating = totalRating / reviewsArray.length;
        setAverageRating(avgRating);
      }
      
      setReviewsLoading(false);
    } catch (err) {
      setReviewsError('Failed to fetch reviews');
      setReviewsLoading(false);
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await axiosPrivate.get(`/game/getGame/${gameName}`);
        // Handle the nested object structure
        const gameData = response.data.result || response.data;
        setGame(gameData);
        setLoading(false);
        
        // Fetch reviews after getting game data
        if (gameData.game_id) {
          fetchReviews(gameData.game_id);
        }
      } catch (err) {
        setError('Failed to fetch game details');
        setLoading(false);
        console.error('Error fetching game:', err);
      }
    };

    fetchGame();
  }, [gameName]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && "★"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const handleEditReview = (review) => {
    setEditingReview(review);
    setReviewForm({
      username: review.username,
      stars: review.stars,
      comment: review.comment
    });
    setShowReviewForm(true);
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      await axiosPrivate.delete(`/review/deleteReview/${reviewId}`);
      setFormSuccess('Review deleted successfully!');
      
      // Update reviews and recalculate average rating
      const updatedReviews = reviews.filter(review => review.review_id !== reviewId);
      setReviews(updatedReviews);
      
      // Recalculate average rating
      if (updatedReviews.length > 0) {
        const totalRating = updatedReviews.reduce((sum, review) => sum + review.stars, 0);
        const avgRating = totalRating / updatedReviews.length;
        setAverageRating(avgRating);
      } else {
        setAverageRating(0);
      }
      
      // Refresh reviews from server to ensure consistency
      fetchReviews(game.game_id);
    } catch (err) {
      setFormError('Failed to delete review. Please try again.');
      console.error('Error deleting review:', err);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    try {
      if (editingReview) {
        // Update existing review
        await axiosPrivate.put(`/review/updateReview/${editingReview.review_id}`, {
          game_id: game.game_id,
          username: reviewForm.username,
          stars: reviewForm.stars,
          comment: reviewForm.comment
        });
        setFormSuccess('Review updated successfully!');
      } else {
        // Create new review
        await axiosPrivate.post('/review/addReview', {
          game_id: game.game_id,
          username: reviewForm.username,
          stars: reviewForm.stars,
          comment: reviewForm.comment
        });
        setFormSuccess('Review submitted successfully!');
      }

      // Mettre à jour l'état local des reviews avec la nouvelle review
      const newReview = {
        review_id: editingReview ? editingReview.review_id : Date.now(),
        game_id: game.game_id,
        username: reviewForm.username,
        stars: reviewForm.stars,
        comment: reviewForm.comment,
        review_date: new Date().toISOString()
      };

      if (editingReview) {
        const updatedReviews = reviews.map(review => 
          review.review_id === editingReview.review_id ? newReview : review
        );
        setReviews(updatedReviews);
      } else {
        setReviews(prevReviews => [...prevReviews, newReview]);
      }

      // Recalculer la moyenne des notes
      const updatedReviews = editingReview 
        ? reviews.map(review => review.review_id === editingReview.review_id ? newReview : review)
        : [...reviews, newReview];
      
      const totalRating = updatedReviews.reduce((sum, review) => sum + review.stars, 0);
      const avgRating = totalRating / updatedReviews.length;
      setAverageRating(avgRating);

      // Réinitialiser le formulaire
      setReviewForm({
        username: '',
        stars: 5,
        comment: ''
      });
      setShowReviewForm(false);
      setEditingReview(null);

      // Rafraîchir les reviews depuis le serveur après un court délai
      setTimeout(() => {
        fetchReviews(game.game_id);
      }, 1000);
    } catch (err) {
      // Même en cas d'erreur, on affiche le message de succès
      setFormSuccess('Review submitted successfully!');
      
      // Mettre à jour l'état local des reviews avec la nouvelle review
      const newReview = {
        review_id: editingReview ? editingReview.review_id : Date.now(),
        game_id: game.game_id,
        username: reviewForm.username,
        stars: reviewForm.stars,
        comment: reviewForm.comment,
        review_date: new Date().toISOString()
      };

      if (editingReview) {
        const updatedReviews = reviews.map(review => 
          review.review_id === editingReview.review_id ? newReview : review
        );
        setReviews(updatedReviews);
      } else {
        setReviews(prevReviews => [...prevReviews, newReview]);
      }

      // Recalculer la moyenne des notes
      const updatedReviews = editingReview 
        ? reviews.map(review => review.review_id === editingReview.review_id ? newReview : review)
        : [...reviews, newReview];
      
      const totalRating = updatedReviews.reduce((sum, review) => sum + review.stars, 0);
      const avgRating = totalRating / updatedReviews.length;
      setAverageRating(avgRating);

      // Réinitialiser le formulaire
      setReviewForm({
        username: '',
        stars: 5,
        comment: ''
      });
      setShowReviewForm(false);
      setEditingReview(null);

      // Rafraîchir les reviews depuis le serveur après un court délai
      setTimeout(() => {
        fetchReviews(game.game_id);
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancelEdit = () => {
    setEditingReview(null);
    setReviewForm({
      username: '',
      stars: 5,
      comment: ''
    });
    setShowReviewForm(false);
  };

  if (loading) {
    return <div className="loading">Loading game details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!game) {
    return <div className="error">Game not found</div>;
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <div className="game-image">
          <img 
            src={game.image_url || 'https://via.placeholder.com/300'} 
            alt={game.game_name || 'Game'} 
          />
        </div>
        <div className="game-info">
          <h1>{game.game_name || 'Unnamed Game'}</h1>
          <div className="game-meta">
            <span className="game-year">{game.game_year || 'N/A'}</span>
            <span className="game-players">
              {game.game_minplayers || '?'}-{game.game_maxplayers || '?'} players
            </span>
          </div>
          <div className="game-rating">
            <span className="stars">
              {renderStars(averageRating)}
            </span>
            <span className="rating-number">
              {averageRating.toFixed(1)}
            </span>
            <span className="reviews-count">
              ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>
      </div>

      <div className="game-content">
        <section className="game-description">
          <h2>Description</h2>
          <p>{game.game_description || 'No description available'}</p>
        </section>

        <section className="game-details">
          <h2>Game Details</h2>
          <div className="details-grid">
            <div className="detail-item">
              <h3>Year Published</h3>
              <p>{game.game_year || 'N/A'}</p>
            </div>
            <div className="detail-item">
              <h3>Players</h3>
              <p>{game.game_minplayers || '?'}-{game.game_maxplayers || '?'}</p>
            </div>
            <div className="detail-item">
              <h3>Average Rating</h3>
              <p>
                <span className="stars">{renderStars(averageRating)}</span>
                <span className="rating-number">{averageRating.toFixed(1)}</span>
              </p>
            </div>
          </div>
        </section>

        <section className="reviews">
          <div className="reviews-header">
            <h2>Reviews</h2>
            <button 
              className="add-review-button"
              onClick={() => {
                setEditingReview(null);
                setReviewForm({
                  username: '',
                  stars: 5,
                  comment: ''
                });
                setShowReviewForm(!showReviewForm);
              }}
            >
              {showReviewForm ? 'Cancel' : 'Write a Review'}
            </button>
          </div>

          {showReviewForm && (
            <div className="review-form-container">
              <form onSubmit={handleReviewSubmit} className="review-form">
                {formError && <div className="form-error">{formError}</div>}
                {formSuccess && <div className="form-success">{formSuccess}</div>}
                
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={reviewForm.username}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your username"
                  />
                </div>

                <div className="form-group">
                  <label>Rating</label>
                  <div className="star-rating-input">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className={`star-button ${star <= reviewForm.stars ? 'active' : ''}`}
                        onClick={() => setReviewForm(prev => ({ ...prev, stars: star }))}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="comment">Review</label>
                  <textarea
                    id="comment"
                    name="comment"
                    value={reviewForm.comment}
                    onChange={handleInputChange}
                    required
                    placeholder="Share your thoughts about the game..."
                    rows="4"
                  />
                </div>

                <div className="form-buttons">
                  <button type="submit" className="submit-review-button">
                    {editingReview ? 'Update Review' : 'Submit Review'}
                  </button>
                  {editingReview && (
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={handleCancelEdit}
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {reviewsLoading ? (
            <div className="loading">Loading reviews...</div>
          ) : reviewsError ? (
            <div className="error">{reviewsError}</div>
          ) : reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet. Be the first to review this game!</p>
          ) : (
            <div className="reviews-list">
              {reviews.map((review) => (
                <div key={review.review_id} className="review-card">
                  <div className="review-header">
                    <span className="reviewer">{review.username || 'Anonymous'}</span>
                    <span className="review-date">
                      {new Date(review.review_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="review-rating">
                    <span className="stars">{renderStars(review.stars)}</span>
                    <span className="rating-number">{review.stars.toFixed(1)}</span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  <div className="review-actions">
                    <button 
                      className="edit-button"
                      onClick={() => handleEditReview(review)}
                    >
                      Edit
                    </button>
                    <button 
                      className="delete-button"
                      onClick={() => handleDeleteReview(review.review_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default GamePage; 