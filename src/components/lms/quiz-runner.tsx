
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { Quiz, QuizQuestion } from '@/types';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Icons from '@/components/icons';
import { useLanguage } from '@/contexts/language-context';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface QuizRunnerProps {
  quiz: Quiz;
  onClose: () => void;
  onQuizComplete: (score: number, totalPoints: number, results: QuizQuestion[]) => void;
}

// Helper function to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  if (!array) return [];
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const QuizRunner: React.FC<QuizRunnerProps> = ({ quiz, onClose, onQuizComplete }) => {
  const { t } = useLanguage();
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string | boolean>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitMinutes * 60);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [finalResults, setFinalResults] = useState<QuizQuestion[]>([]);


  const handleSubmitQuiz = useCallback(() => {
    if (!shuffledQuestions || shuffledQuestions.length === 0) return;
    let currentScore = 0;
    let currentTotalPoints = 0;
    const results: QuizQuestion[] = shuffledQuestions.map(q => {
      currentTotalPoints += q.points;
      let isCorrect = false;
      if (q.type === 'mcq' && q.options) {
        const correctAnswer = q.options.find(opt => opt.isCorrect)?.id;
        isCorrect = userAnswers[q.id] === correctAnswer;
      } else if (q.type === 'tf') {
        isCorrect = userAnswers[q.id] === q.correctAnswer;
      }
      if (isCorrect) {
        currentScore += q.points;
      }
      return { ...q, userAnswer: userAnswers[q.id], isUserCorrect: isCorrect };
    });

    setScore(currentScore);
    setTotalPoints(currentTotalPoints);
    setFinalResults(results);
    setQuizFinished(true);
    onQuizComplete(currentScore, currentTotalPoints, results);
  }, [shuffledQuestions, userAnswers, onQuizComplete]);

  useEffect(() => {
    // Shuffle questions only once when the component mounts or quiz changes
    setShuffledQuestions(shuffleArray(quiz.questions || []));
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTimeLeft(quiz.timeLimitMinutes * 60);
    setQuizFinished(false);
    setScore(0);
  }, [quiz]);

  useEffect(() => {
    if (quizFinished || timeLeft <= 0 || shuffledQuestions.length === 0) {
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizFinished, shuffledQuestions.length, handleSubmitQuiz]);


  const handleAnswerSelect = (questionId: string, answer: string | boolean) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  if (shuffledQuestions.length === 0) {
    return (
        <Card className="w-full max-w-2xl mx-auto my-8">
            <CardHeader>
                <CardTitle>{t('lms.quizRunner.loadingErrorTitle', 'Quiz Error')}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{t('lms.quizRunner.loadingErrorMessage', 'Could not load quiz questions. Please try again later.')}</p>
            </CardContent>
            <CardFooter>
                <Button onClick={onClose}>{t('lms.quizRunner.closeButton', 'Close')}</Button>
            </CardFooter>
        </Card>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
  const timerPercentage = (timeLeft / (quiz.timeLimitMinutes * 60)) * 100;

  if (quizFinished) {
    return (
      <Card className="w-full max-w-2xl mx-auto my-8">
        <CardHeader>
          <CardTitle>{t('lms.quizRunner.resultsTitle', 'Quiz Results')}</CardTitle>
          <CardDescription>
            {t('lms.quizRunner.resultsFor', 'Results for: {{quizTitle}}', { quizTitle: t(quiz.titleKey, quiz.titleKey) })}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant={score >= totalPoints / 2 ? "default" : "destructive"} className="bg-green-50 dark:bg-green-900/30 border-green-500">
             <Icons.CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-700 dark:text-green-400">{t('lms.quizRunner.yourScore', 'Your Score')}</AlertTitle>
            <AlertDescription className="text-2xl font-bold text-green-700 dark:text-green-400">
              {score} / {totalPoints}
            </AlertDescription>
          </Alert>

          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {finalResults.map((q, index) => (
              <div key={q.id} className={`p-4 rounded-md border ${q.isUserCorrect ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700' : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700'}`}>
                <p className="font-semibold">{index + 1}. {q.text}</p>
                <p className="text-sm text-muted-foreground">
                  {t('lms.quizRunner.yourAnswer', 'Your answer: ')}
                  {q.userAnswer !== undefined ? (typeof q.userAnswer === 'boolean' ? (q.userAnswer ? t('lms.quizRunner.true', 'True') : t('lms.quizRunner.false', 'False')) : q.options?.find(opt => opt.id === q.userAnswer)?.text || t('lms.quizRunner.notAnswered', 'Not Answered')) : t('lms.quizRunner.notAnswered', 'Not Answered')}
                </p>
                {!q.isUserCorrect && (
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {t('lms.quizRunner.correctAnswer', 'Correct answer: ')}
                    {q.type === 'mcq' ? q.options?.find(opt => opt.isCorrect)?.text : (q.correctAnswer ? t('lms.quizRunner.true', 'True') : t('lms.quizRunner.false', 'False'))}
                  </p>
                )}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onClose} className="w-full">{t('lms.quizRunner.closeButton', 'Close')}</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto my-4 md:my-8 shadow-2xl">
      <CardHeader className="p-4 md:p-6 border-b">
        <div className="flex justify-between items-center mb-2">
            <CardTitle className="text-xl md:text-2xl font-headline text-primary">{t(quiz.titleKey, quiz.titleKey)}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose} aria-label={t('lms.quizRunner.closeButton', 'Close quiz')}>
                <Icons.X className="h-5 w-5"/>
            </Button>
        </div>
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{t('lms.quizRunner.questionProgress', 'Question {{current}} of {{total}}', { current: currentQuestionIndex + 1, total: shuffledQuestions.length })}</span>
          <div className="flex items-center">
            <Icons.Clock className="w-4 h-4 mr-1.5" />
            <span>{t('lms.quizRunner.timeLeft', 'Time: {{minutes}}:{{seconds}}', { minutes: Math.floor(timeLeft / 60).toString().padStart(2, '0'), seconds: (timeLeft % 60).toString().padStart(2, '0') })}</span>
          </div>
        </div>
        <Progress value={timerPercentage} className="h-2 mt-2 bg-accent" />

      </CardHeader>
      <CardContent className="p-4 md:p-6 space-y-6">
        <div className="mb-1">
            <Progress value={progressPercentage} className="h-1.5" />
        </div>
        <p className="text-lg md:text-xl font-semibold text-foreground">{currentQuestion.text}</p>
        {currentQuestion.type === 'mcq' && currentQuestion.options && (
          <RadioGroup
            value={userAnswers[currentQuestion.id] as string | undefined}
            onValueChange={(value) => handleAnswerSelect(currentQuestion.id, value)}
            className="space-y-3"
          >
            {currentQuestion.options.map((option) => (
              <Label
                key={option.id}
                htmlFor={option.id}
                className="flex items-center space-x-3 p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer has-[:checked]:bg-accent has-[:checked]:border-primary has-[:checked]:text-accent-foreground"
              >
                <RadioGroupItem value={option.id} id={option.id} />
                <span className="text-base">{option.text}</span>
              </Label>
            ))}
          </RadioGroup>
        )}
        {currentQuestion.type === 'tf' && (
          <div className="flex space-x-4">
            <Button
              variant={userAnswers[currentQuestion.id] === true ? 'default' : 'outline'}
              onClick={() => handleAnswerSelect(currentQuestion.id, true)}
              className="flex-1 py-3 text-base"
            >
              {t('lms.quizRunner.true', 'True')}
            </Button>
            <Button
              variant={userAnswers[currentQuestion.id] === false ? 'default' : 'outline'}
              onClick={() => handleAnswerSelect(currentQuestion.id, false)}
              className="flex-1 py-3 text-base"
            >
              {t('lms.quizRunner.false', 'False')}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 md:p-6 border-t">
        <Button onClick={handleNextQuestion} className="w-full text-base py-3">
          {currentQuestionIndex === shuffledQuestions.length - 1
            ? t('lms.quizRunner.submitButton', 'Submit Quiz')
            : t('lms.quizRunner.nextButton', 'Next Question')}
          <Icons.ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
};

