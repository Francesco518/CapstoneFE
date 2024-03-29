package francescobuonocore.capstone.services;

import francescobuonocore.capstone.entities.Quiz;
import francescobuonocore.capstone.entities.User;
import francescobuonocore.capstone.exceptions.NotFoundException;
import francescobuonocore.capstone.payloads.NewQuizPayload;
import francescobuonocore.capstone.repositories.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;
    @Autowired
    private UsersService usersService;

    public Page<Quiz> getQuizzes(int pageNum, int size, String orderBy) {
        Pageable pageable = PageRequest.of(pageNum, size, Sort.by(orderBy));
        return quizRepository.findAll(pageable);
    }
    public Quiz findById(long id) {
        return this.quizRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }
    public Quiz save(NewQuizPayload body) {
        Quiz quiz = new Quiz();
        quiz.setTextQuestion(body.getTextQuestion());
        quiz.setOptionsAnswer(body.getOptionsAnswer());
        quiz.setCorrectAnswerIndex(body.getCorrectAnswerIndex());
        return this.quizRepository.save(quiz);
    }
    public Quiz findAndUpdate(long id, NewQuizPayload newQuiz) {
        Quiz found = this.findById(id);
        found.setTextQuestion(newQuiz.getTextQuestion());
        found.setOptionsAnswer(newQuiz.getOptionsAnswer());
        found.setCorrectAnswerIndex(newQuiz.getCorrectAnswerIndex());

        return quizRepository.save(found);
    }
    public void findAndDelete(long id) {
        Quiz found = this.findById(id);
        this.quizRepository.delete(found);
    }
}
