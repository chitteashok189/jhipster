package org.jhipster.blog.repository;

import org.jhipster.blog.domain.ProtectedFarm;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the ProtectedFarm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProtectedFarmRepository extends JpaRepository<ProtectedFarm, Long> {}
