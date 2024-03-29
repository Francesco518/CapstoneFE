package francescobuonocore.capstone.controller;

import francescobuonocore.capstone.entities.Movie;
import francescobuonocore.capstone.payloads.NewMoviePayload;
import francescobuonocore.capstone.services.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movies")
public class MovieController {
    @Autowired
    private MoviesService moviesService;

    @GetMapping
    public Page<Movie> getMovies(@RequestParam(defaultValue = "0") int page,
                                 @RequestParam(defaultValue = "10") int size,
                                 @RequestParam(defaultValue = "id") String orderBy) {
        return this.moviesService.getMovies(page, size, orderBy);
    }
    @GetMapping("/{id}")
    public Movie findById(@PathVariable long id) {
        return this.moviesService.findById(id);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Movie saveEvents(@RequestBody NewMoviePayload newMovie) {
        return moviesService.save(newMovie);
    }
    @PutMapping("/{id}")
    public Movie findAndUpdate(@PathVariable long id, @RequestBody NewMoviePayload newMovie) {
        return moviesService.findAndUpdate(id, newMovie);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void findAndDelete(@PathVariable long id) {
        this.moviesService.findAndDelete(id);
    }
    @GetMapping("/filter")
    public Page<Movie> filterMoviesByCategory(
            @RequestParam("category") String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size,
            @RequestParam(defaultValue = "id") String order
    ) {
        return moviesService.filterByCategory(category, page, size, order);
    }
}
