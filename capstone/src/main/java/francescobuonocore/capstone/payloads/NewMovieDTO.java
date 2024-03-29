package francescobuonocore.capstone.payloads;

import jakarta.validation.constraints.NotEmpty;

import java.util.List;

public record NewMovieDTO(
        @NotEmpty(message = "The title is mandatory")
        String title,
        @NotEmpty(message = "The description is mandatory")
        String description,
        @NotEmpty(message = "The category is mandatory")
        String category,
        @NotEmpty(message = "The poster is mandatory")
        String poster,
        @NotEmpty(message = "The release date is mandatory")
        String releaseDate,
        @NotEmpty(message = "The actors are mandatory")
        List<String> actors,
        @NotEmpty(message = "The streaming services are mandatory")
        List<String> streamingServices


) {
}
