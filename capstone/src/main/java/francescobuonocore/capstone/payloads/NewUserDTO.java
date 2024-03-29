package francescobuonocore.capstone.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public record NewUserDTO(
        @NotBlank(message = "The username is mandatory")
        String username,
        @NotBlank(message = "The name is mandatory")
        String name,
        @NotBlank(message = "The surname is mandatory")
        String surname,
        @Email(message = "You need to insert a proper email")
        @NotBlank(message = "The email is mandatory")
        String email,
        @NotBlank(message = "The password is mandatory")
        @Size(min = 5, max = 20, message = "Password's length must be between 5 and 20 characters")
        String password
) {
}
