package francescobuonocore.capstone.controller;

import francescobuonocore.capstone.entities.User;
import francescobuonocore.capstone.exceptions.BadRequestException;
import francescobuonocore.capstone.payloads.NewUserDTO;
import francescobuonocore.capstone.services.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UsersService usersService;


    @GetMapping
    public Page<User> getUsers(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String orderBy) {
        return this.usersService.getUsers(page, size, orderBy);
    }
    @GetMapping("/{id}")
    public User getUsersById(@PathVariable long id) {
        return this.usersService.findById(id);
    }

    @PutMapping("/{id}")
    public User findAndUpdate(@PathVariable long id, @RequestBody User newUser) {
        return this.usersService.findAndUpdate(id, newUser);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void findAndDelete(@PathVariable long id) {
        this.usersService.findAndDelete(id);
    }
    @GetMapping("/me")
    public User getMe(@AuthenticationPrincipal User currentAuthenticatedUser) {
        return currentAuthenticatedUser;
    }

}
