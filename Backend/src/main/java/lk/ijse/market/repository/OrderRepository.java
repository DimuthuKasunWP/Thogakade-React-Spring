package lk.ijse.market.repository;

import lk.ijse.market.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order,Integer> {
    @Query(value="select * from orders order by oid desc limit 1",nativeQuery = true)
    public Order getLastOrder();

    @Modifying
    @Query(value="update orders set totalPrice=:price where oid=:oid",nativeQuery = true)
    public void updateOrder(@Param("price") double price, @Param("oid") int oid);
}
