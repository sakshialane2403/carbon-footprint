package com.infosys.carbonfootprint.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.infosys.carbonfootprint.entity.ActivityType;
import com.infosys.carbonfootprint.entity.Category;
import com.infosys.carbonfootprint.entity.EmissionFactor;
import com.infosys.carbonfootprint.repository.ActivityTypeRepository;
import com.infosys.carbonfootprint.repository.CategoryRepository;
import com.infosys.carbonfootprint.repository.EmissionFactorRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class MasterDataController {

    private final CategoryRepository categoryRepository;
    private final ActivityTypeRepository activityTypeRepository;
    private final EmissionFactorRepository emissionFactorRepository;

    public MasterDataController(
        CategoryRepository categoryRepository,
        ActivityTypeRepository activityTypeRepository,
        EmissionFactorRepository emissionFactorRepository) {
        this.categoryRepository = categoryRepository;
        this.activityTypeRepository = activityTypeRepository;
        this.emissionFactorRepository = emissionFactorRepository;
    }

    @GetMapping("/categories")
    public List<Category> categories() { return categoryRepository.findAll(); }

    @PostMapping("/categories")
    public ResponseEntity<?> addCategory(@RequestBody Category c) {
        if (c.getCategoryName() == null || c.getCategoryName().isBlank()) {
            throw new IllegalArgumentException("Category Name cannot be empty.");
        }
        if (c.getDescription() == null || c.getDescription().isBlank()) {
            throw new IllegalArgumentException("Description is mandatory.");
        }
        if (c.getStatus() == null || c.getStatus().isBlank()) {
            throw new IllegalArgumentException("Status is mandatory.");
        }
        if (categoryRepository.existsByCategoryNameIgnoreCase(c.getCategoryName())) {
            throw new IllegalArgumentException("Category Name must be unique.");
        }
        return ResponseEntity.ok(categoryRepository.save(c));
    }

    @PutMapping("/categories/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody Category patch) {
        Category c = categoryRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Category not found"));
        c.setCategoryName(patch.getCategoryName());
        c.setDescription(patch.getDescription());
        c.setStatus(patch.getStatus());
        c.setCategoryCode(patch.getCategoryCode());
        return categoryRepository.save(c);
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        categoryRepository.deleteById(id);
        return ResponseEntity.ok("Category deleted");
    }

    @GetMapping("/activity-types")
    public List<ActivityType> types() { return activityTypeRepository.findAll(); }

    @PostMapping("/activity-types")
    public ActivityType addType(@RequestBody ActivityType t) {
        if (t.getCategory() == null) throw new IllegalArgumentException("Category is mandatory.");
        if (t.getActivityName() == null || t.getActivityName().isBlank()) {
            throw new IllegalArgumentException("Activity Name is mandatory.");
        }
        if (t.getUnit() == null || t.getUnit().isBlank()) {
            throw new IllegalArgumentException("Unit is mandatory.");
        }
        return activityTypeRepository.save(t);
    }

    @PutMapping("/activity-types/{id}")
    public ActivityType updateType(@PathVariable Long id, @RequestBody ActivityType patch) {
        ActivityType t = activityTypeRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        t.setActivityName(patch.getActivityName());
        t.setUnit(patch.getUnit());
        t.setDescription(patch.getDescription());
        t.setStatus(patch.getStatus());
        return activityTypeRepository.save(t);
    }

    @DeleteMapping("/activity-types/{id}")
    public ResponseEntity<String> deleteType(@PathVariable Long id) {
        activityTypeRepository.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }

    @GetMapping("/emission-factors")
    public List<EmissionFactor> factors() { return emissionFactorRepository.findAll(); }

    @PostMapping("/emission-factors")
    public EmissionFactor addFactor(@RequestBody EmissionFactor f) {
        if (f.getActivityType() == null) throw new IllegalArgumentException("Activity type is mandatory.");
        if (f.getEmissionFactor() == null) throw new IllegalArgumentException("Emission factor is mandatory.");
        return emissionFactorRepository.save(f);
    }

    @PutMapping("/emission-factors/{id}")
    public EmissionFactor updateFactor(@PathVariable Long id, @RequestBody EmissionFactor patch) {
        EmissionFactor f = emissionFactorRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found"));
        f.setEmissionFactor(patch.getEmissionFactor());
        f.setUnit(patch.getUnit());
        f.setSourceName(patch.getSourceName());
        f.setStatus(patch.getStatus());
        return emissionFactorRepository.save(f);
    }

    @DeleteMapping("/emission-factors/{id}")
    public ResponseEntity<String> deleteFactor(@PathVariable Long id) {
        emissionFactorRepository.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
