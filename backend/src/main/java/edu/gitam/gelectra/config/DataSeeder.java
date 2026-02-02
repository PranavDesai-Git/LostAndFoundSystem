package edu.gitam.gelectra.config;

import edu.gitam.gelectra.item.Item;
import edu.gitam.gelectra.item.ItemRepository;
import edu.gitam.gelectra.item.ItemStatus;
import edu.gitam.gelectra.user.User;
import edu.gitam.gelectra.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDateTime;

@Configuration
public class DataSeeder {

    @Bean
    CommandLineRunner initDatabase(UserRepository userRepository, ItemRepository itemRepository) {
        return args -> {
            // 1. Create a Test User
            User testUser = new User();
            testUser.setUserName("pranavdesai");
            testUser.setEmail("pranav.d@university.edu");
            testUser.setContactNumber("+1 555-0199");
            userRepository.save(testUser);

            // 2. Create some initial Items
            Item item1 = new Item();
            item1.setItemName("Airpods Pro");
            item1.setDescription("Left on the library table near the window.");
            item1.setStatus(ItemStatus.LOST);
            item1.setDateTime(LocalDateTime.now());
            item1.setOwner(testUser);
            itemRepository.save(item1);

            Item item2 = new Item();
            item2.setItemName("Car Keys");
            item2.setDescription("Tesla keychain found in the parking lot.");
            item2.setStatus(ItemStatus.FOUND);
            item2.setDateTime(LocalDateTime.now().minusDays(1));
            item2.setOwner(testUser);
            itemRepository.save(item2);

            System.out.println("DATABASE_SEEDED: User 'pranavdesai' and 2 items created.");
        };
    }
}