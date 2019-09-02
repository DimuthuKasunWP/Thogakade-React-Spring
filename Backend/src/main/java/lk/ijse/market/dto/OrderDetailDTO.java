package lk.ijse.market.dto;

public class OrderDetailDTO {

    private double totalPricePerItem;
    private int qty;
    private ItemDTO item;

    public OrderDetailDTO() {
    }

    public OrderDetailDTO(double totalPricePerItem, int qty, ItemDTO item) {
        this.totalPricePerItem = totalPricePerItem;
        this.qty = qty;
        this.item = item;
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

    public ItemDTO getItem() {
        return item;
    }

    public void setItem(ItemDTO item) {
        this.item = item;
    }


    @Override
    public String toString() {
        return "OrderDetailDTO{" +
                "totalPricePerItem=" + totalPricePerItem +
                ", qty=" + qty +
                ", item=" + item +
                '}';
    }
}
