package lk.ijse.market.dto;

public class ItemDTO {

    private int id;
    private String name;
    private double price;
    private int amount;
    private String unit;
    private String image;

    public ItemDTO(int id, String name, double price, int amount, String unit, String image) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.amount = amount;
        this.unit = unit;
        this.image = image;
    }

    public ItemDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public String toString() {
        return "ItemDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", amount=" + amount +
                ", unit='" + unit + '\'' +
                ", image='" + image + '\'' +
                '}';
    }
}
