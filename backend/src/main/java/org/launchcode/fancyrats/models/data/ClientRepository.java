package org.launchcode.fancyrats.models.data;

import org.launchcode.fancyrats.models.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {
}
