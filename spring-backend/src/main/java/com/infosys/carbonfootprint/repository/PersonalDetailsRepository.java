package com.infosys.carbonfootprint.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.carbonfootprint.entity.PersonalDetails;

@Repository
public interface PersonalDetailsRepository extends JpaRepository<PersonalDetails, Long> {

    Optional<PersonalDetails> findByUserUserId(Long userId);

    Optional<PersonalDetails> findByMobileNumber(String mobileNumber);

    boolean existsByMobileNumber(String mobileNumber);

    long countByGenderIgnoreCase(String gender);
}
