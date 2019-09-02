package lk.ijse.market.entity;

import javax.persistence.*;

@Entity
@Table(name="orderdetail")
public class OrderDetail {

    @EmbeddedId
    private OrderDetailPK orderDetailPK;

    private double totalPricePerItem;
    private int qty;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Order order;

    @ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.EAGER)
    private Item item;

    public OrderDetail() {
    }

    public OrderDetail(OrderDetailPK orderDetailPK, double totalPricePerItem, int qty, Order order, Item item) {
        this.orderDetailPK = orderDetailPK;
        this.totalPricePerItem = totalPricePerItem;
        this.qty = qty;
        this.order = order;
        this.item = item;
    }

    public OrderDetailPK getOrderDetailPK() {
        return orderDetailPK;
    }

    public void setOrderDetailPK(OrderDetailPK orderDetailPK) {
        this.orderDetailPK = orderDetailPK;
    }

    public double getTotalPricePerItem() {
        return totalPricePerItem;
    }

    public void setTotalPricePerItem(double totalPricePerItem) {
        this.totalPricePerItem = totalPricePerItem;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Item getItem() {
        return item;
    }

    public void setItem(Item item) {
        this.item = item;
    }

    @Override
    public String toString() {
        return "OrderDetail{" +
                "orderDetailPK=" + orderDetailPK +
                ", totalPricePerItem=" + totalPricePerItem +
                ", qty=" + qty +
                ", order=" + order +
                ", item=" + item +
                '}';
    }
}
