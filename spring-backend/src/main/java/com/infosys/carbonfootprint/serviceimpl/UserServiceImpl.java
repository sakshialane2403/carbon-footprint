package com.infosys.carbonfootprint.serviceimpl;

import java.io.IOException;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.infosys.carbonfootprint.dto.DashboardStatsDTO;
import com.infosys.carbonfootprint.dto.UserRegistrationDTO;
import com.infosys.carbonfootprint.entity.PersonalDetails;
import com.infosys.carbonfootprint.entity.User;
import com.infosys.carbonfootprint.entity.UserAddress;
import com.infosys.carbonfootprint.entity.UserGovernmentDocument;
import com.infosys.carbonfootprint.repository.PersonalDetailsRepository;
import com.infosys.carbonfootprint.repository.UserAddressRepository;
import com.infosys.carbonfootprint.repository.UserGovernmentDocumentRepository;
import com.infosys.carbonfootprint.repository.UserRepository;
import com.infosys.carbonfootprint.service.EmailService;
import com.infosys.carbonfootprint.service.UserService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final PersonalDetailsRepository personalDetailsRepository;
    private final UserAddressRepository userAddressRepository;
    private final UserGovernmentDocumentRepository userGovernmentDocumentRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public String registerUser(UserRegistrationDTO dto) {
        if (dto.getEmail() != null && userRepository.findByEmail(dto.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email is already registered: " + dto.getEmail());
        }

        if (dto.getDesiredUsername() != null && userRepository.findByUsername(dto.getDesiredUsername()).isPresent()) {
            throw new IllegalArgumentException("Username is already taken: " + dto.getDesiredUsername());
        }

        if (dto.getMobileNumber() != null && personalDetailsRepository.existsByMobileNumber(dto.getMobileNumber())) {
            throw new IllegalArgumentException("Mobile number is already registered: " + dto.getMobileNumber());
        }

        if (dto.getDocumentNumber() != null && userGovernmentDocumentRepository.existsByDocumentNumber(dto.getDocumentNumber())) {
            throw new IllegalArgumentException("Government document number is already registered: " + dto.getDocumentNumber());
        }

        User user = new User();
        user.setEmail(dto.getEmail());
        user.setUsername(dto.getDesiredUsername());
        user.setPassword(passwordEncoder.encode(dto.getTemporaryPassword()));
        user.setRole("USER");
        user.setStatus("PENDING");
        user.setFirstLogin(true);
        user.setIsActive(false);

        PersonalDetails personalDetails = new PersonalDetails();
        personalDetails.setFirstName(dto.getFirstName());
        personalDetails.setLastName(dto.getLastName());
        personalDetails.setAge(dto.getAge());
        personalDetails.setGender(dto.getGender());
        personalDetails.setDateOfBirth(dto.getDateOfBirth());
        personalDetails.setMobileNumber(dto.getMobileNumber());
        personalDetails.setPhoneNumber(dto.getPhoneNumber());

        UserAddress address = new UserAddress();
        address.setHouseNumber(dto.getHouseNumber());
        address.setArea(dto.getArea());
        address.setLandmark(dto.getLandmark());
        address.setStreet(dto.getStreet());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setCountry(dto.getCountry());
        address.setPinCode(dto.getPinCode());

        UserGovernmentDocument doc = new UserGovernmentDocument();
        doc.setDocumentType(dto.getDocumentType());
        doc.setDocumentNumber(dto.getDocumentNumber());

        if (dto.getDocumentFile() != null && !dto.getDocumentFile().isEmpty()) {
            try {
                doc.setDocumentFile(dto.getDocumentFile().getBytes());
            } catch (IOException e) {
                throw new IllegalArgumentException("Failed to process uploaded government document file.", e);
            }
        }

        user.setPersonalDetails(personalDetails);
        user.setUserAddress(address);
        user.setGovernmentDocument(doc);

        userRepository.save(user);

        emailService.sendRegistrationReceived(user.getEmail(), user.getUsername());

        return "Registration submitted successfully. Username: " + user.getUsername();
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserProfile(String username) {
        return getUserByUsername(username);
    }

    @Override
    @Transactional(readOnly = true)
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("User not found with username: " + username));
    }

    @Override
    @Transactional(readOnly = true)
    public DashboardStatsDTO getDashboardStats() {
        List<User> allUsers = userRepository.findAll();

        long totalRegistered = allUsers.size();

        long totalPending = allUsers.stream()
                .filter(u -> "PENDING".equalsIgnoreCase(u.getStatus()))
                .count();

        long totalApproved = allUsers.stream()
                .filter(u -> "APPROVED".equalsIgnoreCase(u.getStatus()) || "ACTIVE".equalsIgnoreCase(u.getStatus()))
                .count();

        long totalRejected = allUsers.stream()
                .filter(u -> "REJECTED".equalsIgnoreCase(u.getStatus()))
                .count();

        long maleCount = allUsers.stream()
                .filter(u -> u.getPersonalDetails() != null && "MALE".equalsIgnoreCase(u.getPersonalDetails().getGender()))
                .count();

        long femaleCount = allUsers.stream()
                .filter(u -> u.getPersonalDetails() != null && "FEMALE".equalsIgnoreCase(u.getPersonalDetails().getGender()))
                .count();

        return new DashboardStatsDTO(
                totalRegistered,
                totalPending,
                totalApproved,
                totalRejected,
                maleCount,
                femaleCount
        );
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getPendingUsers() {
        return userRepository.findByStatus("PENDING");
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getApprovedUsers() {
        return userRepository.findByStatus("APPROVED");
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getRejectedUsers() {
        return userRepository.findByStatus("REJECTED");
    }

    @Override
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public void approveUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        user.setStatus("APPROVED");
        user.setIsActive(true);
        userRepository.save(user);
        emailService.sendAccountCredentials(user.getEmail(), user.getUsername(), "");
    }

    @Override
    @Transactional
    public void rejectUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        user.setStatus("REJECTED");
        user.setIsActive(false);
        userRepository.save(user);
    }
}
