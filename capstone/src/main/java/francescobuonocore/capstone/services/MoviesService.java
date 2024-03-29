package francescobuonocore.capstone.services;

import francescobuonocore.capstone.entities.Movie;
import francescobuonocore.capstone.entities.User;
import francescobuonocore.capstone.exceptions.NotFoundException;
import francescobuonocore.capstone.payloads.NewMoviePayload;
import francescobuonocore.capstone.repositories.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MoviesService {
    @Autowired
    private MovieRepository movieRepository;

    @Autowired
    private UsersService usersService;

    public Page<Movie> getMovies(int pageNum, int size, String orderBy) {
        Pageable pageable = PageRequest.of(pageNum, size, Sort.by(orderBy));
        return movieRepository.findAll(pageable);
    }

    public Movie findById(long id) {
        return this.movieRepository.findById(id).orElseThrow(() -> new NotFoundException(id));
    }

    public Movie save(NewMoviePayload body) {
        Movie movie = new Movie();
        movie.setTitle(body.getTitle());
        movie.setDescription(body.getDescription());
        movie.setCategory(body.getCategory());
        movie.setPoster(body.getPoster());
        movie.setReleaseDate(body.getReleaseDate());
        movie.setActors(body.getActors());
        movie.setStreamingServices(body.getStreamingServices());
        return this.movieRepository.save(movie);
    }
    public Movie findAndUpdate(long id, NewMoviePayload newMovie) {
        Movie found = this.findById(id);
        found.setTitle(newMovie.getTitle());
        found.setDescription(newMovie.getDescription());
        found.setCategory(newMovie.getCategory());
        found.setPoster(newMovie.getPoster());
        found.setReleaseDate(newMovie.getReleaseDate());
        found.setActors(newMovie.getActors());
        found.setStreamingServices(newMovie.getStreamingServices());

        return movieRepository.save(found);
    }
    public void findAndDelete(long id) {
        Movie found = this.findById(id);
        this.movieRepository.delete(found);
    }
    public Page<Movie> findByCategory(int page, int size, String order, String category) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(order));
        return movieRepository.findByCategory(category, pageable);
    }
    public Page<Movie> filterByCategory(String category, int page, int size, String order) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(order));
        return movieRepository.findByCategory(category, pageable);
    }
}
