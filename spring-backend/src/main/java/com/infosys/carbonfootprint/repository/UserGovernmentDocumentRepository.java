package com.infosys.carbonfootprint.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.carbonfootprint.entity.UserGovernmentDocument;

@Repository
public interface UserGovernmentDocumentRepository extends JpaRepository<UserGovernmentDocument, Long> {

    Optional<UserGovernmentDocument> findByUserUserId(Long userId);

    boolean existsByDocumentNumber(String documentNumber);
}
