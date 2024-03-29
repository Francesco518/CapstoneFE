package francescobuonocore.capstone.payloads;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record NewQuizDTO(
        @NotEmpty(message = "The Question is mandatory")
        String textQuestion,
        @NotEmpty(message = "The Options are mandatory")
        List<String> optionsAnswer,
        @NotEmpty(message = "The Correct Answer is mandatory")
        int correctAnswerIndex
) {
}
