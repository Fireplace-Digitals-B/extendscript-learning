// Quiz functionality
const quizQuestions = document.querySelectorAll('.quiz-question');
const progressDots = document.querySelectorAll('.progress-dot');
let score = 0;
let currentQuestion = 0;

function showQuestion(index) {
    quizQuestions.forEach((q, i) => {
        q.classList.remove('active', 'previous');
        if (i < index) {
            q.classList.add('previous');
        } else if (i === index) {
            q.classList.add('active');
        }
    });

    // Update progress dots
    progressDots.forEach((dot, i) => {
        dot.classList.remove('active', 'completed');
        if (i < index) {
            dot.classList.add('completed');
        } else if (i === index) {
            dot.classList.add('active');
        }
    });
}

// Initialize first question
showQuestion(0);

quizQuestions.forEach((question, questionIndex) => {
    const options = question.querySelectorAll('.quiz-option');
    const feedback = question.querySelector('.quiz-feedback');
    
    options.forEach(option => {
        option.addEventListener('click', () => {
            // Only allow answering if current question and not already answered
            if (questionIndex === currentQuestion && 
                !option.classList.contains('selected') && 
                !option.classList.contains('correct') && 
                !option.classList.contains('incorrect')) {
                
                // Clear previous selection
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                const isCorrect = option.getAttribute('data-correct') === 'true';
                
                // Show result with delay for animation
                setTimeout(() => {
                    options.forEach(opt => {
                        if (opt.getAttribute('data-correct') === 'true') {
                            opt.classList.add('correct');
                        } else if (opt === option && !isCorrect) {
                            opt.classList.add('incorrect');
                        }
                    });

                    // Update feedback with animation
                    feedback.textContent = isCorrect ? 
                        '✨ Excellent! That\'s correct!' : 
                        '💡 Not quite. The highlighted answer is correct.';
                    feedback.className = 'quiz-feedback ' + (isCorrect ? 'correct' : 'incorrect');

                    // Update score
                    if (isCorrect) score++;

                    // Move to next question after delay
                    setTimeout(() => {
                        if (questionIndex < quizQuestions.length - 2) { // -2 because last slide is result
                            currentQuestion++;
                            showQuestion(currentQuestion);
                        } else {
                            // Show result slide
                            currentQuestion++;
                            showQuestion(currentQuestion);
                            // Show final score with slight delay for slide transition
                            setTimeout(() => {
                                const resultDiv = document.querySelector('.quiz-result');
                                resultDiv.textContent = `${getScoreMessage(score, quizQuestions.length - 1)} You got ${score} out of ${quizQuestions.length - 1} correct!`;
                                resultDiv.classList.add('show');
                            }, 500);
                        }
                    }, 1500);
                }, 300);
            }
        });
    });
});

function getScoreMessage(score, total) {
    const percentage = (score / total) * 100;
    if (percentage === 100) return '🌟 Perfect Score! ';
    if (percentage >= 70) return '🎉 Great Job! ';
    return '📚 Keep Learning! ';
}