package lk.ijse.market.service;

import lk.ijse.market.dto.CustomerDTO;

import java.util.List;

public interface CustomerService {

    public boolean saveCustomer(CustomerDTO customerDTO);

    public List<CustomerDTO> findAll();

    public CustomerDTO findById(int id);

    public List<CustomerDTO> findByPage(int page,int size);

    public boolean updateCustomer(CustomerDTO customerDTO);

    public boolean deleteCustomer(CustomerDTO customerDTO);

    public CustomerDTO getLastCustomer();

}
