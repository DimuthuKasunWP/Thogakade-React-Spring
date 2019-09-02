package lk.ijse.market.service;

import lk.ijse.market.dto.OrderDTO;

import java.util.List;

public interface OrderDetailService {

    public boolean saveOrderDetail(OrderDTO orderDTO);

    public List<OrderDTO> findAll();

    public OrderDTO getLastOrder();

    public OrderDTO findById(int id);
}
