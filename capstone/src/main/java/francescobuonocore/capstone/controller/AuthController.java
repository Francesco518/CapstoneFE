package francescobuonocore.capstone.controller;

import francescobuonocore.capstone.entities.User;
import francescobuonocore.capstone.payloads.LoginResponseDTO;
import francescobuonocore.capstone.payloads.NewUserDTO;
import francescobuonocore.capstone.payloads.UserLoginDTO;
import francescobuonocore.capstone.services.AuthService;
import francescobuonocore.capstone.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private UsersService usersService;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody UserLoginDTO payload) {
        return new LoginResponseDTO(authService.authenticateAndGenerateToken(payload));
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public User saveUser(@RequestBody NewUserDTO newUser) {
        return this.authService.saveUser(newUser);
    }
}
