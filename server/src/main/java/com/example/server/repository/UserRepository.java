package com.example.server.repository;

import com.example.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
@Transactional(readOnly = true)
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long id);
    boolean existsUserById(Long id);

    @Transactional
    @Query(value = "SELECT * FROM Users a WHERE a.username LIKE %?1% OR LOWER(a.name) LIKE %?1%", nativeQuery = true)
    Iterable<User> searchUsersByUsername(String username);

    @Transactional
    @Modifying
    @Query("UPDATE User a " + "SET a.enabled = TRUE WHERE a.email = ?1")
    int enableUser(String email);

    @Transactional
    @Modifying(clearAutomatically = true)
    @Query("UPDATE User a " + "SET a.profileImageId = ?1 WHERE a.id = ?2")
    int updateProfileImageId(String profileImageId, Long id);
}
