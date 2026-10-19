package com.infosys.carbonfootprint.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.infosys.carbonfootprint.entity.Article;
import com.infosys.carbonfootprint.entity.CategoryLimit;
import com.infosys.carbonfootprint.entity.ChatbotFaq;
import com.infosys.carbonfootprint.repository.ArticleRepository;
import com.infosys.carbonfootprint.repository.CategoryLimitRepository;
import com.infosys.carbonfootprint.repository.ChatbotFaqRepository;

@Configuration
public class Milestone3Initializer {

    @Bean
    CommandLineRunner seedMilestone3(CategoryLimitRepository limits,
                                     ChatbotFaqRepository faqs,
                                     ArticleRepository articles) {
        return args -> {
            if (limits.count() == 0) {
                limits.save(limit("Transport", 20.0,
                    "Your transport emissions are high. Please consider using public transport."));
                limits.save(limit("Electricity", 15.0,
                    "Your electricity emissions are high. Switch off unused appliances and use LED bulbs."));
                limits.save(limit("Food", 18.0,
                    "Your food emissions are high. Try more vegetarian meals this month."));
                limits.save(limit("Shopping", 10.0,
                    "Your shopping emissions are high. Reduce new purchases and reuse items."));
            }
            if (faqs.count() == 0) {
                faqs.save(faq("How do I register?",
                    "Open Register, fill your details and submit. Status becomes PENDING until admin approves.",
                    "GUEST", 1));
                faqs.save(faq("How do I login?",
                    "Use your username (not email) and password. Admin: admin / Admin@123.",
                    "GUEST", 2));
                faqs.save(faq("Why can't I login after register?",
                    "Admin must approve your account first. After approval you can login.",
                    "GUEST", 3));
                faqs.save(faq("What is CarbonTrack?",
                    "It tracks daily activities and calculates carbon emission as Quantity × Emission Factor.",
                    "GUEST", 4));
                faqs.save(faq("How do I log an activity?",
                    "Go to Activity Logging, pick category and type, enter quantity. Emission is calculated automatically.",
                    "USER", 1));
                faqs.save(faq("What is the emission formula?",
                    "Carbon Emission = Quantity × Emission Factor. Example: Car 20 km × 0.21 = 4.20 kg CO₂e.",
                    "USER", 2));
                faqs.save(faq("What is on my dashboard?",
                    "Total emissions, charts, top 5 high-emission activities, alerts and goal progress.",
                    "USER", 3));
                faqs.save(faq("How do monthly goals work?",
                    "Set a monthly kg CO₂e target on Goals. Progress is this month's total emission vs target.",
                    "USER", 4));
            }
            if (articles.count() == 0) {
                Article a = new Article();
                a.setTitle("5 simple ways to cut your carbon footprint");
                a.setSummary("Small daily changes add up — transport, food, energy and shopping.");
                a.setContent("Use public transport or cycle for short trips. Switch to LED bulbs. Eat more vegetarian meals. Reduce online orders. Track every activity in CarbonTrack so you can see what matters most.");
                a.setStatus("PUBLISHED");
                a.setPublishedAt(java.time.LocalDateTime.now());
                articles.save(a);
            }
        };
    }

    private CategoryLimit limit(String name, double kg, String msg) {
        CategoryLimit l = new CategoryLimit();
        l.setCategoryName(name);
        l.setMonthlyLimitKg(kg);
        l.setAlertMessage(msg);
        l.setIsActive(true);
        return l;
    }

    private ChatbotFaq faq(String q, String a, String audience, int order) {
        ChatbotFaq f = new ChatbotFaq();
        f.setQuestion(q);
        f.setAnswer(a);
        f.setAudience(audience);
        f.setSortOrder(order);
        f.setIsActive(true);
        return f;
    }
}
