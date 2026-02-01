package edu.gitam.gelectra;

import edu.gitam.gelectra.item.Item;
import edu.gitam.gelectra.item.ItemRepository;
import edu.gitam.gelectra.item.ItemStatus;
import edu.gitam.gelectra.user.User;
import edu.gitam.gelectra.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDateTime;

@SpringBootApplication
public class Main {
    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }
}