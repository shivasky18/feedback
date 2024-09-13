// src/components/FeedbackForm.js
import React, { useState } from 'react';
import './feedback.css'; // Import the CSS file

const FeedbackForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [feedback, setFeedback] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const formData = { name, email, feedback };
        
        fetch('/api/submit-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
            setMessage('Thank you for your feedback!');
            setName('');
            setEmail('');
            setFeedback('');
        })
        .catch(error => {
            setMessage('There was an error submitting your feedback.');
            console.error('Error:', error);
        });
    };

    return (
        <div className="feedback-container">
            <div className="feedback-display">
                <h2>What Our Users Say</h2>
                <div className="feedback-item">
                    <p><strong>John Doe:</strong> This is an amazing platform! It made my trip so much easier and enjoyable.</p>
                </div>
                <div className="feedback-item">
                    <p><strong>Jane Smith:</strong> I loved the local mentorship feature. It helped me connect with the locals and learn more about the city.</p>
                </div>
                <div className="feedback-item">
                    <p><strong>Emily Johnson:</strong> The all-in-one travel solution is fantastic. Everything I needed was in one place.</p>
                </div>
            </div>
            <div className="feedback-form">
                <h2>Submit Your Feedback</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <div className="input-container">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <label htmlFor="feedback">Feedback:</label>
                    <textarea
                        id="feedback"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        rows="4"
                        required
                    />
                    <button type="submit">Submit</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default FeedbackForm;
