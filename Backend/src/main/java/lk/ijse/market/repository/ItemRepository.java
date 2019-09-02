package lk.ijse.market.repository;

import lk.ijse.market.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ItemRepository extends JpaRepository<Item,Integer> {

    @Query(value="select * from item order by id desc limit 1",nativeQuery = true)
    Item getLastItem();
}
