package ru.itmo.dws.itmotrip.repository

import java.util.UUID
import org.springframework.data.jdbc.repository.query.Modifying
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import ru.itmo.dws.itmotrip.model.User

@Repository
interface UserRepository : CrudRepository<User, UUID> {

    @Query(
        """
        INSERT INTO users (id, student_id, faculty, first_name, middle_name, last_name, social_network_username, avatar_url, bio)
        VALUES (:id, :studentId, :faculty, :firstName, :middleName, :lastName, :socialNetworkUsername, :avatarUrl, :bio)
        ON CONFLICT (student_id)
        DO UPDATE SET
            faculty = excluded.faculty,
            avatar_url = excluded.avatar_url
    """
    )
    @Modifying
    fun insert(
        id: UUID,
        studentId: String,
        faculty: String,
        firstName: String,
        middleName: String?,
        lastName: String,
        socialNetworkUsername: String,
        avatarUrl: String?,
        bio: String?,
    )

    @Query(
        """
            SELECT *
            FROM users
            WHERE student_id = :isu
        """
    )
    fun getByIsuId(isu: String): User?
}