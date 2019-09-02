package lk.ijse.market.service.impl;

import lk.ijse.market.dto.CustomerDTO;
import lk.ijse.market.dto.ItemDTO;
import lk.ijse.market.dto.OrderDTO;
import lk.ijse.market.dto.OrderDetailDTO;
import lk.ijse.market.entity.*;

import lk.ijse.market.repository.CustomerRepository;
import lk.ijse.market.repository.ItemRepository;
import lk.ijse.market.repository.OrderDetailRepository;
import lk.ijse.market.repository.OrderRepository;
import lk.ijse.market.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional(readOnly = true,propagation = Propagation.SUPPORTS)
public class OrderDetailServiceImpl implements OrderDetailService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ItemRepository itemRepository;


    @Override
    @Transactional(propagation = Propagation.REQUIRED)
    public boolean saveOrderDetail(OrderDTO orderDTO) {

        Order order=new Order();
        order.setOid(orderDTO.getOid());
        order.setTotalPrice(orderDTO.getTotalPrice());

        Customer customer=customerRepository.findById(orderDTO.getCustomerDTO().getId()).get();

        order.setCustomer(customer);

        List<OrderDetail>orderDetailList=new ArrayList<>();

        List<OrderDetailDTO>orderDetailDTOList=orderDTO.getOrderDetailDTOList();
        for(OrderDetailDTO orderDetailDTO:orderDetailDTOList){

            Item item=itemRepository.findById(orderDetailDTO.getItem().getId()).get();
            Item saveItem=item;
            saveItem.setAmount(item.getAmount()-orderDetailDTO.getItem().getAmount());

            OrderDetail orderDetail=new OrderDetail(
                    new OrderDetailPK(orderDTO.getOid(),item.getId()),
                    orderDetailDTO.getTotalPricePerItem(),
                    orderDetailDTO.getQty(),
                    order,
                    item
            );

            itemRepository.save(saveItem);

            orderDetailList.add(orderDetail);
        }

        order.setOrderDetailList(orderDetailList);

        orderRepository.save(order);
        return true;
    }

    @Override
    public List<OrderDTO> findAll() {
        List<OrderDTO> list=new ArrayList<>();
        if(orderRepository.existsById(1)){
            List<Order> orders=orderRepository.findAll();
            for (Order order:orders) {
                List<OrderDetailDTO> orderDetailDTOList=new ArrayList<>();
                for(OrderDetail orderDetail:order.getOrderDetailList()){
                    ItemDTO itemDTO=new ItemDTO(orderDetail.getItem().getId(),orderDetail.getItem().getName(),orderDetail.getItem().getPrice(),orderDetail.getItem().getAmount(),orderDetail.getItem().getUnit(),orderDetail.getItem().getImage());
                    orderDetailDTOList.add(new OrderDetailDTO(orderDetail.getTotalPricePerItem(),orderDetail.getQty(),itemDTO));
                }
                CustomerDTO customerDTO=new CustomerDTO(order.getCustomer().getId(),order.getCustomer().getName(),order.getCustomer().getAddress(),order.getCustomer().getImage());
                list.add(new OrderDTO(order.getOid(),order.getTotalPrice(),customerDTO,orderDetailDTOList));
            }
        }
        return list;
    }

    @Override
    public OrderDTO getLastOrder() {
        OrderDTO orderDTO=null;
        if(orderRepository.existsById(1)){
            Order order=orderRepository.getLastOrder();
            List<OrderDetailDTO> orderDetailDTOList=new ArrayList<>();
            for(OrderDetail orderDetail:order.getOrderDetailList()){
                ItemDTO itemDTO=new ItemDTO(orderDetail.getItem().getId(),orderDetail.getItem().getName(),orderDetail.getItem().getPrice(),orderDetail.getItem().getAmount(),orderDetail.getItem().getUnit(),orderDetail.getItem().getImage());
                orderDetailDTOList.add(new OrderDetailDTO(orderDetail.getTotalPricePerItem(),orderDetail.getQty(),itemDTO));
            }
            CustomerDTO customerDTO=new CustomerDTO(order.getCustomer().getId(),order.getCustomer().getName(),order.getCustomer().getAddress(),order.getCustomer().getImage());
            orderDTO=new OrderDTO(order.getOid(),order.getTotalPrice(),customerDTO,orderDetailDTOList);
        }
        return orderDTO;
    }

    @Override
    public OrderDTO findById(int id) {
        OrderDTO orderDTO=null;
        if(orderRepository.existsById(id)){
            Order order=orderRepository.findById(id).get();
            List<OrderDetailDTO> orderDetailDTOList=new ArrayList<>();
            for(OrderDetail orderDetail:order.getOrderDetailList()){
                ItemDTO itemDTO=new ItemDTO(orderDetail.getItem().getId(),orderDetail.getItem().getName(),orderDetail.getItem().getPrice(),orderDetail.getItem().getAmount(),orderDetail.getItem().getUnit(),orderDetail.getItem().getImage());
                orderDetailDTOList.add(new OrderDetailDTO(orderDetail.getTotalPricePerItem(),orderDetail.getQty(),itemDTO));
            }
            CustomerDTO customerDTO=new CustomerDTO(order.getCustomer().getId(),order.getCustomer().getName(),order.getCustomer().getAddress(),order.getCustomer().getImage());
            orderDTO=new OrderDTO(order.getOid(),order.getTotalPrice(),customerDTO,orderDetailDTOList);
        }
        return orderDTO;
    }
}
