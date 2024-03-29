package francescobuonocore.capstone.controller;

import francescobuonocore.capstone.entities.Quiz;
import francescobuonocore.capstone.payloads.NewQuizPayload;
import francescobuonocore.capstone.services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
public class QuizController {
    @Autowired
    QuizService quizService;

    @GetMapping
    public Page<Quiz> getQuizzes(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size,
                                 @RequestParam(defaultValue = "id") String orderBy) {
        return this.quizService.getQuizzes(page, size, orderBy);
    }
    @GetMapping("/{id}")
    public Quiz findById(@PathVariable long id) {
        return this.quizService.findById(id);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Quiz saveEvents(@RequestBody NewQuizPayload newQuiz) {
        return this.quizService.save(newQuiz);
    }
    @PutMapping("/{id}")
    public Quiz findAndUpdate(@PathVariable long id, @RequestBody NewQuizPayload newQuiz) {
        return this.quizService.findAndUpdate(id, newQuiz);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void findAndDelete(@PathVariable long id) {
        this.quizService.findAndDelete(id);
    }
}
