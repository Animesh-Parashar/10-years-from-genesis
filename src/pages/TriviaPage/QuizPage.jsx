import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, get, push, set } from 'firebase/database';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import QuizComponent from './components/QuizComponent';
import Leaderboard from './components/Leaderboard';
import { 
  formatTime, 
  shuffleArray, 
  sortLeaderboard 
} from '../../utils/quiz-util';
import './QuizPage.css';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentSection, setCurrentSection] = useState('instructions'); // 'instructions', 'quiz', 'leaderboard'
  const [userAnswers, setUserAnswers] = useState({});
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userScore, setUserScore] = useState(null);
  const navigate = useNavigate();
  
  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        console.log("Fetching questions...");
        const db = getDatabase();
        const questionsRef = ref(db, 'questions');
        console.log("Database reference:", questionsRef);
        
        const snapshot = await get(questionsRef);
        console.log("Got snapshot", snapshot.exists());
        
        if (snapshot.exists()) {
          const questionsData = snapshot.val();
          console.log("Questions data:", questionsData);
          
          // Convert to array and shuffle
          const questionsArray = Object.keys(questionsData).map(key => ({
            id: key,
            ...questionsData[key]
          }));
          console.log("Questions array length:", questionsArray.length);
          if (questionsArray.length > 0) {
            setQuestions(shuffleArray(questionsArray));
          } else {
            console.error("Questions array is empty!");
          }
          // Use the utility function to shuffle questions
          
        } else {
          console.error("No questions found in database!");
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    
    fetchQuestions();
  }, []);
  
  // Start quiz function
  const startQuiz = () => {
    setCurrentSection('quiz');
    // Start timer
    const interval = setInterval(() => {
      setTimer(prevTime => prevTime + 1);
    }, 1000);
    setTimerInterval(interval);
  };
  
  // Handle answer selection for both MCQ and FITB
  const handleAnswerSelect = (questionId, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer
    });
    
    // Mark question as attempted in tracker
    const trackerCircle = document.getElementById(`tracker-${questionId}`);
    if (trackerCircle) {
      trackerCircle.classList.add('attempted');
    }
  };
  
  // Calculate score
  const calculateScore = () => {
    let score = 0;
    questions.forEach(question => {
      // Handle both MCQ and FITB in score calculation
      if (userAnswers[question.id]) {
        const userAnswer = userAnswers[question.id].toString().toLowerCase();
        const correctAnswer = question.correct.toString().toLowerCase();
        
        if (userAnswer === correctAnswer) {
          score++;
        }
      }
    });
    return score;
  };
  
  // Submit quiz
  
