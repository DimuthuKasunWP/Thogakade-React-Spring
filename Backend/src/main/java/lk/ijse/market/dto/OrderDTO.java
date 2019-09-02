package lk.ijse.market.dto;

import java.util.ArrayList;
import java.util.List;

public class OrderDTO {

    private int oid;
    private double totalPrice;
    private CustomerDTO customerDTO;
    private List<OrderDetailDTO>orderDetailDTOList;

    public OrderDTO() {
    }

    public OrderDTO(int oid, double totalPrice, CustomerDTO customerDTO, List<OrderDetailDTO> orderDetailDTOList) {
        this.oid = oid;
        this.totalPrice = totalPrice;
        this.customerDTO = customerDTO;
        this.orderDetailDTOList = orderDetailDTOList;
    }

    public int getOid() {
        return oid;
    }

    public void setOid(int oid) {
        this.oid = oid;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public CustomerDTO getCustomerDTO() {
        return customerDTO;
    }

    public void setCustomerDTO(CustomerDTO customerDTO) {
        this.customerDTO = customerDTO;
    }

    public List<OrderDetailDTO> getOrderDetailDTOList() {
        return orderDetailDTOList;
    }

    public void setOrderDetailDTOList(List<OrderDetailDTO> orderDetailDTOList) {
        this.orderDetailDTOList = orderDetailDTOList;
    }
}
