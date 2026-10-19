package com.infosys.carbonfootprint.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.carbonfootprint.entity.UserAddress;

public interface UserAddressRepository
    extends JpaRepository<UserAddress, Long> {

    Optional<UserAddress> findByUserUserId(Long userId);
}
