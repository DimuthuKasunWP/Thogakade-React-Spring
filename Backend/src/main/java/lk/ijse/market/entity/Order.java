package lk.ijse.market.entity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    private int oid;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Customer customer;

    @OneToMany(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    List<OrderDetail> orderDetailList;

    private double totalPrice;

    public Order() {
    }

    public Order(int oid,Customer customer, List<OrderDetail> orderDetailList, double totalPrice) {
        this.oid=oid;
        this.customer = customer;
        this.orderDetailList = orderDetailList;
        this.totalPrice = totalPrice;
    }

    public int getOid() {
        return oid;
    }

    public void setOid(int oid) {
        this.oid = oid;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public List<OrderDetail> getOrderDetailList() {
        return orderDetailList;
    }

    public void setOrderDetailList(List<OrderDetail> orderDetailList) {
        this.orderDetailList = orderDetailList;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public String toString() {
        return "Order{" +
                "oid=" + oid +
                ", customer=" + customer +
                ", orderDetailList=" + orderDetailList +
                ", totalPrice=" + totalPrice +
                '}';
    }
}
