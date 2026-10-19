package com.infosys.carbonfootprint.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.infosys.carbonfootprint.entity.ActivityType;
import com.infosys.carbonfootprint.entity.Category;
import com.infosys.carbonfootprint.entity.EmissionFactor;
import com.infosys.carbonfootprint.repository.ActivityTypeRepository;
import com.infosys.carbonfootprint.repository.CategoryRepository;
import com.infosys.carbonfootprint.repository.EmissionFactorRepository;

@Configuration
public class MasterDataInitializer {

    @Bean
    CommandLineRunner seedMasterData(
            CategoryRepository categories,
            ActivityTypeRepository types,
            EmissionFactorRepository factors) {
        return args -> {
            if (categories.count() > 0) return;

            Category transport = cat("TRN", "Transport", "Travel and commuting");
            Category food = cat("FOOD", "Food", "Meals and diet");
            Category elec = cat("ELC", "Electricity", "Power consumption");
            Category shop = cat("SHP", "Shopping", "Purchases");
            Category waste = cat("WST", "Waste", "Household waste");
            categories.save(transport);
            categories.save(food);
            categories.save(elec);
            categories.save(shop);
            categories.save(waste);

            ActivityType car = type(transport, "Car", "km");
            ActivityType bus = type(transport, "Bus", "km");
            ActivityType bike = type(transport, "Bike", "km");
            ActivityType train = type(transport, "Train", "km");
            ActivityType veg = type(food, "Veg Meal", "meal");
            ActivityType chicken = type(food, "Chicken Meal", "meal");
            ActivityType homeEl = type(elec, "Electricity", "kWh");
            ActivityType online = type(shop, "Online Shopping", "order");
            types.save(car);
            types.save(bus);
            types.save(bike);
            types.save(train);
            types.save(veg);
            types.save(chicken);
            types.save(homeEl);
            types.save(online);

            factors.save(factor(car, 0.21, "kg CO₂/km", "DEFRA"));
            factors.save(factor(bus, 0.08, "kg CO₂/km", "DEFRA"));
            factors.save(factor(bike, 0.05, "kg CO₂/km", "DEFRA"));
            factors.save(factor(train, 0.04, "kg CO₂/km", "DEFRA"));
            factors.save(factor(veg, 0.70, "kg CO₂/meal", "OWID"));
            factors.save(factor(chicken, 2.50, "kg CO₂/meal", "OWID"));
            factors.save(factor(homeEl, 0.82, "kg CO₂/kWh", "CEA India"));
            factors.save(factor(online, 0.50, "kg CO₂/order", "Estimate"));
        };
    }

    private Category cat(String code, String name, String desc) {
        Category c = new Category();
        c.setCategoryCode(code);
        c.setCategoryName(name);
        c.setDescription(desc);
        c.setStatus("ACTIVE");
        return c;
    }

    private ActivityType type(Category cat, String name, String unit) {
        ActivityType t = new ActivityType();
        t.setCategory(cat);
        t.setActivityName(name);
        t.setUnit(unit);
        t.setStatus("ACTIVE");
        return t;
    }

    private EmissionFactor factor(ActivityType type, double value, String unit, String source) {
        EmissionFactor f = new EmissionFactor();
        f.setActivityType(type);
        f.setEmissionFactor(value);
        f.setUnit(unit);
        f.setSourceName(source);
        f.setStatus("ACTIVE");
        return f;
    }
}
