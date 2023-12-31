package com.pjt.petmily.domain.chat.repository;

import com.pjt.petmily.domain.chat.entity.ChatRoom;
import com.pjt.petmily.domain.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRoomJpaRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByRoomId(String roomId);

    @Query("SELECT cr FROM ChatRoom cr JOIN cr.participants p WHERE p IN :users GROUP BY cr HAVING COUNT(DISTINCT p.id) = :userCount")
    List<ChatRoom> findByParticipantsIn(@Param("users") List<User> users, @Param("userCount") long userCount);

    List<ChatRoom> findByParticipantsContains(User user);

}

