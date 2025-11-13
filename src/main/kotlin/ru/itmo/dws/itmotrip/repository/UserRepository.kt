package ru.itmo.dws.itmotrip.repository

import org.springframework.data.jdbc.repository.query.Modifying
import org.springframework.data.jdbc.repository.query.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import ru.itmo.dws.itmotrip.model.User
import java.util.UUID

@Repository
interface UserRepository : CrudRepository<User, UUID> {

    @Query(
        """
            SELECT *
            FROM users
            WHERE student_id = :isu
        """
    )
    fun getByIsuId(isu: String): User?

    @Query(
        """
            SELECT *
            FROM users
            WHERE id = :id
        """
    )
    fun getById(id: UUID): User?

    @Query(
        """
        INSERT INTO users (student_id, faculty, first_name, middle_name, last_name, social_network_username, avatar_url, bio)
        VALUES (:studentId, :faculty, :firstName, :middleName, :lastName, :socialNetworkUsername, :avatarUrl, :bio)
        ON CONFLICT (student_id)
        DO UPDATE SET
            faculty = excluded.faculty,
            avatar_url = excluded.avatar_url
    """
    )
    @Modifying
    fun insert(
        studentId: String,
        faculty: String,
        firstName: String,
        middleName: String?,
        lastName: String,
        socialNetworkUsername: String?,
        avatarUrl: String?,
        bio: String?,
    )

    @Query(
        """
        UPDATE users
        SET 
            bio = :bio,
            social_network_username = :socialNetworkUsername
        WHERE id = :id
        """,
    )
    @Modifying
    fun patchByUserId(id: UUID, bio: String?, socialNetworkUsername: String?)
}