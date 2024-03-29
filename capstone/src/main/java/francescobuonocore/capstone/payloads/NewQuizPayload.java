package francescobuonocore.capstone.payloads;

import lombok.Getter;

@Getter
public class NewQuizPayload {
    private long userId;
    private String textQuestion;

    private String[] optionsAnswer;

    private int correctAnswerIndex;
}
