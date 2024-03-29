package francescobuonocore.capstone.services;

import francescobuonocore.capstone.entities.User;
import francescobuonocore.capstone.exceptions.BadRequestException;
import francescobuonocore.capstone.exceptions.UnauthorizedException;
import francescobuonocore.capstone.payloads.NewUserDTO;
import francescobuonocore.capstone.payloads.UserLoginDTO;
import francescobuonocore.capstone.repositories.UserRepository;
import francescobuonocore.capstone.security.JWTTools;
import francescobuonocore.capstone.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private PasswordEncoder bcrypt;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UsersService usersService;

    @Autowired
    private JWTTools jwtTools;

    public String authenticateAndGenerateToken(UserLoginDTO payload) {
        User user = usersService.findUserByEmail(payload.email());
        if (bcrypt.matches(payload.password(), user.getPassword())) {
            return jwtTools.createToken(user);
        } else {
            throw new UnauthorizedException("Wrong Credentials");
        }
    }
    public User saveUser(NewUserDTO payload) {
        if (payload.password() == null || payload.password().isEmpty()) {
            throw new BadRequestException("Password cannot be null");
        }
        userRepository.findByEmail(payload.email()).ifPresent(user -> {
            throw new BadRequestException("The email " + user.getEmail() + " is already used");
        });
        User newUser = new User(payload.username(), payload.name(), payload.surname(), payload.email(), bcrypt.encode(payload.password()));
        return userRepository.save(newUser);
    }
}