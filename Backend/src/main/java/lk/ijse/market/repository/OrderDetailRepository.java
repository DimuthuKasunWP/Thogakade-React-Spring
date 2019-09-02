package lk.ijse.market.repository;

import lk.ijse.market.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderDetailRepository extends JpaRepository<OrderDetail,Integer> {

    @Modifying
    @Query(value="delete from orders_orderdetail where order_oid=?1",nativeQuery = true)
    public void deleteFromOrderOrderDetails(Integer oid);
}
