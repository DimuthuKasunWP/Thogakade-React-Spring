package lk.ijse.market.entity;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class OrderDetailPK implements Serializable {

    private int oid;
    private int id;

    public OrderDetailPK() {
    }

    public OrderDetailPK(int oid, int id) {
        this.oid = oid;
        this.id = id;
    }
}
