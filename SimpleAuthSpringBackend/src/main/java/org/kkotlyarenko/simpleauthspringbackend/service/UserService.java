package org.kkotlyarenko.simpleauthspringbackend.service;

import lombok.RequiredArgsConstructor;
import org.kkotlyarenko.simpleauthspringbackend.entity.User;
import org.kkotlyarenko.simpleauthspringbackend.exception.CustomAppException;
import org.kkotlyarenko.simpleauthspringbackend.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public void save(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public void delete(User user, String password) {
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new CustomAppException("Invalid password", HttpStatus.BAD_REQUEST);
        }
        userRepository.delete(user);
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new CustomAppException("User not found with ID: " + id, HttpStatus.BAD_REQUEST));
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(() -> new CustomAppException("Incorrect username or password", HttpStatus.UNAUTHORIZED));
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public void updatePassword(User user, String oldPassword, String newPassword) {
        if (newPassword.length() < 4) {
            throw new CustomAppException("Password must be at least 4 characters long", HttpStatus.BAD_REQUEST);
        }
        if (oldPassword.equals(newPassword)) {
            throw new CustomAppException("New password must be different from the old one", HttpStatus.BAD_REQUEST);
        }
        if (!checkPassword(oldPassword, user.getPassword())) {
            throw new CustomAppException("Invalid old password", HttpStatus.BAD_REQUEST);
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }
}
