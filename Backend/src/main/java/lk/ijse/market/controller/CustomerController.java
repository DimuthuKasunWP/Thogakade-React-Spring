package lk.ijse.market.controller;

import lk.ijse.market.dto.CustomerDTO;
import lk.ijse.market.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("market/v1/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PutMapping
    public boolean saveCustomer(@RequestBody CustomerDTO customerDTO){
        return customerService.saveCustomer(customerDTO);
    }

    @DeleteMapping
    public boolean deleteCustomer(@RequestBody CustomerDTO customerDTO){
        return customerService.deleteCustomer(customerDTO);
    }

    @PostMapping
    public boolean updateCustomer(@RequestBody CustomerDTO customerDTO){
        return customerService.updateCustomer(customerDTO);
    }

    @GetMapping
    public Object find(@RequestParam(value="action",required=false) String action,
                       @RequestParam(value="id",required = false) Integer id,
                       @RequestParam(value="page",required = false) Integer page,
                       @RequestParam(value="size",required = false) Integer size){
        if(action!=null){
            switch (action){
                case "all":return customerService.findAll();
                case "search":return customerService.findById(id);
                case "page":return customerService.findByPage(page,size);
                case "last":return customerService.getLastCustomer();
                default:return customerService.findAll();
            }
        }else{
            return customerService.findAll();
        }

    }
}
