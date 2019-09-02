package lk.ijse.market.repository;

import lk.ijse.market.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface CustomerRepository extends JpaRepository<Customer,Integer>{

    @Query(value="select * from customer order by id desc limit 1",nativeQuery = true)
    Customer getLastCustomer();
}