const submitQuiz = async () => {
  try {
    console.log("Submitting quiz...");
    clearInterval(timerInterval);
    
    if (questions.length === 0) {
      console.error("No questions to score!");
      navigate('/trivia/solutions');
      return;
    }
    
    // Calculate score
    const score = calculateScore();
    console.log("Score:", score, "out of", questions.length);
    console.log("User answers:", userAnswers);
    
    // Save score to database
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    
    if (!userId) {
      console.error("No user ID found!");
      return;
    }
    
    const db = getDatabase();
    
    // Get username
    let username = "Anonymous";
    try {
      const userRef = ref(db, `users/${userId}`);
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        username = userSnapshot.val().username || auth.currentUser.email || "Anonymous";
      }
    } catch (err) {
      console.error("Error fetching username:", err);
    }
    
    // Save detailed results including answers
    const quizResultData = {
      username,
      email: auth.currentUser.email,
      score,
      time: timer,
      createdAt: Date.now(),
      answers: userAnswers
    };
    
    console.log("Saving quiz result data:", quizResultData);
    
    // Save to quizResults/<userId>
    await set(ref(db, `quizResults/${userId}`), quizResultData);
    console.log("Quiz results saved successfully");
    
    // Save to scores collection for leaderboard
    const scoreData = {
      userId,
      username,
      score,
      time: timer,
      timestamp: Date.now()
    };
    
    await push(ref(db, 'scores'), scoreData);
    console.log("Score added to leaderboard");
    
    // Fetch leaderboard
    const scoresRef = ref(db, 'scores');
    const scoresSnapshot = await get(scoresRef);
    
    let sortedScores = [];
    
    if (scoresSnapshot.exists()) {
      // Use the utility function to sort leaderboard
      const scores = Object.values(scoresSnapshot.val());
      sortedScores = sortLeaderboard(scores);
      console.log("Leaderboard data:", sortedScores.slice(0, 10));
    } else {
      console.log("No existing scores found");
    }
    
    setLeaderboardData(sortedScores.slice(0, 10));  // Top 10
    setUserScore(scoreData);
    setCurrentSection('leaderboard');
  } catch (error) {
    console.error("Error submitting quiz:", error);
    alert("There was an error submitting your quiz. Please try again.");
  }
};

  // View solutions handler
  const handleViewSolutions = () => {
    navigate('/trivia/solutions');
  };

  // Retry quiz handler
  const handleRetryQuiz = () => {
    window.location.reload();
  };
  
  // Container variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  return (
    <div className="quiz-page-container">
      <AnimatePresence mode="wait">
        {currentSection === 'instructions' && (
          <motion.div 
            key="instructions"
            className="quiz-instructions"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <motion.h1 variants={itemVariants}>Ethereum 10th Anniversary Quiz</motion.h1>
            <motion.p variants={itemVariants}>
              Test your knowledge about Ethereum's 10-year journey! This quiz contains questions about
              Ethereum's history, technology, community, and future.
            </motion.p>
            <motion.div className="instruction-points" variants={itemVariants}>
              <p>📌 You will have unlimited time to complete the quiz</p>
              <p>📌 There are {questions.length} questions (multiple-choice and fill-in-the-blank)</p>
              <p>📌 Your score and completion time will be recorded</p>
              <p>📌 Try to answer correctly and quickly for the best score!</p>
            </motion.div>
            <motion.button
               className="trivia-button secondary"
                onClick={startQuiz}
                
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(127, 127, 213, 0.3)'
                }}
                whileTap={{ scale: 0.97 }}
                variants={itemVariants}
              >
                
                Start Quiz
              </motion.button>
              
            {/* <motion.button 
              onClick={startQuiz}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={itemVariants}
            >
              Start Quiz
            </motion.button> */}
          </motion.div>
        )}
        
        {currentSection === 'quiz' && (
          <motion.div 
            key="quiz"
            className="quiz-content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
          >
            <div className="quiz-header">
              <motion.div className="timer" variants={itemVariants}>
                Time: {formatTime(timer)}
              </motion.div>
              <motion.div className="question-tracker" variants={itemVariants}>
                {questions.map((q, index) => (
                  <div 
                    key={q.id}
                    id={`tracker-${q.id}`}
                    className={`tracker-circle ${userAnswers[q.id] ? 'attempted' : ''} ${q.type === 'fib' ? 'fib-type' : 'mcq-type'}`}
                  >
                    {index + 1}
                  </div>
                ))}
              </motion.div>
            </div>
            
            <motion.form className="quiz-form" variants={containerVariants}>
              {questions.map((question, qIndex) => (
                <QuizComponent 
                  key={question.id}
                  question={question}
                  questionIndex={qIndex}
                  onAnswerSelect={handleAnswerSelect}
                  selectedAnswer={userAnswers[question.id]}
                />
              ))}
              
              <motion.button 
                type="button"
                onClick={submitQuiz}
                className="submit-button"
                 whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 8px 25px rgba(127, 127, 213, 0.3)'
                }}
                whileTap={{ scale: 0.95 }}
                variants={itemVariants}
              >
                Submit Quiz
              </motion.button>
            </motion.form>
          </motion.div>
        )}
        
        {currentSection === 'leaderboard' && (
          <Leaderboard 
            leaderboardData={leaderboardData}
            userScore={userScore}
            formatTime={formatTime}
            questionCount={questions.length}
            onViewSolutions={handleViewSolutions}
            onRetryQuiz={handleRetryQuiz}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizPage;