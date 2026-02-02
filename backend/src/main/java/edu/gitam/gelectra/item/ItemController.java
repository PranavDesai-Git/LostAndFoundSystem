package edu.gitam.gelectra.item;

import edu.gitam.gelectra.user.User;
import edu.gitam.gelectra.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:5173") // Allow React to connect
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private UserRepository userRepository;

    // GET ALL ITEMS
    @GetMapping
    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    // CREATE NEW ITEM
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        // For now, we manually set the time if not provided
        if (item.getDateTime() == null) {
            item.setDateTime(LocalDateTime.now());
        }

        // TEMPORARY: Link to the first user in DB until you have Auth/Sessions
        User defaultUser = userRepository.findAll().stream().findFirst().orElse(null);
        if (defaultUser != null) {
            item.setOwner(defaultUser);
        }

        return itemRepository.save(item);
    }

    // UPDATE ITEM
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item itemDetails) {
        return itemRepository.findById(id).map(item -> {
            item.setItemName(itemDetails.getItemName());
            item.setDescription(itemDetails.getDescription());
            item.setStatus(itemDetails.getStatus());
            return ResponseEntity.ok(itemRepository.save(item));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE ITEM
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(@PathVariable Long id) {
        return itemRepository.findById(id).map(item -> {
            itemRepository.delete(item);
            return ResponseEntity.ok().<Void>build();
        }).orElse(ResponseEntity.notFound().build());
    }
}