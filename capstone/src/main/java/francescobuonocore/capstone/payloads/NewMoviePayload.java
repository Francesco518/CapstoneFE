package francescobuonocore.capstone.payloads;

import lombok.Getter;

import java.util.List;

@Getter
public class NewMoviePayload {
    private long userId;

    private String title;

    private String description;

    private String category;

    private String poster;

    private String releaseDate;

    private List<String> actors;

    private List<String> streamingServices;
}
