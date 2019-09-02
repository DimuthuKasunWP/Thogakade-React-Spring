package lk.ijse.market.controller;

import lk.ijse.market.dto.OrderDTO;
import lk.ijse.market.service.OrderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("market/v1/order")
public class OrderDetailController {

    @Autowired
    private OrderDetailService orderDetailService;

    @PutMapping(consumes = "application/json")
    public boolean saveOrderDetail(@RequestBody OrderDTO orderDTO){

        OrderDTO lastOrder=orderDetailService.getLastOrder();
        if(lastOrder!=null){
            int newId=lastOrder.getOid()+1;
            orderDTO.setOid(newId);
            if(orderDetailService.saveOrderDetail(orderDTO)){
                return true;
            }else{
                return false;
            }
        }else{
            orderDTO.setOid(1);
            if(orderDetailService.saveOrderDetail(orderDTO)){
                return true;
            }else{
                return false;
            }
        }

    }

    @GetMapping("/{id}")
    public OrderDTO find(@PathVariable("id") Integer oid){
        int id=oid==null?0:oid;
        return orderDetailService.findById(id);
    }

    @GetMapping
    public Object find(@RequestParam(value = "action",required = false) String action){

        if(action!=null){
            switch (action){
                case "all":return orderDetailService.findAll();
                case "last":return orderDetailService.getLastOrder();
                default: return orderDetailService.findAll();
            }
        }
        return orderDetailService.findAll();
    }


}
