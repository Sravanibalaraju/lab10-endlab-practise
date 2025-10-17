package com.petcare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.petcare.model.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
